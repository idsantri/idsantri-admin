<template>
	<div>
		<temp-array
			:data="dataMap"
			:spinner="spinner"
			@add="handleAdd"
			@edit="handleEdit"
		/>

		<q-dialog v-model="crudShow">
			<StatusForm
				:data="dataObj"
				@success-delete="(id) => deleteById(dataArr, id)"
				@success-create="(res) => dataArr.push(res)"
				@success-update="(res) => replaceById(dataArr, res.id, res)"
			/>
		</q-dialog>
	</div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import TempArray from 'src/pages/santri/relations/TemplateArray.vue';
import { formatDate } from 'src/utils/format-date.js';
import { m2hFormat } from 'src/utils/hijri.js';
import { deleteById, getObjectById, replaceById } from 'src/utils/array-object';
import apiGet from 'src/api/api-get';
import StatusForm from 'src/components/forms/StatusForm.vue';
import { useRoute } from 'vue-router';

const spinner = ref(false);
const crudShow = ref(false);
const dataObj = ref({});
const dataArr = ref([]);
const santri = ref({});
const { params } = useRoute();

async function loadData() {
	const data = await apiGet({
		endPoint: `status/santri/${params.id}`,
		loading: spinner,
	});
	if (data.status) {
		dataArr.value = data.status;
		santri.value = data.santri;
	}
}

const dataMap = computed(() =>
	dataArr.value.map((v) => ({
		Tanggal:
			formatDate(v.created_at, 'dd-MM-yyyy') +
			' | ' +
			m2hFormat(formatDate(v.created_at, 'yyyy-MM-dd')),
		Status: v.status,
		Keterangan: v.keterangan || '-',
		id: v.id,
	})),
);

onMounted(async () => {
	await loadData();
});

const handleAdd = () => {
	dataObj.value = {
		santri_id: santri.value.id,
		nama: santri.value.nama,
	};
	crudShow.value = true;
};

const handleEdit = ({ id }) => {
	dataObj.value = getObjectById(dataArr, id);
	dataObj.value.santri_id = santri.value.id;
	dataObj.value.nama = santri.value.nama;

	crudShow.value = true;
};
</script>
