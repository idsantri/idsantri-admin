<template lang="">
	<q-card>
		<q-card-section
			class="q-pa-sm bg-green-7 text-green-11 text-subtitle1 flex flex-center"
		>
			Desa/Kelurahan
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
			@on-select="null"
			:no-check-box="true"
			@on-edit="onEdit"
		/>
		<q-dialog v-model="crudShow">
			<CrudDesa
				:data="alamat"
				@success-delete="fetchData"
				@success-submit="fetchData"
			/>
		</q-dialog>
	</q-card>
</template>
<script setup>
import { ref, watch } from 'vue';
import alamatStore from 'src/stores/alamat-store';
import apiGet from 'src/api/api-get';
import { notifyWarning } from 'src/utils/notify';
import TableAlamat from './TableAlamat.vue';
import CrudDesa from './CrudDesa.vue';

const props = defineProps({
	provinsi_id: { type: String, required: true, default: '' },
	kabupaten_id: { type: String, required: true, default: '' },
	kecamatan_id: { type: String, required: true, default: '' },
});

const rows = ref([]);
const loading = ref(false);
const alamat = ref({});
const crudShow = ref(false);
const state = alamatStore();

async function fetchData() {
	rows.value = [];
	const { provinsi_id, kabupaten_id, kecamatan_id } = props;
	if (!kabupaten_id || !provinsi_id || !kecamatan_id) return;

	const data = await apiGet({
		endPoint: 'alamat/desa',
		loading,
		params: { kecamatan_id },
	});
	if (data && data.desa) {
		state.setDesa(data.desa, {
			provinsi_id,
			kabupaten_id,
			kecamatan_id,
		});
		rows.value = state.getDesa({
			provinsi_id,
			kabupaten_id,
			kecamatan_id,
		});
	}
}

async function checkData() {
	rows.value = [];
	const { provinsi_id, kabupaten_id, kecamatan_id } = props;
	if (!kabupaten_id || !provinsi_id || !kecamatan_id) return;

	const desa = state.getDesa({
		provinsi_id,
		kabupaten_id,
		kecamatan_id,
	});
	if (desa?.length > 0) {
		rows.value = desa;
	} else {
		await fetchData();
	}
}

function onAdd() {
	const { kecamatan_id } = props;
	if (!kecamatan_id) {
		return notifyWarning('Pilih kecamatan terlebih dahulu!');
	}
	alamat.value = { kecamatan_id };
	crudShow.value = true;
}

function onEdit(v) {
	alamat.value = v;
	crudShow.value = true;
}

watch(
	() => props.kecamatan_id,
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	async (v) => {
		// console.log('w', v);
		await checkData();
	},
);

const columns = [
	{
		name: 'id',
		label: 'ID',
		align: 'left',
		field: 'id',
		sortable: true,
		format: (val) =>
			`${val.replace(/(\w{2})(\w{2})(\w{2})(\w{4})/, '$1.$2.$3.$4')}`,
	},
	{
		name: 'desa',
		align: 'left',
		label: 'Desa',
		field: 'desa',
		sortable: true,
	},
];
</script>
<style lang=""></style>
