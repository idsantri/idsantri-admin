<template lang="">
	<q-card class="" flat bordered>
		<q-card-section class="q-pa-sm bg-green-7">
			<q-toolbar class="no-padding text-green-11" style="min-height: 0">
				<q-toolbar-title class="text-subtitle1"> Data Santri </q-toolbar-title>
				<q-btn icon="sync" dense flat class="q-mr-xs" @click="null" disable />
			</q-toolbar>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<div class="row">
				<InputSelectTingkatPendidikan
					v-model="input.tingkat_id"
					label="Tingkat Pendidikan"
					class="col no-padding q-mr-md"
					:hint="null"
				/>
				<input-select-array
					v-model="input.kelas"
					url="kelas"
					label="Kelas"
					class="col no-padding"
					:disable="input.tingkat_id ? false : true"
				/>
			</div>
			<input-select-array v-model="input.domisili" url="domisili" label="Domisili" class="q-mt-sm no-padding" />
		</q-card-section>
		<q-separator />
		<q-card-section class="q-pa-sm">
			<TableLeft :on-loading="loading" />
		</q-card-section>
		<q-separator />
		<q-card-actions class="bg-green-1">
			<div class="text-caption text-italic">
				Total: {{ santri?.length || 0 }} santri<br />
				Hanya menampilkan santri yang statusnya &ldquo;Aktif&rdquo; dan belum masuk ke tabel mutasi
			</div>
			<q-space />
			<div>
				<!-- <q-btn
					disabled
					label="Reset"
					no-caps
					icon="history"
					color="green-10"
					class="text-green-11"
					@click="onReset"
					:disable="!muridFalse.length > 0"
				/>-->
			</div>
		</q-card-actions>
	</q-card>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import mutasiStore from 'src/stores/mutasi-store';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';
import TableLeft from './LeftTable.vue';
import Mutasi from 'src/models/Mutasi';

const input = ref({ tingkat_id: '', kelas: '', domisili: '' });
const mutasi = mutasiStore();
const loading = ref(false);
const santri = computed(() => mutasi.getProsesFalse());

// tingkat_id
watch(
	() => input.value.tingkat_id,
	(val) => {
		if (val) {
			input.value.kelas = '';
			input.value.domisili = '';
		}
	},
);

// kelas
watch(
	() => input.value.kelas,
	async (val) => {
		if (val) {
			input.value.domisili = '';
		}
	},
);

// domisili
watch(
	() => input.value.domisili,
	async (val) => {
		if (val) {
			input.value.tingkat_id = '';
			input.value.kelas = '';
		}
	},
);

// input all
watch(
	input,
	async (val) => {
		mutasi.resetSantri();
		if (val.tingkat_id && val.kelas) {
			await getData({ tingkat_id: val.tingkat_id, kelas: val.kelas });
		} else if (val.domisili) {
			await getData({ domisili: val.domisili });
		}
	},
	{ deep: true },
);

async function getData(params) {
	try {
		loading.value = true;
		const data = await Mutasi.getNotMutate(params);
		mutasi.addSantri(data.santri);
	} catch (error) {
		console.error('Error fetching data:', error);
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
