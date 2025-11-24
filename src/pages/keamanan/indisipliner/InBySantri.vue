<template lang="">
	<div>
		<FilterSantri start-url="/keamanan/indisipliner/santri" @dataFilter="dataEmit">
			<RouterPage />
		</FilterSantri>

		<q-card class="q-mt-sm" flat bordered>
			<q-card-section class="bg-green-7 text-green-1 text-subtitle1 q-pa-sm flex flex-center">
				<span v-html="dataFilter.display || ''"></span>
				<q-space />
				<InputSearch v-model="filter" bg-color="green-11" />
			</q-card-section>
			<TabelIndex :indisipliner="indisipliner" :loading="loading" :filter="filter" />
		</q-card>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Indisipliner from 'src/models/Indisipliner';
import TabelIndex from './part/TabelIndex.vue';
import FilterSantri from 'src/components/filters/FilterSantri.vue';
import RouterPage from './part/RouterPage.vue';
import InputSearch from 'src/components/inputs/InputSearch.vue';

const filter = ref('');
const indisipliner = ref([{}]);
const loading = ref(false);
const { params } = useRoute();
const dataFilter = ref({});

function dataEmit(val) {
	dataFilter.value = val;
}

async function loadData(santri_id) {
	try {
		loading.value = true;
		const data = await Indisipliner.getAll({ params: { santri_id } });
		indisipliner.value = data.indisipliner;
	} catch (error) {
		console.log('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	if (params.id) {
		await loadData(params.id);
	}
});
</script>
<style lang=""></style>
