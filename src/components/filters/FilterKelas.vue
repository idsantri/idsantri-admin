<template lang="">
	<q-card>
		<q-card-section class="q-px-sm q-py-sm bg-green-11">
			<q-toolbar class="no-padding" style="min-height: 0">
				<q-toolbar-title class="text-subtitle1">
					<div class="text-subtitle1">
						<span v-html="title"></span>
					</div>
				</q-toolbar-title>
				<q-btn icon="sync" dense flat class="q-mr-xs" @click="reload" />
				<slot></slot>
			</q-toolbar>
		</q-card-section>
		<q-card-section class="no-padding flex flex-center" :key="keyReload">
			<div class="row" style="max-width: 1000px; width: 100%">
				<select-tahun-ajaran
					class="col-12 col-md-3 q-pa-sm"
					:start-url="startUrl"
				/>
				<select-tingkat
					v-if="showTingkat"
					class="col-12 col-md-3 q-pa-sm"
					:start-url="startUrl"
				/>
				<select-kelas
					v-if="showKelas"
					class="col-12 col-md-3 q-pa-sm"
					:start-url="startUrl"
				/>
				<select-ujian-ke
					v-if="showUjianKe"
					class="col-12 col-md-3 q-pa-sm"
					:start-url="startUrl"
					:arr-ujian="[1, 2, 3]"
				/>
				<select-bulan-ujian-setting
					v-if="showSetBulanUjian"
					class="col-12 col-md-3 q-pa-sm"
					:start-url="startUrl"
				/>
				<select-bulan-ujian-list
					v-if="showListBulanUjian"
					class="col-12 col-md-3 q-pa-sm"
					:start-url="startUrl"
				/>
			</div>
			<q-space />
			<div class="q-pr-sm">
				<slot name="more" />
			</div>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import listsMadrasahStore from 'src/stores/lists-madrasah-store';
import SelectTahunAjaran from './SelectTahunAjaran.vue';
import SelectTingkat from './SelectTingkat.vue';
import SelectKelas from './SelectKelas.vue';
import SelectUjianKe from './SelectUjianKe.vue';
import SelectBulanUjianSetting from './SelectBulanUjianSetting.vue';
import SelectBulanUjianList from './SelectBulanUjianList.vue';

const emit = defineEmits(['dataFilter']);
defineProps({
	startUrl: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		default: 'Filter Kelas',
	},
	showTingkat: {
		type: Boolean,
		default: true,
	},
	showKelas: {
		type: Boolean,
		default: true,
	},
	showUjianKe: {
		type: Boolean,
		default: false,
	},
	showSetBulanUjian: {
		type: Boolean,
		default: false,
	},
	showListBulanUjian: {
		type: Boolean,
		default: false,
	},
});

const { params } = useRoute();
const keyReload = ref(0);

function reload() {
	listsMadrasahStore().$reset();
	keyReload.value++;
}

onMounted(() => {
	emit('dataFilter', displayFilter());
});

function displayFilter() {
	let text = '<em>Tentukan Filter!</em>';
	if (params.th_ajaran_h) {
		text =
			'➡️ <em class="text-weight-light">Tahun Ajaran: </em><strong>' +
			params.th_ajaran_h +
			'</strong>';
	}

	if (params.tingkat_id) {
		const allTingkat = listsMadrasahStore().getAllTingkat();
		if (allTingkat.length) {
			const tingkat = allTingkat.find(
				(t) => t.tingkat_id == params.tingkat_id,
			);
			text +=
				' ➡️ <em class="text-weight-light">Tingkat: </em><strong>' +
				tingkat.tingkat +
				'</strong>';
		}
	}

	if (params.kelas) {
		text +=
			' ➡️ <em class="text-weight-light">Kelas: </em><strong>' +
			params.kelas +
			'</strong>';
	}

	if (params.ujian_ke) {
		const u = listsMadrasahStore().getUjian.find(
			(u) => u.value == params.ujian_ke,
		);
		text +=
			' ➡️ <em class="text-weight-light">Ujian Ke: </em><strong>' +
			u.label +
			'</strong>';
	}

	if (params.set_bulan_ujian) {
		const tk = listsMadrasahStore().getBulanUjianSettingByTingkatId(
			params.tingkat_id,
		);
		const bu = tk.find((b) => b.bu == params.set_bulan_ujian);
		text +=
			' ➡️ <em class="text-weight-light">Bulan (Ujian): </em><strong>' +
			bu.bulan_ujian +
			'</strong>';
	}

	if (params.list_bulan_ujian) {
		const tk = listsMadrasahStore().getBulanUjianListByTahunAndTingkatId(
			params.th_ajaran_h,
			params.tingkat_id,
		);
		const bu = tk.find((b) => b.bu == params.list_bulan_ujian);
		text +=
			' ➡️ <em class="text-weight-light">Bulan (Ujian): </em><strong>' +
			bu.bulan_ujian +
			'</strong>';
	}

	return text;
}
</script>
<style lang=""></style>
