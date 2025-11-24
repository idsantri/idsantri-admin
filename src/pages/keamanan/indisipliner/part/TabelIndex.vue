<template lang="">
	<q-table
		class="dt q-pa-sm"
		:rows="indisipliner"
		:columns="columns"
		:loading="loading"
		:filter="filter"
		:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
		no-data-label="Silakan tentukan filter tanggal!"
		no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
		row-key="name"
		flat
		@row-click="(evt, row, index) => row?.id && $router.push(`/keamanan/indisipliner/${row.id}`)"
	>
	</q-table>
</template>
<script setup>
import { formatDateShort } from 'src/utils/format-date';

defineProps({
	indisipliner: {
		type: Array,
		default: () => [],
	},
	loading: {
		type: Boolean,
		default: false,
	},
	filter: {
		type: String,
		default: '',
	},
});

const columns = [
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
		name: 'kategori',
		label: 'Kategori',
		align: 'left',
		field: 'kategori_text',
		sortable: true,
	},
	{
		name: 'tgl_sidang',
		label: 'Sidang',
		align: 'left',
		field: (row) => formatDateShort(row.tgl_sidang),
		sortable: true,
	},
	{
		name: 'no_pasal',
		label: 'Pasal',
		align: 'left',
		field: 'no_pasal',
		sortable: true,
	},
	{
		name: 'data_akhir',
		label: 'Data Akhir',
		align: 'left',
		field: 'data_akhir',
		sortable: true,
	},
	{
		name: 'alamat',
		label: 'Alamat',
		align: 'left',
		field: 'alamat_pendek',
		sortable: true,
		classes: 'alamat',
	},
];
</script>
<style lang=""></style>
