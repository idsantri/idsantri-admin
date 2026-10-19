<template>
	<div>
		<temp-array :data="dataMap" :spinner="spinner" @add="handleAdd" @edit="handleEdit" />

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
import { formatHijri, masehiToHijri } from 'src/utils/hijri.js';
import { deleteById, getObjectById, replaceById } from 'src/utils/array-object';
import StatusForm from 'src/components/forms/StatusForm.vue';
import { useRoute } from 'vue-router';
import Status from 'src/models/Status';

const spinner = ref(false);
const crudShow = ref(false);
const dataObj = ref({});
const dataArr = ref([]);
const santri = ref({});
const { params } = useRoute();

async function loadData() {
	try {
		spinner.value = true;
		const response = await Status.santri(params.id);
		dataArr.value = response.status;
		santri.value = response.santri;
	} catch (_err) {
		// console.error(_err);
		console.log('error get status');
	} finally {
		spinner.value = false;
	}
}

const dataMap = computed(() =>
	dataArr.value.map((v) => ({
		Tanggal: formatDate(v.created_at, 'dd-MM-yyyy') + ' | ' + formatHijri(masehiToHijri(v.created_at)),
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
