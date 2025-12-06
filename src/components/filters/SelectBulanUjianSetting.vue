<template lang="">
	<q-select
		dense
		outlined
		label="Bulan (Ujian)"
		v-model="bulanUjian"
		:options="lists['bulan_ujian']"
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
import { getListsCustom } from 'src/api/api-get-lists';
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
const lists = ref([]);
const url = `${props.startUrl}/${params.th_ajaran_h}/${params.tingkat_id}/${params.kelas || '*'}`;

onMounted(async () => {
	if (params.tingkat_id) {
		const cekData = listsMadrasahStore().getBulanUjianSettingByTingkatId(params.tingkat_id);
		if (cekData.length) {
			lists.value['bulan_ujian'] = cekData;
		} else {
			const data = await getListsCustom({
				url: 'absensi/settings',
				params: { tingkat_id: params.tingkat_id },
				key: 'bulan_ujian',
				loading,
			});
			if (!data.length) {
				notifyWarning(
					'Jadwal ujian untuk jenjang ini belum diatur.<br>Silakan masuk ke menu pengaturan (kanan atas)!',
				);
				return;
			}
			listsMadrasahStore().addBulanUjianSetting(data);
			lists.value['bulan_ujian'] = data;
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
