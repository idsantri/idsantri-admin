<template lang="">
	<q-select
		dense
		outlined
		label="Bulan (Ujian)"
		v-model="bulanUjian"
		:options="listBU"
		option-value="bu"
		option-label="bulan_ujian"
		emit-value
		map-options
		:loading="loading"
		clearable=""
		behavior="menu"
	/>
</template>
<script setup>
import Absensi from 'src/models/Absensi';
import listsMadrasahStore from 'src/stores/lists-madrasah-store';
import { notifyWarning } from 'src/utils/notify';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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

const { params } = useRoute();
const router = useRouter();

const bulanUjian = ref(params.list_bulan_ujian);

const loading = ref(false);
const listBU = ref([]);
const url = `${props.startUrl}/${params.th_ajaran_h}/${params.tingkat_id}`;

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id) {
		const cekData = listsMadrasahStore().getBulanUjianListByTahunAndTingkatId(
			params.th_ajaran_h,
			params.tingkat_id,
		);
		if (cekData?.length) {
			listBU.value = cekData;
		} else {
			try {
				loading.value = true;
				const data = await Absensi.getListBulanUjian(params.absensi, {
					th_ajaran_h: params.th_ajaran_h,
					tingkat_id: params.tingkat_id,
				});

				if (!data.bulan_ujian?.length) {
					notifyWarning('Tidak ada laporan untuk filter yang dipilih!');
					return;
				}
				listsMadrasahStore().addBulanUjianList(data.bulan_ujian);
				listBU.value = data.bulan_ujian;
			} catch (error) {
				console.error('🚀 ~ error:', error);
			} finally {
				loading.value = false;
			}
		}
	}
});

watch(bulanUjian, (newValue, oldValue) => {
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
