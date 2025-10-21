<template>
	<temp-object :data="dataObj" :spinner="spinner" :route="'/wali/' + dataObj['ID Wali']" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import TempObject from 'src/pages/santri/relations/TemplateObject.vue';
import { useRoute } from 'vue-router';
import Santri from 'src/models/Santri';

const route = useRoute();
const santriId = route.params.id;
const spinner = ref(false);
const wali = ref({});

async function loadData() {
	spinner.value = true;
	try {
		const data = await Santri.getWali({
			santriId,
			notifySuccess: false,
		});
		if (data) {
			wali.value = data.wali;
		}
	} catch (_err) {
		// console.error('err ', _err);
	} finally {
		spinner.value = false;
	}
}

const dataObj = computed(() => ({
	'ID Wali': wali.value.id,
	Nama: `${wali.value?.nama || ''} (${wali.value?.sex?.toUpperCase() ?? ''})`,
	Status: wali.value.wali_status,
	Telepon: wali.value.telepon || '-',
}));

onMounted(async () => {
	await loadData();
});
</script>
