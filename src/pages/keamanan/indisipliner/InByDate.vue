<template lang="">
	<div>
		<FilterTanggal start-url="/keamanan/indisipliner/tanggal" @dataFilter="dataEmit">
			<RouterPage />
		</FilterTanggal>

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
import { isDate } from 'src/utils/format-date';
import FilterTanggal from 'src/components/filters/FilterTanggal.vue';
import Indisipliner from 'src/models/Indisipliner';
import TabelIndex from './part/TabelIndex.vue';
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

async function loadData(start_date, end_date) {
	try {
		loading.value = true;
		const data = await Indisipliner.getAll({ params: { start_date, end_date } });
		indisipliner.value = data.indisipliner;
	} catch (error) {
		console.log('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	if (isDate(params.startDate) && isDate(params.endDate)) {
		await loadData(params.startDate, params.endDate);
	}
});
</script>
<style lang=""></style>
