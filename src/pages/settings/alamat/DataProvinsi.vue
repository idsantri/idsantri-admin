<template lang="">
	<q-card>
		<q-card-section
			class="q-pa-sm bg-green-7 text-green-11 text-subtitle1 flex flex-center"
		>
			Provinsi
			<q-space />
			<q-btn
				@click="fetchData"
				icon="sync"
				round
				dense
				flat
				class="q-mr-md"
			/>
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
			<AlamatProvinsiForm
				:data="alamat"
				@success-delete="fetchData"
				@success-submit="fetchData"
			/>
		</q-dialog>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import alamatStore from 'src/stores/alamat-store';
import apiGet from 'src/api/api-get';
import TableAlamat from './TableAlamat.vue';
import AlamatProvinsiForm from 'src/components/forms/AlamatProvinsiForm.vue';

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
	const data = await apiGet({
		endPoint: 'alamat/provinsi',
		loading,
	});
	if (data && data.provinsi) {
		state.setProvinsi(data.provinsi);
		rows.value = state.getProvinsi();
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
