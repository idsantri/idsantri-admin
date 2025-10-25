<template lang="">
	<div>
		<q-select
			:model-value="filter.th_ajaran_h"
			@update:model-value="(v) => (filter.th_ajaran_h = v.th_ajaran_h)"
			:options="lists['th_ajaran']"
			:loading="loadingArray['th_ajaran']"
			option-value="th_ajaran_h"
			option-label="th_ajaran_h"
			outlined
			dense
			class=""
			label="Tahun Ajaran"
			hide-bottom-space
		/>
		<q-select
			:model-value="filter.tingkat_id"
			@update:model-value="(v) => (filter.tingkat_id = v.tingkat_id)"
			:options="lists['tingkat']"
			:loading="loadingArray['tingkat']"
			option-value="tingkat_id"
			option-label="tingkat"
			outlined
			dense
			class="q-mt-sm"
			label="Tingkat"
		/>
		<q-select
			v-model="filter.kelas"
			:options="lists['kelas']"
			:loading="loadingArray['kelas']"
			outlined
			dense
			class="q-mt-sm"
			label="Kelas"
		/>
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import apiGet from 'src/api/api-get';
import { getListsCustom } from 'src/api/api-get-lists';
import kenaikanKelasStore from 'src/stores/kenaikan-kelas-store';
import listsMadrasahStore from 'src/stores/lists-madrasah-store';
import { onMounted, ref, toRef, watch } from 'vue';

const lists = ref([]);
const loadingArray = ref([]);

const { oldDataFilter: filter } = storeToRefs(kenaikanKelasStore());
const loading = ref(false);

const props = defineProps({
	reload: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(['onLoading']);
const reloadRef = toRef(props, 'reload');

onMounted(async () => {
	await loadTahun();
});

async function loadTahun() {
	const cekData = listsMadrasahStore().getThAjaran;
	if (cekData.length) {
		lists.value['th_ajaran'] = cekData;
	} else {
		const data = await getListsCustom({
			url: 'kelas/lists',
			key: 'th_ajaran',
			loadingArray,
		});
		listsMadrasahStore().setThAjaran(data);
		lists.value['th_ajaran'] = data;
	}
}

async function loadTingkat(th_ajaran_h) {
	const cekData = listsMadrasahStore().getTingkatByTahun(th_ajaran_h);
	if (cekData.length) {
		lists.value['tingkat'] = cekData;
		// console.log(cekData);
	} else {
		const data = await getListsCustom({
			url: 'kelas/lists',
			params: { th_ajaran_h: th_ajaran_h },
			key: 'tingkat',
			loadingArray,
			sort: 'asc',
		});
		listsMadrasahStore().addTingkatToTahun(data, th_ajaran_h);
		lists.value['tingkat'] = data;
	}
}

async function loadKelas(tingkat_id, th_ajaran_h) {
	const cekData = listsMadrasahStore().getKelasByTingkatAndTahun(
		tingkat_id,
		th_ajaran_h,
	);
	if (cekData.length) {
		lists.value['kelas'] = cekData;
	} else {
		const data = await getListsCustom({
			url: 'kelas/lists',
			params: { th_ajaran_h, tingkat_id },
			key: 'kelas',
			loadingArray,
			sort: 'asc',
		});

		listsMadrasahStore().addKelasToTingkatByTahun(
			data,
			tingkat_id,
			th_ajaran_h,
		);
		lists.value['kelas'] = data;
	}
}

// tahun ajaran
watch(
	() => filter.value.th_ajaran_h,
	async (newValue) => {
		if (newValue) {
			// console.log(newValue);
			filter.value.tingkat_id = '';
			filter.value.kelas = '';
			await loadTingkat(newValue);
			lists.value['kelas'] = null;
		}
	},
);

// tingkat pendidikan
watch(
	() => filter.value.tingkat_id,
	async (newValue) => {
		if (newValue) {
			filter.value.kelas = '';
			await loadKelas(newValue, filter.value.th_ajaran_h);
		}
	},
);

// reload
watch(reloadRef, async () => {
	lists.value = [];
	kenaikanKelasStore().resetOldFilter();
	listsMadrasahStore().$reset();
	await loadTahun();
});

// add to store
watch(
	filter,
	async (value) => {
		kenaikanKelasStore().addOldDataFilter(value);
		kenaikanKelasStore().resetMurid();
		if (value.th_ajaran_h && value.tingkat_id && value.kelas) {
			value.status = 'Aktif';
			value.aktif = true;
			emit('onLoading', true);
			const data = await apiGet({
				endPoint: 'kelas',
				params: value,
				loading,
			});
			kenaikanKelasStore().addMurid(data.murid);
			emit('onLoading', false);
		}
	},
	{ deep: true },
);
</script>
<style lang=""></style>
