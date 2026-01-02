<template lang="">
	<q-card bordered flat class="">
		<q-card-section class="bg-green-7 text-green-11 q-pa-sm flex justify-between items-center">
			<div>
				<q-btn @click="loadData" icon="sync" no-caps dense flat class="q-mr-xs" title="Muat ulang" />

				Detail Anggaran [{{ budget_id }}]
			</div>

			<q-btn
				class="q-px-sm"
				dense
				outline
				glossy
				icon="wallet"
				label="Data Transaksi"
				no-caps
				:to="`/apb/accounts/${account_id}?th=${th_ajaran_h}`"
			>
				<q-tooltip class="bg-green-1 text-green-10">
					Riwayat transaksi akun {{ account_id }} <br />pada tahun ajaran {{ th_ajaran_h }}
				</q-tooltip>
			</q-btn>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-markup-table bordered flat>
				<CardLoading :showing="loading" />
				<thead>
					<tr>
						<th class="text-center">No</th>
						<th class="text-left">Nama Item</th>
						<th class="text-right">Q</th>
						<th class="text-left">Satuan</th>
						<th class="text-right">Harga</th>
						<th class="text-right">Sub Total</th>
						<th class="text-left">Siklus</th>
						<th class="text-left">Waktu</th>
						<th class="text-left">PJ</th>
						<th class="text-left">Catatan</th>
						<th class="text-center">
							<q-btn
								@click="addDetail"
								icon="add"
								no-caps
								dense
								glossy
								outline
								color="green-10"
								class="q-px-sm"
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="detail in orderedDetails" :key="detail.id">
						<td class="text-center" style="width: 75px" title="klik untuk mengubah nomor urut">
							<q-input borderless dense v-model="detail.sequence" input-class="text-center" />
						</td>
						<td class="text-left">{{ detail?.item }}</td>
						<td class="text-right">{{ detail?.qty }}</td>
						<td class="text-left">{{ detail?.unit }}</td>
						<td class="text-right">{{ detail?.price ? detail?.price?.toRupiah() : '-' }}</td>
						<td class="text-right">{{ detail?.sub_total ? detail?.sub_total?.toRupiah() : '-' }}</td>
						<td class="text-left">{{ detail?.cycle }}</td>
						<td class="text-left">{{ detail?.needed_at }}</td>
						<td class="text-left">{{ detail?.executor }}</td>
						<td class="text-left">
							{{ detail?.note }}
						</td>
						<td class="text-center">
							<q-btn
								@click="editDetail(detail)"
								icon="edit"
								no-caps
								dense
								outline
								color="primary"
								class="q-px-sm"
								glossy
							/>
						</td>
					</tr>
				</tbody>
				<tfoot class="bg-green-12">
					<tr>
						<td class="text-right text-italic" colspan="5">Total</td>
						<td class="text-right text-bold">
							{{ total ? total?.toRupiah() : '-' }}
						</td>
						<td class="text-center"></td>
						<td class="text-center"></td>
						<td class="text-center"></td>
						<td class="text-center"></td>
						<td class="text-center"></td>
					</tr>
				</tfoot>
			</q-markup-table>
		</q-card-section>
		<q-dialog persistent="" v-model="showForm">
			<ApbBudgetDetailForm
				:data="formData"
				@success-create="handleCreate"
				@success-update="handleUpdate"
				@success-delete="handleDelete"
			/>
		</q-dialog>
	</q-card>
</template>
<script setup>
import ApbBudgetDetailForm from 'src/components/forms/ApbBudgetDetailForm.vue';
import ApbBudgetDetail from 'src/models/ApbBudgetDetail';
import ArrayCrud from 'src/models/ArrayCrud';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
	budget_id: {
		type: [String, Number],
		required: true,
	},
	account_id: {
		type: [String],
	},
	th_ajaran_h: {
		type: [String],
	},
});
const emit = defineEmits(['updateTotalBudget']);

const showForm = ref(false);
const formData = ref({});
const details = ref([]);
const loading = ref(false);
const total = computed(() => details.value.reduce((acc, cur) => acc + Number(cur.sub_total), 0));
const orderedDetails = computed(() => ArrayCrud.sort(details.value, 'sequence', 'asc', false));

async function loadData() {
	try {
		loading.value = true;
		const data = await ApbBudgetDetail.getAll({ params: { budget_id: props.budget_id } });
		details.value = data.details;
		emit('updateTotalBudget', total.value);
	} catch (error) {
		console.error('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});

const editDetail = (detail) => {
	formData.value = detail;
	showForm.value = true;
};

const addDetail = () => {
	formData.value = { budget_id: props.budget_id };
	showForm.value = true;
};

const handleCreate = (detail) => {
	details.value = ArrayCrud.create(details.value, detail);
	emit('updateTotalBudget', total.value);
};

const handleUpdate = (detail) => {
	details.value = ArrayCrud.update(details.value, detail.id, detail);
	emit('updateTotalBudget', total.value);
};

const handleDelete = (id) => {
	details.value = ArrayCrud.remove(details.value, id);
	emit('updateTotalBudget', total.value);
};

const unwatchUrut = watch(
	() => details.value.map((item) => item.sequence),
	(newUrut, oldUrut) => {
		// Abaikan jika ini adalah pengisian data pertama kali (fetch API)
		if (oldUrut.length === 0 || newUrut.length !== oldUrut.length) {
			return;
		}

		newUrut.forEach(async (urut, index) => {
			if (urut !== oldUrut[index]) {
				const id = details.value[index].id;
				await updateNomorUrut(id, newUrut[index], oldUrut[index]);
			}
		});
	},
);

async function updateNomorUrut(id, newUrut, oldUrut) {
	try {
		await ApbBudgetDetail.update({ id, data: { sequence: newUrut }, notifySuccess: false });
	} catch (e) {
		// rollback
		details.value = ArrayCrud.update(details.value, id, { sequence: oldUrut });
		console.error('🚀 ~ updateNomorUrut ~ e:', e);
		unwatchUrut();
	}
}
</script>
<style lang="scss" scoped>
td {
	white-space: normal;
	word-wrap: break-word;
}
</style>
