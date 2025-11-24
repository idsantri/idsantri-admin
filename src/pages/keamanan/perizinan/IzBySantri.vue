<template lang="">
	<div>
		<FilterSantri start-url="/keamanan/izin-pesantren/santri" @dataFilter="dataEmit">
			<RouterPage />
		</FilterSantri>
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

const izin = ref([{}]);
const loading = ref(false);
const { params } = useRoute();
const dataFilter = ref({});

function dataEmit(val) {
	dataFilter.value = val;
}

async function loadData(santri_id) {
	try {
		loading.value = true;
		const data = await IzinPesantren.getAll({ params: { santri_id } });
		izin.value = data.izin_pesantren;
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
