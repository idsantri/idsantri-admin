<template lang="">
	<q-select
		dense
		outlined
		label="Bulan (Ujian)"
		v-model="bulanUjian"
		:options="listSetting"
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
import AbsensiSetting from 'src/models/AbsensiSetting';
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

const bulanUjian = ref(params.bulan_ujian);

const loading = ref(false);
const listSetting = ref([]);
const url = `${props.startUrl}/${params.th_ajaran_h}/${params.tingkat_id}/${params.kelas || '*'}`;

onMounted(async () => {
	if (params.tingkat_id) {
		const cekData = listsMadrasahStore().getBulanUjianSettingByTingkatId(params.tingkat_id);
		if (cekData?.length) {
			listSetting.value = cekData;
		} else {
			try {
				loading.value = true;
				const data = await AbsensiSetting.getAll({
					params: { tingkat_id: params.tingkat_id },
					notifySuccess: false,
				});
				if (!data?.bulan_ujian?.length) {
					notifyWarning(
						'Jadwal ujian untuk jenjang ini belum diatur.<br>Silakan masuk ke menu pengaturan (kanan atas)!',
					);
					return;
				}
				listsMadrasahStore().addBulanUjianSetting(data.bulan_ujian);
				listSetting.value = data.bulan_ujian;
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
