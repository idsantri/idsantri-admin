<template>
	<div>
		<temp-array
			:data="dataMap"
			:spinner="spinner"
			link="/madrasah/kelas"
			@add="handleAdd"
			@edit="handleEdit"
		/>

		<q-dialog v-model="crudShow">
			<santri-kelas-crud
				:data="dataObj"
				:is-new="isNew"
				title="Input Kelas"
				@success-submit="loadData"
				@success-delete="loadData"
			/>
		</q-dialog>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import TempArray from 'src/pages/santri/relations/TemplateArray.vue';
import { getObjectById } from 'src/utils/array-object';
import SantriKelasCrud from './SantriKelasCrud.vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';

const spinner = ref(false);
const crudShow = ref(false);
const dataObj = ref({});
const dataMap = ref([]);
const dataArr = ref([]);
const isNew = ref(false);
const santri = ref({});

const route = useRoute();
const santriId = route.params.id;

async function loadData() {
	const data = await apiGet({
		endPoint: `santri/${santriId}/kelas`,
		loading: spinner,
	});
	if (!data.kelas) return;
	dataArr.value = data.kelas;
	dataMap.value = data.kelas
		.map((v) => ({
			'Tahun Ajaran': `${v.th_ajaran_h}  |  ${v.th_ajaran_m || ''} `,
			Kelas:
				`${v.kelas} ${v.tingkat}` +
				(v.no_absen ? ` (No. ${v.no_absen})` : ''),
			Keterangan: v.keterangan || '-',
			id: v.id,
		}))
		.reverse();

	santri.value = data.santri;
}

onMounted(async () => {
	await loadData();
});

const handleAdd = () => {
	dataObj.value = {
		santri_id: santri.value.id,
		nama: santri.value.nama,
	};

	isNew.value = true;
	crudShow.value = true;
};

const handleEdit = ({ id }) => {
	dataObj.value = getObjectById(dataArr, id);
	dataObj.value.santri_id = santri.value.id;
	dataObj.value.nama = santri.value.nama;

	isNew.value = false;
	crudShow.value = true;
};
</script>
