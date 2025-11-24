<template lang="">
	<div>
		<FilterTanggal start-url="/keamanan/izin-pesantren/tanggal" @dataFilter="dataEmit">
			<RouterPage />
		</FilterTanggal>
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
import FilterTanggal from 'src/components/filters/FilterTanggal.vue';
import IzinPesantren from 'src/models/IzinPesantren';
import TabelIndex from './part/TabelIndex.vue';
import RouterPage from './part/RouterPage.vue';

const izin = ref([{}]);
const loading = ref(false);
const { params } = useRoute();
const dataFilter = ref({});

function dataEmit(val) {
	dataFilter.value = val;
}

async function loadData(start_date, end_date) {
	try {
		loading.value = true;
		const data = await IzinPesantren.getAll({ params: { start_date, end_date } });
		izin.value = data.izin_pesantren;
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
