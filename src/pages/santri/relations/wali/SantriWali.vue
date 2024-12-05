<template>
	<temp-object
		:data="dataObj"
		:spinner="spinner"
		:route="'/wali/' + dataObj['ID Wali']"
	/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TempObject from 'src/pages/santri/relations/TemplateObject.vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';

const route = useRoute();
const santriId = route.params.id;
const spinner = ref(false);
const dataObj = ref({});

onMounted(async () => {
	const { wali } = await apiGet({
		endPoint: `santri/${santriId}/wali`,
		loading: spinner,
	});
	if (!wali) return;
	dataObj.value = {
		'ID Wali': wali.id,
		Nama: `${wali.nama} (${wali?.sex?.toUpperCase()})`,
		Status: wali.wali_status,
		Telepon: wali.telepon || '-',
	};
});
</script>
