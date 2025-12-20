<template lang="">
	<CardPage>
		<CardHeader title="Daftar Anggaran" @on-reload="reload" />

		<q-card-section class="q-pt-sm q-pb-none q-px-sm">
			<q-card bordered flat class="">
				<q-card-section class="tw:grid tw:sm:flex tw:sm:justify-between tw:gap-2 q-pa-sm">
					<q-select
						dense
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						label="Tahun Ajaran"
						emit-value
						map-options
						v-model="thAjaranH"
						:options="optionsThAjaran"
						:loading="loadingTh"
						clearable
						behavior="menu"
					/>
					<q-select
						dense
						class="full-width"
						outlined
						label="Kategori Akun"
						emit-value
						map-options
						v-model="filterKategori"
						:options="optionsKategori"
						:loading="loading"
						clearable
						behavior="menu"
					/>
					<q-select
						dense
						class="full-width"
						outlined
						label="Group"
						emit-value
						map-options
						v-model="filterGroup"
						:options="optionsGroup"
						:loading="loading"
						clearable
						behavior="menu"
					/>
					<q-input
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						dense
						debounce="300"
						placeholder="Cari data anggaran..."
						clearable
						v-model="filterText"
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</q-card-section>
				<q-card-section v-show="!realtime" class="bg-warning q-pa-xs text-black">
					<div class="text-caption text-center">
						Data tidak realtime! Klik tombol muat ulang untuk mendapatkan data terbaru.
					</div>
				</q-card-section>
			</q-card>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-table
				bordered
				flat
				:rows="filteredData"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				class="dt"
				:filter="filterText"
				no-data-label="Tidak ada data untuk ditampilkan!"
				no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
				row-key="id"
				:columns="columns"
			>
			</q-table>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import apbBudgetsStore from 'src/stores/apb-budgets-store';
import { onMounted, ref, watch } from 'vue';

const realtime = ref(false);
const state = apbBudgetsStore();
const {
	thAjaranH,
	budgets,
	loading,
	loadingTh,
	optionsThAjaran,
	optionsKategori,
	optionsGroup,
	filterText,
	filterKategori,
	filterGroup,
	filteredData,
} = storeToRefs(state);

const reload = async () => {
	await state.listTahun();
	filterKategori.value = '';
	filterGroup.value = '';
	filterText.value = '';
	if (thAjaranH.value) {
		await state.loadByTahun(thAjaranH.value);
		realtime.value = true;
	}
};

onMounted(async () => {
	realtime.value = false;
	if (!optionsThAjaran.value?.length) {
		await state.listTahun();
	}
});

watch(thAjaranH, async (val) => {
	filterGroup.value = '';
	filterKategori.value = '';
	filterText.value = '';
	if (val) {
		await state.loadByTahun(val);
		realtime.value = true;
	} else {
		budgets.value = [];
	}
});

watch(filterKategori, () => {
	filterGroup.value = '';
});

const columns = [
	{
		name: 'account_id',
		label: 'Akun ID',
		align: 'center',
		field: 'account_id',
		sortable: true,
	},
	{
		name: 'group_nama',
		label: 'Akun ',
		field: (row) => `${row.group}: ${row.nama}`,
		align: 'left',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},

	{
		name: 'total',
		label: 'Total Anggaran',
		field: 'total',
		format: (val) => `${val ? val.toRupiah() : 0}`,
		align: 'right',
		sortable: true,
	},
	{
		name: 'total_allocated',
		label: 'Total Alokasi',
		field: 'total_allocated',
		format: (val) => `${val ? val.toRupiah() : 0}`,
		align: 'right',
		sortable: true,
	},
	{
		name: 'selisih',
		label: 'Selisih',
		field: (row) => Number(row.total_allocated) - Number(row.total),
		format: (val) => `${val ? (Number(val) >= 0 ? '+' : '-') + Math.abs(val).toRupiah() : 0}`,
		align: 'right',
		sortable: true,
		classes: (row) => (Number(row.total_allocated) - Number(row.total) > 0 ? 'text-primary' : 'text-negative'),
	},
];
</script>
<style lang=""></style>
