<template lang="">
	<q-select
		dense
		outlined
		label="Tingkat"
		v-model="tingkat_id"
		:options="listTingkat"
		option-value="tingkat_id"
		option-label="tingkat"
		emit-value
		map-options
		:loading="loading"
		behavior="menu"
		clearable
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

const listTingkat = ref([]);
const loading = ref(false);
const router = useRouter();
const { params } = useRoute();
const tingkat_id = ref(params.tingkat_id);
const url = `${props.startUrl}/${params.th_ajaran_h}`;

onMounted(async () => {
	if (params.th_ajaran_h) {
		const cekData = listsMadrasahStore().getTingkatByTahun(params.th_ajaran_h);
		if (cekData?.length) {
			listTingkat.value = cekData;
		} else {
			try {
				loading.value = true;
				const data = await Kelas.list({ th_ajaran_h: params.th_ajaran_h });
				listsMadrasahStore().addTingkatToTahun(data.tingkat, params.th_ajaran_h);
				listTingkat.value = data.tingkat;
			} catch (error) {
				console.error('🚀 ~ error:', error);
			} finally {
				loading.value = false;
			}
		}
	}
});

watch(tingkat_id, (newValue, oldValue) => {
	if (!props.routerPush) {
		return;
	} else {
		if (!newValue) {
			router.push(url);
			return;
		}
		if (newValue != oldValue) {
			router.push(`${url}/${newValue}`);
			return;
		}
	}
});
</script>
<style lang=""></style>
