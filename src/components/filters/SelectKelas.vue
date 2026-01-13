<template lang="">
	<q-select
		dense
		outlined
		label="Kelas"
		v-model="kelas"
		:options="listKelas"
		emit-value
		map-options
		:loading="loading"
		clearable=""
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
const emit = defineEmits(['onSelect']);

const listKelas = ref([]);
const { params } = useRoute();
const kelas = ref(params.kelas);
const loading = ref(false);
const router = useRouter();
const url = `${props.startUrl}/${params.th_ajaran_h}/${params.tingkat_id}`;

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id) {
		const cekData = listsMadrasahStore().getKelasByTingkatAndTahun(params.tingkat_id, params.th_ajaran_h);
		if (cekData?.length) {
			listKelas.value = cekData;
		} else {
			try {
				loading.value = true;
				const data = await Kelas.list({
					th_ajaran_h: params.th_ajaran_h,
					tingkat_id: params.tingkat_id,
				});
				listsMadrasahStore().addKelasToTingkatByTahun(data.kelas, params.tingkat_id, params.th_ajaran_h);
				listKelas.value = data.kelas;
			} catch (error) {
				console.error('🚀 ~ error:', error);
			} finally {
				loading.value = false;
			}
		}
	}
});

watch(kelas, (newValue, oldValue) => {
	if (!props.routerPush) {
		return;
	} else {
		if (!newValue) {
			router.push(url);
			return;
		}
		if (newValue != oldValue) {
			let endUrl = '';
			if (params.bulan_ujian) {
				endUrl = '/' + params.bulan_ujian;
			} else if (params.ujian_ke) {
				endUrl = '/' + params.ujian_ke;
			}

			router.push(`${url}/${newValue}${endUrl}`);
			emit('onSelect', newValue);
			return;
		}
	}
});
</script>
<style lang=""></style>
