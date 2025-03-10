<template lang="">
	<q-page class="q-pa-sm">
		<filter-th-ajaran
			start-url="/bendahara/iuran-old/q/th-ajaran"
			@data-filter="(val) => (dataFilter = val)"
		>
			<DropDownMenu />
		</filter-th-ajaran>

		<IuranTable
			:data="iuran"
			:loading="loading"
			:heading="dataFilter.display"
		/>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import FilterThAjaran from 'pages/bendahara/HeadFilterThAjaran.vue';
import DropDownMenu from './DropDownMenu.vue';
import IuranTable from './IuranTable.vue';
import { notifyWarning } from 'src/utils/notify';

const iuran = ref([{}]);
const loading = ref(false);
const dataFilter = ref({});
const route = useRoute();
const params = {
	thAjaranH: route.params.thAjaranH,
};

onMounted(async () => {
	if (params.thAjaranH) {
		const data = await apiGet({
			endPoint: 'iuran-old',
			loading,
			params: { th_ajaran_h: params.thAjaranH },
		});
		iuran.value = data.iuran;
	}

	notifyWarning('PERHATIAN!<br/>Fitur ini sudah deprecated');
});
</script>
<style lang=""></style>
