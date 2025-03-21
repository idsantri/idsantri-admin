<template lang="">
	<FilterThAjaran
		start-url="/iuran/th-ajaran"
		@data-filter="(val) => (dataFilter = val)"
		bordered
		flat
	/>
	<q-card class="q-mt-sm" bordered flat>
		<q-card-section
			class="bg-green-8 text-green-1 text-subtitle1 q-pa-sm flex flex-center"
		>
			<span v-html="dataFilter.display || ''"></span>
			<q-space />
			<q-btn
				dense=""
				icon="sync"
				@click="loadData"
				class="q-px-sm q-mr-sm"
				flat
			/>
			<q-btn
				dense=""
				icon="print"
				label="Cetak"
				no-caps
				color="green-11 q-px-md"
				class="text-green-10 q-mr-sm"
				to="/info/download"
			/>
		</q-card-section>
		<q-table
			class="dt q-pa-sm"
			:rows="iuran"
			:loading="loading"
			:filter="filter"
			:columns="columns"
			:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
			no-data-label="Silakan tentukan filter tanggal!"
			no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
			row-key="name"
			flat
			@row-click="
				(evt, row, index) =>
					$router.push(
						`/iuran/santri/${row.santri_id}/${row.th_ajaran_h}`,
					)
			"
		>
			<template v-slot:top-left>
				<div class="text-subtitle1 text-green-10">Data Iuran</div>
			</template>
			<template v-slot:top-right>
				<q-input
					outlined
					dense
					debounce="300"
					v-model="filter"
					placeholder="Cari"
					type="search"
				>
					<template v-slot:append>
						<q-icon name="search" />
					</template>
				</q-input>
			</template>
		</q-table>
		<q-card-section
			class="bg-green-7 text-green-1 text-subtitle1 q-px-sm q-py-xs flex items-center justify-between"
		>
			<div class="">
				<em>Estimasi Pendapatan: </em>
				<strong>{{ sumNominal(iuran).toRupiah() }}</strong>
			</div>
			<div class="">
				<em>Total Lunas: </em>
				<strong>{{ sumLunas(iuran).toRupiah() }}</strong>
			</div>
			<div class="">
				<em>Total Tidak Lunas: </em>
				<strong>{{ sumNotLunas(iuran).toRupiah() }}</strong>
			</div>
		</q-card-section>
	</q-card>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { sumLunas, sumNominal, sumNotLunas } from '../utils';
import { formatDate } from 'src/utils/format-date';
import FilterThAjaran from 'src/components/filters/FilterTahunAjaran.vue';

const dataFilter = ref({});
const iuran = ref([]);
const loading = ref(false);
const { params } = useRoute();
const filter = ref('');

// const store = listsStore();
// const a = store.getByStateName('tahun-ajaran');
// console.log(a);

async function loadData() {
	const data = await apiGet({
		endPoint: 'iuran',
		loading,
		params: {
			th_ajaran_h: params.thAjaranH,
		},
	});
	if (data) {
		iuran.value = data.iuran;
		// console.log('🚀 ~ loadData ~ data.iuran:', data.iuran[0]);
	}
}

onMounted(async () => {
	if (params.thAjaranH) {
		await loadData();
	} else {
		iuran.value = [];
	}
});

const columns = [
	{
		name: 'th_ajaran_h',
		label: 'Tahun Ajaran',
		align: 'left',
		field: 'th_ajaran_h',
		sortable: true,
	},
	{
		name: 'santri_id',
		label: 'ID Santri',
		align: 'left',
		field: 'santri_id',
		sortable: true,
	},
	{
		name: 'nama',
		label: 'Nama',
		align: 'left',
		field: 'nama',
		sortable: true,
	},
	{
		name: 'item',
		label: 'Iuran',
		align: 'left',
		field: 'item',
		sortable: true,
	},
	{
		name: 'nominal',
		label: 'Nominal',
		align: 'right',
		field: 'nominal',
		format: (val) => `${val.toRupiah()}`,
		sortable: true,
	},
	{
		name: 'lunas',
		label: 'Lunas',
		align: 'left',
		field: (row) =>
			row.lunas ? formatDate(row.lunas, 'yyyy-MM-dd') : 'Belum dibayar',
		sortable: true,
	},
	{
		name: 'kasir',
		label: 'Penerima',
		align: 'left',
		field: 'kasir',
		sortable: true,
	},
];
</script>
<style lang=""></style>
