<template lang="">
	<q-card-section class="q-pa-sm bg-green-7 text-green-11"> Riwayat Transaksi </q-card-section>

	<q-card-section class="q-pa-sm">
		<div class="q-mb-sm tw:flex tw:items-center tw:justify-between tw:gap-2 tw:flex-wrap">
			<q-select
				class="tw:max-w-sm tw:flex-grow tw:w-full"
				dense
				outlined
				v-model="thAjaranH"
				:options="optionsTahun"
				label="Pilih Tahun Ajaran"
				emit-value
				map-options
				:loading="loadingTahun"
				clearable
				behavior="menu"
			/>
			<InputSearch
				class="tw:max-w-sm tw:flex-grow tw:w-full"
				label="Cari"
				v-model="filterText"
				:disable="!journals?.length"
			/>
		</div>
		<q-card v-if="!!budget?.id" bordered flat class="q-mb-sm bg-green-1">
			<q-card-section class="q-pa-xs flex items-center justify-between">
				<div class="tw:flex tw:gap-4 tw:items-center">
					<div class="bg-transparent text-subtitle2" flat bordered>
						<span class="text-caption text-italic"> Total Anggaran: </span>
						{{ budget?.total_budget?.toRupiah() }}
					</div>
					<div class="bg-transparent text-subtitle2" flat bordered>
						<span class="text-caption text-italic"> Total Serapan: </span>
						{{ budget?.total_absorbed?.toRupiah() }}
					</div>
					<div class="bg-transparent text-subtitle2" flat bordered>
						<span class="text-caption text-italic"> Total Sisa: </span>
						{{ (Number(budget?.total_budget) - Number(budget?.total_absorbed)).toRupiah() }}
					</div>
				</div>
				<q-btn
					:disable="!budget?.id"
					outline
					no-caps
					dense
					class="q-px-sm"
					color="green-10"
					label="Lihat selengkapnya"
					:to="`/apb/budgets/${budget?.id}`"
				/>
			</q-card-section>
		</q-card>
		<q-table
			:columns="columns"
			bordered
			flat
			:rows="journals"
			:loading="loading"
			:filter="filterText"
			:rows-per-page-options="[10, 25, 50, 100, 0]"
			class="dt"
			no-data-label="Tidak ada data untuk ditampilkan!"
			no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
			row-key="transaction_id"
		>
			<template v-slot:body-cell-transaction_id="props">
				<q-td :props="props">
					<q-btn
						:label="props.value"
						no-caps
						size="sm"
						outline
						class="text-green-10"
						:to="`/apb/transactions/${props.value}`"
					/>
				</q-td>
			</template>
		</q-table>
	</q-card-section>
</template>
<script setup>
import InputSearch from 'src/components/inputs/InputSearch.vue';
import ApbJournal from 'src/models/ApbJournal';
import ApbTransaction from 'src/models/ApbTransaction';
import { formatDate } from 'src/utils/format-date';
import { formatHijri, masehiToHijri } from 'src/utils/hijri';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
	account_id: {
		type: String,
		required: true,
	},
});
const optionsTahun = ref([]);
const loadingTahun = ref(false);
const thAjaranH = ref(null);
const journals = ref([]);
const budget = ref(null);
const loading = ref(false);
const router = useRouter();
const { query } = useRoute();
const filterText = ref('');

async function loadTahunAjaran() {
	try {
		loadingTahun.value = true;
		const data = await ApbTransaction.listTahunAjaranAccount(props.account_id);
		optionsTahun.value = data.th_ajaran_h;
	} catch (error) {
		console.error('🚀 ~ loadTahunAjaran ~ error:', error);
	} finally {
		loadingTahun.value = false;
	}
}

async function loadJournals(th_ajaran_h) {
	try {
		loading.value = true;
		const data = await ApbJournal.accountAndTahun(props.account_id, th_ajaran_h);
		journals.value = data.journals;
		budget.value = data.budget;
	} catch (error) {
		console.error('🚀 ~ loadJournals ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadTahunAjaran();
	if (query.th) thAjaranH.value = query.th;
	// if (thAjaranH.value) await loadJournals(thAjaranH.value);
});

watch(thAjaranH, async (th) => {
	if (th) {
		router.replace({ query: { th: th } });
		await loadJournals(th);
	} else {
		router.replace({ query: {} });
		journals.value = [];
	}
});

const columns = [
	{
		name: 'transaction_id',
		label: 'ID Transaksi',
		align: 'center',
		field: 'transaction_id',
		sortable: true,
	},
	{
		name: 'transaction_date',
		label: 'Dibuat (M)',
		align: 'left',
		field: 'transaction_date',
		format: (val) => formatDate(val, 'dd-MM-yyyy'),
		sortable: true,
	},
	{
		name: 'hijri',
		label: 'Dibuat (H)',
		align: 'left',
		field: (row) => masehiToHijri(row.transaction_date),
		format: (val) => formatHijri(val),
		sortable: true,
	},
	// 	{
	// 	name: 'th_ajaran_h',
	// 	label: 'Tahun Ajaran',
	// 	align: 'left',
	// 	field: 'th_ajaran_h',
	// 	sortable: true,
	// },
	{
		name: 'description',
		label: 'Keterangan',
		align: 'left',
		field: 'description',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'account_id',
		label: 'Akun ID',
		align: 'left',
		field: 'account_id',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},

	// {
	// 	name: 'group_nama',
	// 	label: 'Akun ',
	// 	field: (row) => `${row.account_group}: ${row.account_nama}`,
	// 	align: 'left',
	// 	sortable: true,
	// 	style: 'white-space: normal; word-wrap: break-word;',
	// },

	{
		name: 'debit',
		label: 'Debit',
		field: 'debit',
		format: (val) => `${val ? val.toRupiah() : 0}`,
		align: 'right',
		sortable: true,
	},
	{
		name: 'credit',
		label: 'Kredit',
		field: 'credit',
		format: (val) => `${val ? val.toRupiah() : 0}`,
		align: 'right',
		sortable: true,
	},

	{
		name: 'balance',
		label: 'Saldo',
		field: 'balance',
		format: (val) => `${val ? (Number(val) >= 0 ? '+' : '-') + Math.abs(val).toRupiah() : 0}`,
		align: 'right',
		sortable: true,
		classes: (row) => (Number(row.balance) > 0 ? 'text-primary' : 'text-negative'),
	},
];
</script>
<style lang="scss" scoped>
.q-table thead tr,
.q-table tbody td {
	height: 42px;
}
</style>
