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
import Kelas from 'src/models/Kelas';
import kenaikanKelasStore from 'src/stores/kenaikan-kelas-store';
import listsMadrasahStore from 'src/stores/lists-madrasah-store';
import { onMounted, ref, toRef, watch } from 'vue';

const lists = ref([]);
const loadingArray = ref([]);

const { oldDataFilter: filter } = storeToRefs(kenaikanKelasStore());

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

async function fetchTahun() {
	try {
		loadingArray.value['th_ajaran'] = true;
		const data = await Kelas.list();
		listsMadrasahStore().setThAjaran(data.th_ajaran);
		lists.value['th_ajaran'] = data.th_ajaran;
	} catch (error) {
		console.error('🚀 ~ loadTahun ~ error:', error);
	} finally {
		loadingArray.value['th_ajaran'] = false;
	}
}

async function loadTahun() {
	const cekData = listsMadrasahStore().getThAjaran;
	if (cekData.length) {
		lists.value['th_ajaran'] = cekData;
	} else {
		await fetchTahun();
	}
}

async function fetchTingkat(th_ajaran_h) {
	try {
		loadingArray.value['tingkat'] = true;
		const data = await Kelas.list({ th_ajaran_h });
		listsMadrasahStore().addTingkatToTahun(data.tingkat, th_ajaran_h);
		lists.value['tingkat'] = data.tingkat;
	} catch (error) {
		console.error('🚀 ~ loadTingkat ~ error:', error);
	} finally {
		loadingArray.value['tingkat'] = false;
	}
}

async function loadTingkat(th_ajaran_h) {
	const cekData = listsMadrasahStore().getTingkatByTahun(th_ajaran_h);
	if (cekData.length) {
		lists.value['tingkat'] = cekData;
	} else {
		await fetchTingkat(th_ajaran_h);
	}
}

async function fetchKelas(th_ajaran_h, tingkat_id) {
	try {
		loadingArray.value['kelas'] = true;
		const data = await Kelas.list({ th_ajaran_h, tingkat_id });
		listsMadrasahStore().addKelasToTingkatByTahun(data.kelas, tingkat_id, th_ajaran_h);
		lists.value['kelas'] = data.kelas;
	} catch (error) {
		console.error('🚀 ~ loadKelas ~ error:', error);
	} finally {
		loadingArray.value['kelas'] = false;
	}
}

async function loadKelas(th_ajaran_h, tingkat_id) {
	const cekData = listsMadrasahStore().getKelasByTingkatAndTahun(tingkat_id, th_ajaran_h);
	if (cekData.length) {
		lists.value['kelas'] = cekData;
	} else {
		await fetchKelas(th_ajaran_h, tingkat_id);
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
			await loadKelas(filter.value.th_ajaran_h, newValue);
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

async function getDataKelas(params = {}) {
	try {
		emit('onLoading', true);
		const data = await Kelas.getAll({ params, notifySuccess: false });
		return data;
	} catch (error) {
		console.error('🚀 ~ getDataKelas ~ error:', error);
		return null;
	} finally {
		emit('onLoading', false);
	}
}

// add to store
watch(
	filter,
	async (value) => {
		kenaikanKelasStore().addOldDataFilter(value);
		kenaikanKelasStore().resetMurid();
		if (value.th_ajaran_h && value.tingkat_id && value.kelas) {
			value.status = 'Aktif';
			value.aktif = true;
			const data = await getDataKelas(value);
			kenaikanKelasStore().addMurid(data.murid);
		}
	},
	{ deep: true },
);
</script>
<style lang=""></style>
