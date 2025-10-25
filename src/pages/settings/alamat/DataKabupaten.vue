<template lang="">
	<q-card>
		<q-card-section class="q-pa-sm bg-green-7 text-green-11 text-subtitle1 flex flex-center">
			Kabupaten/Kota
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
			<AlamatKabupatenForm :data="alamat" @success-delete="fetchData" @success-submit="fetchData" />
		</q-dialog>
	</q-card>
</template>
<script setup>
import { ref, watch } from 'vue';
import alamatStore from 'src/stores/alamat-store';
import { notifyWarning } from 'src/utils/notify';
import TableAlamat from './TableAlamat.vue';
import AlamatKabupatenForm from 'src/components/forms/AlamatKabupatenForm.vue';
import Alamat from 'src/models/Alamat';

const props = defineProps({
	provinsi_id: { type: String, required: true, default: '' },
});

const rows = ref([]);
const loading = ref(false);
const alamat = ref({});
const crudShow = ref(false);
const state = alamatStore();

async function fetchData() {
	rows.value = [];
	const { provinsi_id } = props;
	if (!provinsi_id) return;

	try {
		loading.value = true;
		const data = await Alamat.Kabupaten.getAll({ params: { provinsi_id } });
		if (data && data.kabupaten) {
			state.setKabupaten(data.kabupaten, { provinsi_id });
			rows.value = state.getKabupaten({ provinsi_id });
		}
	} catch (_err) {
		// console.error(_err);
		console.log('error get kabupaten');
	} finally {
		loading.value = false;
	}
}

async function checkData() {
	rows.value = [];
	const { provinsi_id } = props;
	if (!provinsi_id) return;

	const kabupaten = state.getKabupaten({ provinsi_id });
	if (kabupaten?.length > 0) {
		rows.value = kabupaten;
	} else {
		fetchData();
	}
}
function onAdd() {
	const { provinsi_id } = props;
	if (!provinsi_id) {
		return notifyWarning('Pilih provinsi terlebih dahulu!');
	}
	alamat.value = { provinsi_id };
	crudShow.value = true;
}

function onEdit(v) {
	alamat.value = v;
	crudShow.value = true;
}

watch(
	() => props.provinsi_id,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
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
		format: (val) => `${val.replace(/(\w{2})(\w{2})/, '$1.$2')}`,
	},
	{
		name: 'kabupaten',
		align: 'left',
		label: 'Kabupaten',
		field: 'kabupaten',
		sortable: true,
	},
];
</script>
<style lang=""></style>
