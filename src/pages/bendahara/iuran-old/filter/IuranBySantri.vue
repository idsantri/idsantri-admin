<template lang="">
	<q-page class="q-pa-sm">
		<FilterSantri
			start-url="/bendahara/iuran-old/q/santri"
			@data-filter="(val) => (dataFilter = val)"
			:active-only="false"
		>
			<DropDownMenu />
		</FilterSantri>

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
import FilterSantri from 'src/components/filters/FilterSantri.vue';
import DropDownMenu from './DropDownMenu.vue';
import IuranTable from './IuranTable.vue';
import { notifyWarning } from 'src/utils/notify';

const iuran = ref([{}]);
const loading = ref(false);
const dataFilter = ref({});
const route = useRoute();
const params = {
	id: route.params.id,
};

onMounted(async () => {
	if (params.id) {
		const data = await apiGet({
			endPoint: 'iuran-old',
			loading,
			params: { santri_id: params.id },
		});
		iuran.value = data.iuran;
	}
	notifyWarning('PERHATIAN!<br/>Fitur ini sudah deprecated');
});
</script>
<style lang=""></style>
