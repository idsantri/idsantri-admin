<template lang="">
	<q-card>
		<q-card-section class="q-pa-sm bg-green-7 text-green-11 text-subtitle1 flex flex-center">
			Provinsi
			<q-space />
			<q-btn @click="fetchData" icon="sync" round dense flat class="q-mr-md" />
			<q-btn @click="onAdd" icon="add" round dense flat />
		</q-card-section>
		<TableAlamat
			:rows="rows"
			:columns="columns"
			:loading="loading"
			@on-select="(v) => $emit('onSelect', v)"
			@on-edit="onEdit"
		/>
		<q-dialog v-model="crudShow">
			<AlamatProvinsiForm :data="alamat" @success-delete="fetchData" @success-submit="fetchData" />
		</q-dialog>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import alamatStore from 'src/stores/alamat-store';
import TableAlamat from './TableAlamat.vue';
import AlamatProvinsiForm from 'src/components/forms/AlamatProvinsiForm.vue';
import Alamat from 'src/models/Alamat';

const rows = ref([]);
const loading = ref(false);
const alamat = ref({});
const crudShow = ref(false);
const state = alamatStore();

async function checkData() {
	rows.value = [];
	const prov = state.getProvinsi();
	if (prov?.length > 0) {
		rows.value = prov;
	} else {
		await fetchData();
	}
}

async function fetchData() {
	try {
		loading.value = true;
		const data = await Alamat.Provinsi.getAll();
		if (data && data.provinsi) {
			state.setProvinsi(data.provinsi);
			rows.value = state.getProvinsi();
		}
	} catch (_err) {
		// console.error(_err);
		console.log('error get provinsi');
	} finally {
		loading.value = false;
	}
}

function onAdd() {
	alamat.value = {};
	crudShow.value = true;
}

function onEdit(v) {
	alamat.value = v;
	crudShow.value = true;
}

onMounted(async () => {
	await checkData();
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
		name: 'provinsi',
		align: 'left',
		label: 'Provinsi',
		field: 'provinsi',
		sortable: true,
	},
];
</script>
<style lang=""></style>
