<template lang="">
	<CardPage>
		<CardHeader title="Daftar Akun" :show-reload="false" :show-add="true" @on-add="crudShow = true" />

		<q-card-section class="q-pt-sm q-pb-none q-px-sm">
			<q-card bordered flat class="q-pa-sm">
				<div class="text-subtitle2 q-pb-sm">Filter Data</div>
				<div class="tw:grid tw:sm:flex tw:sm:justify-between tw:gap-2">
					<q-select
						dense
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						label="Tahun Ajaran"
						emit-value
						map-options
						v-model="thAjaranH"
						:options="optionsThAjaran"
						:loading="loadingSelect"
						clearable
						behavior="menu"
					/>
					<q-input
						type="date"
						dense
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						label="Tanggal Awal"
						emit-value
						map-options
						v-model="startDate"
						:options="optionsThAjaran"
						clearable
					/>
					<q-input
						type="date"
						dense
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						label="Tanggal Akhir"
						emit-value
						map-options
						v-model="endDate"
						clearable
						behavior="menu"
					/>
					<q-input
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						dense
						debounce="300"
						v-model="filter"
						placeholder="Cari data transaksi..."
						clearable
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</div>
			</q-card>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-table
				bordered
				flat
				:rows="transactions"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				class="dt"
				:columns="columns"
				:filter="filter"
				no-data-label="Tidak ada data untuk ditampilkan!"
				no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
				row-key="name"
				@row-click="(evt, row, index) => $router.push(`/apb/transactions/${row.id}`)"
			>
			</q-table>
		</q-card-section>
		<q-dialog persistent="" v-model="crudShow">
			<!-- <UgtPjgtForm
				:data="{}"
				@success-submit="(v) => $router.push(`/ugt/pjgt/${v.id}`)"
				@success-delete="$router.go(-1)"
			/> -->
		</q-dialog>
	</CardPage>
</template>
<script setup>
import ApbTransaction from 'src/models/ApbTransaction';
import { formatDate } from 'src/utils/format-date';
import { onMounted, ref, watch } from 'vue';

const loadingSelect = ref(false);
const loading = ref(false);
const optionsThAjaran = ref([]);
const thAjaranH = ref('');
const startDate = ref('');
const endDate = ref('');

const filter = ref('');
const crudShow = ref(false);
const transactions = ref([]);

async function getThAjaran() {
	try {
		loadingSelect.value = true;
		const data = await ApbTransaction.listTahunAjaran();
		optionsThAjaran.value = data.th_ajaran_h;
	} catch (error) {
		console.log(error);
	} finally {
		loadingSelect.value = false;
	}
}

async function loadByTahun(th_ajaran_h) {
	try {
		transactions.value = [];
		loading.value = true;
		const data = await ApbTransaction.getAll({ params: { th_ajaran_h } });
		transactions.value = data.transactions;
	} catch (_err) {
		console.error('🚀 ~ loadData ~ _err:', _err);
	} finally {
		loading.value = false;
	}
}

async function loadByDate(start_date, end_date) {
	try {
		transactions.value = [];
		loading.value = true;
		const data = await ApbTransaction.getAll({
			params: {
				start_date,
				end_date,
			},
		});
		transactions.value = data.transactions;
	} catch (_err) {
		console.error('🚀 ~ loadData ~ _err:', _err);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await getThAjaran();
});

watch(thAjaranH, async (newVal) => {
	if (newVal) {
		startDate.value = '';
		endDate.value = '';
		await loadByTahun(newVal);
	} else {
		transactions.value = [];
	}
});

watch([startDate, endDate], async ([newStart, newEnd]) => {
	if (newStart && newEnd) {
		thAjaranH.value = '';
		await loadByDate(newStart, newEnd);
	} else {
		transactions.value = [];
	}
});

const columns = [
	{
		name: 'id',
		label: 'ID',
		align: 'left',
		field: 'id',
		sortable: true,
	},
	{
		name: 'th_ajaran_h',
		label: 'Th Ajaran',
		field: 'th_ajaran_h',
		align: 'left',
		sortable: true,
	},
	{
		name: 'keterangan',
		label: 'Keterangan',
		align: 'left',
		field: 'keterangan',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'nilai',
		label: 'Nilai',
		align: 'right',
		field: 'nilai',
		format: (val) => `${val.toRupiah()}`,
		sortable: true,
	},
	{
		name: 'created_at',
		label: 'Dibuat Pada',
		align: 'left',
		field: 'created_at',
		format: (val) => formatDate(val, 'dd-MM-yyyy'),
		sortable: true,
	},
	{
		name: 'atas_nama',
		label: 'an.',
		align: 'left',
		field: 'atas_nama',
		sortable: true,
	},
];
</script>
<style lang=""></style>
