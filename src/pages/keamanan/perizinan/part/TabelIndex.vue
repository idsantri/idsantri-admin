<template lang="">
	<q-table
		class="dt q-pa-sm"
		:rows="izin"
		:columns="columns"
		:loading="loading"
		:filter="filter"
		:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
		no-data-label="Silakan tentukan filter tanggal!"
		no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
		row-key="name"
		flat
		@row-click="(evt, row, index) => row?.id && $router.push(`/keamanan/izin-pesantren/${row.id}`)"
	>
	</q-table>
</template>
<script setup>
defineProps({
	izin: {
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
		name: 'data_akhir',
		label: 'Data Akhir',
		align: 'left',
		field: 'data_akhir',
		sortable: true,
	},
	// {
	// 	name: 'sifat',
	// 	label: 'Sifat Izin',
	// 	align: 'left',
	// 	field: 'sifat',
	// 	sortable: true,
	// },
	{
		name: 'pengajuan',
		label: 'Sifat | Durasi | Pengajuan',
		align: 'left',
		field: (val) =>
			`${val.sifat ?? ''} ${val.durasi ? ' | ' + val.durasi + ' hari' : ''} ${val.pengajuan ? ' | ' + val.pengajuan : ''} `,
		sortable: true,
	},
	{
		name: 'dari_tgl',
		label: 'Dari',
		align: 'left',
		field: 'dari_tgl',
		sortable: true,
	},
	{
		name: 'sampai_tgl',
		label: 'Sampai',
		align: 'left',
		field: 'sampai_tgl',
		sortable: true,
	},
	{
		name: 'status',
		label: 'Status',
		align: 'left',
		field: 'status',
		sortable: true,
	},

	// {
	// 	name: 'tgl_h',
	// 	label: 'Dari (H)',
	// 	align: 'left',
	// 	field: (row) => formatHijri(row.tgl_h),
	// 	sortable: true,
	// },
	// {
	// 	name: 'durasi',
	// 	label: 'Durasi',
	// 	align: 'left',
	// 	field: (row) => {
	// 		const obj = JSON.parse(JSON.stringify(row));
	// 		const isObj =
	// 			obj !== null &&
	// 			typeof obj === 'object' &&
	// 			typeof obj.durasi !== 'undefined';
	// 		if (!isObj) return null;
	// 		else return `${row.durasi} hari`;
	// 	},
	// 	sortable: true,
	// },

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
