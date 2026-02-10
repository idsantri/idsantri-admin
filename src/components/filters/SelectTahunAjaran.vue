<template lang="">
	<q-select
		dense
		outlined
		label="Tahun Ajaran"
		v-model="th_ajaran_h"
		:options="listThAjaran"
		option-value="th_ajaran_h"
		option-label="th_ajaran_h"
		emit-value
		map-options
		:loading="loading"
		behavior="menu"
	/>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import listsMadrasahStore from 'stores/lists-madrasah-store';
import Kelas from 'src/models/Kelas';

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

const listThAjaran = ref([]);
const { params } = useRoute();
const th_ajaran_h = ref(params.th_ajaran_h);
const loading = ref(false);
const router = useRouter();

onMounted(async () => {
	const cekData = listsMadrasahStore().getThAjaran;
	if (cekData?.length) {
		listThAjaran.value = cekData;
	} else {
		try {
			loading.value = true;
			const data = await Kelas.list();
			listsMadrasahStore().setThAjaran(data.th_ajaran);
			listThAjaran.value = data.th_ajaran;
		} catch (error) {
			console.error('🚀 ~ error:', error);
		} finally {
			loading.value = false;
		}
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
