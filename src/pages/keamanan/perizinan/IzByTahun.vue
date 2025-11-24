<template lang="">
	<div>
		<FilterTahunAjaran start-url="/keamanan/izin-pesantren/th-ajaran" @dataFilter="dataEmit">
			<RouterPage />
		</FilterTahunAjaran>
		<q-card class="q-mt-sm" flat bordered>
			<q-card-section class="bg-green-7 text-green-1 text-subtitle1 q-pa-sm flex flex-center">
				<span v-html="dataFilter.display || ''"></span>
				<q-space />
			</q-card-section>
			<TabelIndex :loading="loading" :izin="izin" />
		</q-card>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { isDate } from 'src/utils/format-date';
import IzinPesantren from 'src/models/IzinPesantren';
import TabelIndex from './part/TabelIndex.vue';
import RouterPage from './part/RouterPage.vue';
import FilterSantri from 'src/components/filters/FilterSantri.vue';
import FilterTahunAjaran from 'src/components/filters/FilterTahunAjaran.vue';

const izin = ref([{}]);
const loading = ref(false);
const { params } = useRoute();
const dataFilter = ref({});

function dataEmit(val) {
	dataFilter.value = val;
}

async function loadData(th_ajaran_h) {
	try {
		loading.value = true;
		const data = await IzinPesantren.getAll({ params: { th_ajaran_h } });
		izin.value = data.izin_pesantren;
	} catch (error) {
		console.log('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	if (params.thAjaranH) {
		await loadData(params.thAjaranH);
	}
});
</script>
<style lang=""></style>
