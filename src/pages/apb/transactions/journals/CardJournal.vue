<template lang="">
	<q-card bordered flat class="">
		<q-card-section class="q-pa-sm bg-green-7 text-green-11 flex justify-between items-center">
			<div>
				<q-btn icon="sync" no-caps @click="loadJournals" dense flat class="q-mr-xs" title="Muat ulang" />
				Jurnal [{{ transactionId }}]
			</div>
			<q-btn class="q-px-sm" dense outline glossy icon="add" label="Tambah" no-caps @click="addJournal" />
		</q-card-section>
		<q-markup-table flat bordered>
			<CardLoading :showing="loading" />
			<thead>
				<tr class="bg-green-11 text-left">
					<th class="text-center">Edit</th>
					<th class="text-center">Akun</th>
					<th class="">Nama Akun</th>
					<th class="text-right">Debit</th>
					<th class="text-right">Kredit</th>
					<th class="text-center">Hapus</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="j in journals" :key="j.id" class="q-pa-sm">
					<td class="text-center">
						<q-btn dense flat icon="edit" color="primary" @click="editJournal(j)" />
					</td>
					<td class="text-center">
						<q-btn
							dense
							outline
							:label="j.account_id"
							size="sm"
							class="q-px-sm"
							:to="`/apb/accounts/${j.account_id}?th=${thAjaranH}`"
						/>
					</td>
					<td>{{ j.account?.group }}: {{ j.account?.name }}</td>
					<td class="text-right" title="Masuk">
						{{ j.debit ? j.debit.toRupiah() : '-' }}
					</td>
					<td class="text-right" title="Keluar">
						{{ j.credit ? j.credit.toRupiah() : '-' }}
					</td>
					<td class="text-center">
						<q-btn dense flat icon="sym_o_delete" color="negative" @click="deleteJournal(j)" />
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr class="bg-green-12">
					<td class=""></td>
					<td class=""></td>
					<td class="text-overline">Total</td>
					<td class="text-right">
						{{ totalDebit.toRupiah() }}
					</td>
					<td class="text-right">
						{{ totalCredit.toRupiah() }}
					</td>
					<td class="text-center text-green-10"></td>
				</tr>
			</tfoot>
		</q-markup-table>
		<q-card-section
			:class="`flex justify-between items-center q-pa-sm ${isSaved ? 'text-green-10 bg-green-13' : 'bg-red-1 text-red-10'}`"
		>
			<div class="text-overline">
				<span class="text-bold">Status:</span> {{ isBalance ? '✅ Seimbang' : '❌ Tidak Seimbang' }} dan
				{{ isSaved ? '✅ Tersimpan' : '❌ Belum Disimpan' }}
			</div>
			<q-btn
				class="q-px-sm"
				dense
				outline
				:color="isSaved ? 'positive' : 'accent'"
				glossy
				icon="save"
				label="Simpan"
				no-caps
				:disable="isSaved || !isBalance"
				@click="saveJournals"
			/>
		</q-card-section>
		<q-dialog persistent="" v-model="crudShow">
			<FormJournal :data="journal" @success-create="createJournal" @success-update="updateJournal" />
		</q-dialog>
	</q-card>
</template>
<script setup>
import ApbJournal from 'src/models/ApbJournal';
import { computed, onMounted, ref } from 'vue';
import FormJournal from '../../../../components/forms/ApbJournalForm.vue';
import ArrayCrud from 'src/models/ArrayCrud';
import { uid } from 'quasar';
import { useAccountsStore } from 'src/stores/apb-accounts-store';
import { storeToRefs } from 'pinia';

const props = defineProps({
	transactionId: {
		type: [Number, String],
		required: true,
	},
	thAjaranH: {
		type: String,
		required: true,
	},
});
const emit = defineEmits(['update:isSaved']);

const isSaved = ref(true);
const loading = ref(false);
const journals = ref([]);
const journal = ref(null);
const crudShow = ref(false);
const { accounts } = storeToRefs(useAccountsStore());

async function loadJournals() {
	try {
		loading.value = true;
		const data = await ApbJournal.getAll({ params: { transaction_id: props.transactionId } });
		journals.value = data.journals.map((j) => ({
			...j,
			temp_id: uid(),
		}));
		isSaved.value = true;
	} catch (_err) {
		console.error('🚀 ~ loadData ~ _err:', _err);
	} finally {
		loading.value = false;
	}
}

const totalDebit = computed(() => journals.value.reduce((sum, j) => sum + (j.debit || 0), 0));
const totalCredit = computed(() => journals.value.reduce((sum, j) => sum + (j.credit || 0), 0));
const isBalance = computed(() => totalDebit.value === totalCredit.value);

onMounted(() => {
	loadJournals();
});

function editJournal(j) {
	journal.value = j;
	crudShow.value = true;
}

function addJournal() {
	journal.value = { transaction_id: props.transactionId };
	crudShow.value = true;
}

function createJournal(journal) {
	isSaved.value = false;

	journal.temp_id = uid();
	journal.account = accounts.value.find((acc) => acc.id == journal.account_id);
	journals.value = ArrayCrud.create(journals.value, journal);
}

function updateJournal(journal) {
	isSaved.value = false;
	journal.account = accounts.value.find((acc) => acc.id == journal.account_id);
	journals.value = ArrayCrud.update(journals.value, journal.temp_id, journal, 'temp_id');
}

function deleteJournal(journal) {
	isSaved.value = false;
	journals.value = ArrayCrud.remove(journals.value, journal.temp_id, 'temp_id');
}

async function saveJournals() {
	try {
		loading.value = true;
		const payload = journals.value.map((j) => ({
			id: j.id || null,
			account_id: j.account_id,
			debit: j.debit,
			credit: j.credit,
		}));

		const data = await ApbJournal.saveBatch(props.transactionId, payload);
		if (data?.journals) {
			journals.value = data.journals.map((j) => ({
				...j,
				temp_id: uid(),
			}));
		}
		isSaved.value = true;
		emit('update:isSaved', totalDebit.value);
	} catch (_err) {
		console.error('🚀 ~ saveJournals ~ _err:', _err);
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
