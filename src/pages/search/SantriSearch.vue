<template>
	<q-card style="width: 100%" flat>
		<q-card-section class="bg-green-7 text-green-1 q-pa-sm flex items-center">
			<h2 class="text-subtitle1 no-margin text-green-11">Cari Santri</h2>
			<q-space />
			<q-btn
				label="Tambah"
				color="green-12"
				class="text-green-10 q-px-sm"
				icon="add"
				no-caps=""
				dense=""
				@click="addNew"
			/>
		</q-card-section>
		<q-card-section>
			<data-table class="display table nowrap dt" :options="options" style="overflow: hidden" id="tabel" />
		</q-card-section>
		<q-card-actions class="bg-green-6">
			<div class="text-body2 text-green-11 text-italic">
				<div>▪️ Cari berdsarkan ID, nama santri, NIK, alamat, atau data akhir</div>
				<div>▪️ simbol % = karakter apapun</div>
			</div>
			<q-space />
			<q-btn
				label="Tutup"
				color="green-1"
				class="text-green-10"
				no-caps=""
				v-close-popup
				id="btn-close-santri-search"
				v-show="searchSantri"
			/>
		</q-card-actions>
	</q-card>
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net-dt';
import api from 'src/api';
import dialogStore from 'src/stores/dialog-store';
import santriStore from 'src/stores/santri-store';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { toArray } from 'src/utils/array-object';
import useAuthStore from 'src/stores/auth-store';

const dialog = dialogStore();
const { searchSantri, crudSantri } = toRefs(dialog);

const addNew = () => {
	santriStore().$reset();
	santriStore().setNew();
	crudSantri.value = true;
};

const router = useRouter();
const token = useAuthStore().token || '';
const url = `${api.defaults.baseURL}/santri/search`;
const headers = {
	Authorization: `Bearer ${token}`,
};

DataTable.use(DataTablesLib);
const options = ref({
	processing: true,
	serverSide: true,
	responsive: true,
	ajax: {
		url: url,
		type: 'POST',
		headers: headers,
		error: (xhr) => {
			const message = xhr.responseJSON?.message;
			if (message) toArray(message).forEach((msg) => notifyError(msg));
			else console.log(`Error during get ${url}`, xhr);
		},
	},
	order: [],
	columns: [
		{
			title: 'ID',
			data: 'id',
			render: function (data, type, row /*, meta*/) {
				return `<button onclick='copyId(${row.id})' class='dt-btn-flat' title='Klik/Tap untuk menyalin ID'>${row.id}</button>`;
			},
		},
		{
			title: 'Nama',
			data: 'nama',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToSantri(${row.id})'>${row.nama}</span>`;
			},
		},
		{
			title: 'Alamat',
			data: 'alamat_pendek',
			render: function (data, type /*, row , meta*/) {
				return type === 'display' && data.length > 50
					? `<span title='${data}'>${data.substr(0, 50)}&mldr;</span>`
					: data;
			},
		},
		{
			title: 'Data Akhir',
			data: 'data_akhir',
		},
		{
			title: 'NIK',
			data: 'nik',
		},
		{
			title: 'Wali',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToWali(${row.wali_id})'>${row.wali_nama} (${row.wali_status})</span>`;
			},
		},
		{
			title: 'Ortu',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToOrtu(${row.ortu_id})'>${row.ayah} | ${row.ibu}</span>`;
			},
		},
	],
	language: {
		search: 'Cari:',
		zeroRecords: 'Tidak data data untuk ditampilkan. Coba kata kunci yang lain!',
		info: 'Menampilkan _START_ hingga _END_, dari total _TOTAL_ data',
		// info: 'Halaman _PAGE_ dari _PAGES_ halaman',
		infoFiltered: '(disaring dari _MAX_ total data)',
		paginate: { first: '↑', previous: '←', next: '→', last: '↓' },
		lengthMenu: '_MENU_ Perhalaman',
	},
	autoWidth: false,
	// dom: 'bftip',
	scrollX: true,
	search: {
		return: true,
	},
});

onMounted(() => {
	document.goToSantri = (id) => {
		router.push(`/santri/${id}`);
	};
	document.goToWali = (id) => {
		router.push(`/wali/${id}`);
	};
	document.goToOrtu = (id) => {
		router.push(`/ortu/${id}`);
	};
	document.copyId = (id) => {
		navigator.clipboard.writeText(id);
		notifySuccess(`ID (${id}) sudah disalin/dicopy ke clipboard`);
		searchSantri.value = false;
	};
});

// onUnmounted(() => {
//     delete document.goToSantri;
//     delete document.goToWali;
//     delete document.goToOrtu;
//     delete document.copyId;
// });
</script>
<style lang="scss">
@import 'datatables.net-dt';
</style>
