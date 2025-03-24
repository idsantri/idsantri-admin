<template>
	<div>
		<temp-array
			:data="dataMap"
			:spinner="spinner"
			@add="handleAdd"
			@edit="handleEdit"
		/>

		<q-dialog v-model="crudShow">
			<DomisiliForm
				:data="dataObj"
				title="Input Domisili"
				@success-delete="(id) => deleteById(dataArr, id)"
				@success-create="(res) => dataArr.push(res)"
				@success-update="(res) => replaceById(dataArr, res.id, res)"
			/>
		</q-dialog>
	</div>
</template>
<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import TempArray from 'src/pages/santri/relations/TemplateArray.vue';
import { formatDate } from 'src/utils/format-date.js';
import { m2hFormat } from 'src/utils/hijri.js';
import { deleteById, getObjectById, replaceById } from 'src/utils/array-object';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import DomisiliForm from 'src/components/forms/DomisiliForm.vue';

const spinner = ref(false);
const crudShow = ref(false);
const dataObj = ref({});
const dataArr = ref([]);
const santri = inject('santri');
const { params } = useRoute();

async function loadData() {
	const data = await apiGet({
		endPoint: 'domisili',
		loading: spinner,
		params: {
			santri_id: params.id,
		},
	});
	if (data.domisili) {
		dataArr.value = data.domisili;
	}
}

const dataMap = computed(() =>
	dataArr.value.map((v) => ({
		Tanggal:
			formatDate(v.created_at, 'dd-MM-yyyy') +
			' | ' +
			m2hFormat(formatDate(v.created_at, 'yyyy-MM-dd')),
		Domisili: v.domisili,
		Keterangan: v.keterangan || '-',
		id: v.id,
	})),
);

onMounted(async () => {
	await loadData();
});

const handleAdd = () => {
	dataObj.value = {
		santri_id: santri.id,
		nama: santri.nama,
	};
	crudShow.value = true;
};

const handleEdit = ({ id }) => {
	dataObj.value = getObjectById(dataArr, id);
	dataObj.value.santri_id = santri.id;
	dataObj.value.nama = santri.nama;

	crudShow.value = true;
};
</script>
