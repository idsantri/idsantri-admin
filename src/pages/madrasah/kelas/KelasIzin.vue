<template lang="">
	<temp-array
		:data="izinMap"
		:spinner="loading"
		:btn-print="true"
		@add="handleAdd"
		@edit="handleEdit"
		@print="handlePrint"
	/>
	<q-dialog v-model="crudShow">
		<IzinMadrasahForm
			:data="izinObj"
			@success-submit="loadData"
			@success-delete="loadData"
		/>
	</q-dialog>
	<q-dialog v-model="showViewer">
		<ReportViewer :url="urlReport" />
	</q-dialog>

	<!-- <pre>{{ izin }}	</pre> -->
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateShort } from 'src/utils/format-date';
import { formatHijri, m2h } from 'src/utils/hijri';
import { getObjectById } from 'src/utils/array-object';
import apiGet from 'src/api/api-get';
import TempArray from 'src/pages/santri/relations/TemplateArray.vue';
import IzinMadrasahForm from 'src/components/forms/IzinMadrasahForm.vue';
import ReportViewer from 'src/components/ReportViewer.vue';

const route = useRoute();
const params = route.params;
const izin = ref([]);
const izinMap = ref([]);
const izinObj = ref({});
const loading = ref(false);
const crudShow = ref(false);
const kelas = ref({});
const urlReport = ref('');

async function loadData() {
	const data = await apiGet({
		endPoint: `izin-madrasah/kelas/${params.id}`,
		loading,
	});
	if (data.izin_madrasah) {
		izin.value = data.izin_madrasah;
		kelas.value = data.kelas;
		izinMap.value = data.izin_madrasah.map((v) => ({
			Tanggal:
				formatDateShort(v.dari_tgl) +
				' | ' +
				formatHijri(m2h(v.dari_tgl)),
			Durasi: v.durasi + ' hari',
			Keperluan:
				v.keperluan +
				`${v.keterangan?.length > 0 ? ' (' + v.keterangan + ')' : ''}`,
			Catatan: v.catatan,
			id: v.id,
		}));
	}
}

onMounted(async () => {
	await loadData();
});

const handleAdd = () => {
	// console.log('add');
	izinObj.value = {};
	izinObj.value.santri_id = kelas.value.santri_id;
	izinObj.value.nama = kelas.value.nama;
	izinObj.value.th_ajaran_h = kelas.value.th_ajaran_h;
	izinObj.value.tingkat_id = kelas.value.tingkat_id;
	izinObj.value.kelas = kelas.value.kelas;
	izinObj.value.kelas_id = kelas.value.id;

	crudShow.value = true;
};

const handleEdit = ({ id }) => {
	// console.log('edit');
	izinObj.value = {};
	izinObj.value = getObjectById(izin, id);
	izinObj.value.santri_id = kelas.value.santri_id;
	izinObj.value.nama = kelas.value.nama;
	izinObj.value.th_ajaran_h = kelas.value.th_ajaran_h;
	izinObj.value.tingkat_id = kelas.value.tingkat_id;
	izinObj.value.kelas = kelas.value.kelas;

	crudShow.value = true;
};

const showViewer = ref(false);
function handlePrint(v) {
	urlReport.value = `reports/izin-madrasah/view?id=${v.id}}`;
	showViewer.value = true;
}
</script>
<style lang=""></style>
