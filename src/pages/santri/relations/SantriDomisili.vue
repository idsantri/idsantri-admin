<template>
	<div>
		<temp-array :data="dataMap" :spinner="spinner" @add="handleAdd" @edit="handleEdit" />

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
import { ref, onMounted, computed } from 'vue';
import TempArray from 'src/pages/santri/relations/TemplateArray.vue';
import { formatDate } from 'src/utils/format-date.js';
import { formatHijri, masehiToHijri } from 'src/utils/hijri.js';
import { deleteById, getObjectById, replaceById } from 'src/utils/array-object';
import { useRoute } from 'vue-router';
import DomisiliForm from 'src/components/forms/DomisiliForm.vue';
import Domisili from 'src/models/Domisili';

const spinner = ref(false);
const crudShow = ref(false);
const dataObj = ref({});
const dataArr = ref([]);
const santri = ref({});
const { params } = useRoute();

async function loadData() {
	try {
		spinner.value = true;
		const response = await Domisili.santri(params.id);
		dataArr.value = response.domisili;
		santri.value = response.santri;
	} catch (_err) {
		// console.error(_err);
		console.log('error get domisili');
	} finally {
		spinner.value = false;
	}
}

const dataMap = computed(() =>
	dataArr.value.map((v) => ({
		Tanggal: formatDate(v.created_at, 'dd-MM-yyyy') + ' | ' + formatHijri(masehiToHijri(v.created_at)),
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
