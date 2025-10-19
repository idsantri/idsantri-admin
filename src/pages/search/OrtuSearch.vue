<template>
	<q-card style="width: 100%">
		<q-card-section
			class="bg-green-8 text-green-1 q-pa-sm flex items-center"
		>
			<h2 class="text-subtitle1 no-margin text-green-11">
				Cari Orang Tua
			</h2>
			<q-space />
			<q-btn
				label="Tambah"
				color="green-12"
				class="text-green-10 q-px-sm"
				icon="add"
				no-caps=""
				dense=""
				@click="addNew"
				v-show="crudSantri"
			/>
		</q-card-section>
		<q-card-section>
			<data-table
				class="display table nowrap dt"
				:options="options"
				style="overflow: hidden"
			/>
		</q-card-section>
		<q-card-actions class="bg-green-7">
			<div class="text-body2 text-green-11 text-italic">
				<div>▪️ Cari berdsarkan ID, nama ayah/ibu, atau NIK</div>
				<div>▪️ simbol % = karakter apapun</div>
			</div>
			<q-space />
			<q-btn
				label="Tutup"
				color="green-1"
				class="text-green-10"
				no-caps=""
				v-close-popup
				id="btn-close-ortu-search"
				v-show="searchOrtu"
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
import getToken from 'src/api/get-token';
import dialogStore from 'src/stores/dialog-store';
import santriStore from 'src/stores/santri-store';
import ortuStore from 'src/stores/ortu-store';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { toArray } from 'src/utils/array-object';

const dialog = dialogStore();
const { searchOrtu, crudOrtu, crudSantri } = toRefs(dialog);
const addNew = () => {
	ortuStore().$reset();
	ortuStore().setNew();
	crudOrtu.value = true;
};

const router = useRouter();

const url = `${api.defaults.baseURL}/ortu/search`;
const headers = {
	Authorization: `Bearer ${getToken()}`,
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
			title: 'Ayah',
			data: 'ayah',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToOrtu(${row.id})'>${row.ayah}</span>`;
			},
		},
		{
			title: 'NIK Ayah',
			data: 'a_nik',
		},
		{
			title: 'Ibu',
			data: 'ibu',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToOrtu(${row.id})'>${row.ibu}</span>`;
			},
		},
		{
			title: 'NIK (Ibu)',
			data: 'i_nik',
		},

		{
			title: 'Anak1',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToSantri(${
					row.santri1_id
				})'>${row.santri1_nama || '-'}</span>`;
			},
		},
		{
			title: 'Anak2',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToSantri(${
					row.santri2_id
				})'>${row.santri2_nama || '-'}</span>`;
			},
		},
		{
			title: 'Anak3',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToSantri(${
					row.santri3_id
				})'>${row.santri3_nama || '-'}</span>`;
			},
		},
		{
			title: 'Anak4',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToSantri(${
					row.santri4_id
				})'>${row.santri4_nama || '-'}</span>`;
			},
		},
		{
			title: 'Anak5',
			render: function (data, type, row /*, meta*/) {
				return `<span class="dt-link" onclick='goToSantri(${
					row.santri5_id
				})'>${row.santri5_nama || '-'}</span>`;
			},
		},
	],
	language: {
		search: 'Cari:',
		zeroRecords:
			'Tidak data data untuk ditampilkan. Coba kata kunci yang lain!',
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
	document.goToOrtu = (id) => {
		router.push(`/ortu/${id}`);
	};
	document.copyId = (id) => {
		if (crudSantri.value) {
			santriStore().setOrtuId(id);
		} else {
			navigator.clipboard.writeText(id);
			notifySuccess(`ID (${id}) sudah disalin/dicopy ke clipboard`);
		}
		searchOrtu.value = false;
	};
});

// onUnmounted(() => {
// 	delete document.goToSantri;
// 	delete document.goToOrtu;
// 	delete document.copyId;
// });
</script>
<style lang="scss">
@import 'datatables.net-dt';
</style>
