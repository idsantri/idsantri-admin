<template lang="">
	<q-select
		dense
		outlined
		label="Kelas"
		v-model="kelas"
		:options="lists['kelas']"
		emit-value
		map-options
		:loading="loading['kelas']"
		clearable=""
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
const emit = defineEmits(['onSelect']);

const lists = ref([]);
const { params } = useRoute();
const kelas = ref(params.kelas);
const loading = ref([]);
const router = useRouter();
const url = `${props.startUrl}/${params.th_ajaran_h}/${params.tingkat_id}`;

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id) {
		const cekData = listsMadrasahStore().getKelasByTingkatAndTahun(
			params.tingkat_id,
			params.th_ajaran_h,
		);
		if (cekData.length) {
			lists.value['kelas'] = cekData;
		} else {
			const data = await getListsCustom({
				url: 'kelas/lists',
				params: {
					th_ajaran_h: params.th_ajaran_h,
					tingkat_id: params.tingkat_id,
				},
				key: 'kelas',
				loadingArray: loading,
				sort: 'asc',
			});

			listsMadrasahStore().addKelasToTingkatByTahun(
				data,
				params.tingkat_id,
				params.th_ajaran_h,
			);
			lists.value['kelas'] = data;
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
			if (params.set_bulan_ujian) {
				endUrl = '/' + params.set_bulan_ujian;
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
