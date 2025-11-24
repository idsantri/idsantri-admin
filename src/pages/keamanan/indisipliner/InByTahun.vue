<template lang="">
	<div>
		<FilterTahunAjaran :showBulanUjian="true" start-url="/keamanan/indisipliner/th-ajaran" @dataFilter="dataEmit">
			<RouterPage />
		</FilterTahunAjaran>

		<q-card class="q-mt-sm" flat bordered>
			<q-card-section class="bg-green-7 text-green-1 text-subtitle1 q-pa-sm flex flex-center">
				<span v-html="dataFilter.display || ''"></span>
				<q-space />
			</q-card-section>
			<TabelIndex :indisipliner="indisipliner" :loading="loading" />
		</q-card>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Indisipliner from 'src/models/Indisipliner';
import TabelIndex from './part/TabelIndex.vue';
import FilterTahunAjaran from 'src/components/filters/FilterTahunAjaran.vue';
import RouterPage from './part/RouterPage.vue';

const indisipliner = ref([{}]);
const loading = ref(false);
const { params } = useRoute();
const dataFilter = ref({});

function dataEmit(val) {
	dataFilter.value = val;
}

async function loadData(th_ajaran_h) {
	try {
		loading.value = true;
		const data = await Indisipliner.getAll({ params: { th_ajaran_h } });
		indisipliner.value = data.indisipliner;
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
