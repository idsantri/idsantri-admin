<template lang="">
	<CardPage>
		<CardHeader title="Detail Transaksi" :show-reload="true" :show-edit="true" @on-edit="null" />
		<q-card-section class="q-pa-sm">
			<q-card bordered flat class="">
				<q-markup-table>
					<tbody class="">
						<tr>
							<td>ID</td>
							<td>{{ transaction?.id }}</td>
						</tr>
						<tr>
							<td>Tanggal</td>
							<td>{{ formatDate(transaction?.created_at, 'dd MMMM yyyy HH:mm') }}</td>
						</tr>
						<tr>
							<td>Tahun Ajaran</td>
							<td>{{ transaction?.th_ajaran_h }}</td>
						</tr>
						<tr>
							<td>Keterangan</td>
							<td>{{ transaction?.keterangan }}</td>
						</tr>
						<tr>
							<td>Nilai</td>
							<td>{{ transaction?.nilai?.toRupiah() }}</td>
						</tr>
						<tr>
							<td>Atas Nama</td>
							<td>{{ transaction?.atas_nama }}</td>
						</tr>
						<tr>
							<td>Catatan</td>
							<td>{{ transaction?.catatan }}</td>
						</tr>
					</tbody>
				</q-markup-table>
			</q-card>
		</q-card-section>
		<!-- <pre>{{ transaction }}</pre> -->
		<q-card-section class="q-pa-sm">
			<q-card bordered flat class="">
				<q-card-section class="q-pa-none bg-green-1 text-green-10 text-overline text-center"
					>Jurnal</q-card-section
				>
				<q-markup-table flat bordered>
					<thead>
						<tr class="bg-green-11 text-left">
							<th class="text-center">!</th>
							<th>Akun</th>
							<th>Nama Akun</th>
							<th class="text-right">Debit</th>
							<th class="text-right">Kredit</th>
							<th class="text-center">
								<q-btn class="q-px-sm" dense outline glossy icon="add" label="Tambah" no-caps />
							</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="j in journals" :key="j.id" class="q-pa-sm">
							<td class="text-center">
								<q-btn dense flat icon="edit" />
							</td>
							<td>
								<q-btn
									dense
									outline
									:label="j.account_id"
									size="sm"
									class="q-px-sm"
									:to="`/apb/accounts/${j.account_id}`"
								/>
							</td>
							<td>{{ j.account.group }}: {{ j.account.nama }}</td>
							<td class="text-right">
								{{ j.debit ? j.debit.toRupiah() : '-' }}
							</td>
							<td class="text-right">
								{{ j.kredit ? j.kredit.toRupiah() : '-' }}
							</td>
							<td class="text-center text-negative">
								<q-btn dense flat icon="delete" />
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr class="bg-green-12">
							<td class="" colspan="3">{{ isBalance ? '✅ Seimbang' : '❌ Tidak Seimbang' }}</td>
							<td class="text-right">
								{{ totalDebit.toRupiah() }}
							</td>
							<td class="text-right">
								{{ totalKredit.toRupiah() }}
							</td>
							<td class="text-center text-green-10">
								<q-btn class="q-px-sm" dense outline glossy icon="save" label="Simpan" no-caps />
							</td>
						</tr>
					</tfoot>
				</q-markup-table>
			</q-card>
		</q-card-section>
		<!-- {{ isBalance }} -->
		<!-- <pre>{{ journals }}</pre> -->
	</CardPage>
</template>
<script setup>
import ApbJournal from 'src/models/ApbJournal';
import ApbTransaction from 'src/models/ApbTransaction';
import { formatDate } from 'src/utils/format-date';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const loading = ref(false);
const transaction = ref(null);
const journals = ref([]);
const params = useRoute().params;

async function loadTransaction() {
	try {
		loading.value = true;
		const data = await ApbTransaction.getById({ id: params.id });
		transaction.value = data.transaction;
	} catch (_err) {
		console.error('🚀 ~ loadData ~ _err:', _err);
	} finally {
		loading.value = false;
	}
}
async function loadJournals() {
	try {
		loading.value = true;
		const data = await ApbJournal.getAll({ params: { transaction_id: params.id } });
		journals.value = data.journals;
	} catch (_err) {
		console.error('🚀 ~ loadData ~ _err:', _err);
	} finally {
		loading.value = false;
	}
}

const isBalance = computed(() => {
	const totalDebit = journals.value.reduce((sum, j) => sum + (j.debit || 0), 0);
	const totalKredit = journals.value.reduce((sum, j) => sum + (j.kredit || 0), 0);
	return totalDebit === totalKredit;
});

const totalDebit = computed(() => {
	return journals.value.reduce((sum, j) => sum + (j.debit || 0), 0);
});
const totalKredit = computed(() => {
	return journals.value.reduce((sum, j) => sum + (j.kredit || 0), 0);
});

onMounted(async () => {
	await loadTransaction();
	await loadJournals();
});
</script>
<style lang=""></style>
