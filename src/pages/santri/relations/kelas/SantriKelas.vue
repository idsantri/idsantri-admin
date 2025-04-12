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
			<KelasForm
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
import { deleteById, getObjectById, replaceById } from 'src/utils/array-object';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import KelasForm from 'src/components/forms/KelasForm.vue';

const spinner = ref(false);
const crudShow = ref(false);
const dataObj = ref({});
const dataArr = ref([]);
const santri = ref({});
const { params } = useRoute();

async function loadData() {
	const data = await apiGet({
		endPoint: `kelas/santri/${params.id}`,
		loading: spinner,
	});
	if (data.kelas) {
		dataArr.value = data.kelas;
		santri.value = data.santri;
	}
}

const dataMap = computed(() =>
	dataArr.value
		.map((v) => ({
			'Tahun Ajaran': `${v.th_ajaran_h}  |  ${v.th_ajaran_m || ''} `,
			Kelas:
				`${v.kelas} ${v.tingkat}` +
				(v.no_absen ? ` (No. ${v.no_absen})` : ''),
			Keterangan: v.keterangan || '-',
			id: v.id,
		}))
		.reverse(),
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
