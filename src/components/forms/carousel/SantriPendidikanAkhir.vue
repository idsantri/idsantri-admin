<template>
	<div class="text-subtitle2">
		{{ props.title }}
	</div>
	<div class="text-italic">Sebelum masuk ke lembaga ini</div>
	<div class="text-overline q-mt-sm">Formal</div>

	<input-select-array
		v-model="pa_formal_tingkat"
		url="pendidikan-akhir-formal"
		label="Pendidikan Akhir Formal"
		class="q-mt-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>
	<input-select-array
		v-model="pa_formal_kelas"
		url="kelas"
		label="Kelas"
		class="q-mt-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>
	<q-input
		dense
		hint="Nama sekolah dan alamat"
		class="q-mt-sm"
		outlined
		label="Sekolah"
		v-model="pa_formal_alamat"
		autogrow
		clearable
	/>

	<div class="text-overline q-mt-sm">Diniyah</div>
	<input-select-array
		v-model="pa_diniyah_tingkat"
		url="pendidikan-akhir-diniyah"
		label="Pendidikan Akhir Diniyah"
		class="q-mt-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>

	<input-select-array
		v-model="pa_diniyah_kelas"
		url="kelas"
		label="Kelas"
		class="q-mt-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>

	<q-input
		dense
		hint="Nama sekolah dan alamat"
		class="q-mt-sm"
		outlined
		label="Sekolah"
		v-model="pa_diniyah_alamat"
		clearable
		autogrow
	/>
</template>
<script setup>
import { onMounted, toRefs } from 'vue';
import santriState from 'src/stores/santri-store';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	title: { type: String, default: '' },
});
const { santri } = santriState();
const {
	pa_formal_tingkat,
	pa_formal_kelas,
	pa_formal_alamat,
	pa_diniyah_tingkat,
	pa_diniyah_kelas,
	pa_diniyah_alamat,
} = toRefs(santri);

onMounted(async () => {});
</script>
<style></style>
