<template lang="">
	<q-select
		dense
		outlined
		label="Tahun Ajaran"
		v-model="th_ajaran_h"
		:options="lists['th_ajaran']"
		option-value="th_ajaran_h"
		option-label="th_ajaran_h"
		emit-value
		map-options
		:loading="loading['th_ajaran']"
		behavior="menu"
	/>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getListsCustom } from 'src/api/api-get-lists';
import listsMadrasahStore from 'stores/lists-madrasah-store';

const props = defineProps({
	startUrl: {
		type: String,
		required: true,
	},
	routerPush: {
		type: Boolean,
		default: true,
	},
});

const lists = ref([]);
const { params } = useRoute();
const th_ajaran_h = ref(params.th_ajaran_h);
const loading = ref([]);
const router = useRouter();

onMounted(async () => {
	const cekData = listsMadrasahStore().getThAjaran;
	if (cekData.length) {
		lists.value['th_ajaran'] = cekData;
	} else {
		const data = await getListsCustom({
			url: 'kelas/lists',
			key: 'th_ajaran',
			loadingArray: loading,
		});
		listsMadrasahStore().setThAjaran(data);
		lists.value['th_ajaran'] = data;
	}
});

watch(th_ajaran_h, (newValue, oldValue) => {
	if (!props.routerPush) {
		return;
	} else {
		if (!newValue) {
			router.push(`${props.startUrl}`);
			return;
		}
		if (newValue != oldValue) {
			router.push(`${props.startUrl}/${newValue}`);
			return;
		}
	}
});
</script>
<style lang=""></style>
