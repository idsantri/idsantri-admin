<template lang="">
	<q-select
		dense
		outlined
		label="Tahun Ajaran *"
		emit-value
		map-options
		:options="lists['th_ajaran']"
		option-value="th_ajaran_h"
		option-label="th_ajaran_h"
		:loading="loading['th_ajaran']"
		clearable=""
		behavior="menu"
	/>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getListsCustom } from 'src/api/api-get-lists';
import listsIuranStore from 'src/stores/lists-iuran-store';

const lists = ref([]);
const loading = ref([]);

onMounted(async () => {
	const thStore = listsIuranStore().getThAjaran();
	if (thStore.length > 0) {
		lists.value['th_ajaran'] = thStore;
	} else {
		const data = await getListsCustom({
			loadingArray: loading,
			key: 'th_ajaran',
			url: 'iuran-old/lists',
			sort: false,
		});
		const result = data.sort(
			(a, b) => parseFloat(b.th_ajaran_h) - parseFloat(a.th_ajaran_h),
		);
		listsIuranStore().setThAjaran(result);
		lists.value['th_ajaran'] = result;
	}
});
</script>
<style lang=""></style>
