<template>
	<div class="text-subtitle2">Riwayat Pendidikan</div>
	<div class="text-italic">Sebelum masuk ke lembaga ini</div>
	<div class="text-overline q-my-sm">Formal</div>

	<input-select-array
		v-model="inputs.pa_formal_tingkat"
		url="pendidikan-akhir-formal"
		label="Pendidikan Akhir Formal"
		class="q-my-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>
	<input-select-array
		v-model="inputs.pa_formal_kelas"
		url="kelas"
		label="Kelas"
		class="q-my-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>
	<q-input
		dense
		hint="Nama sekolah dan alamat"
		class="q-my-sm"
		outlined
		label="Sekolah"
		v-model="inputs.pa_formal_alamat"
		autogrow
		clearable
	/>

	<div class="text-overline q-my-sm">Diniyah</div>
	<input-select-array
		v-model="inputs.pa_diniyah_tingkat"
		url="pendidikan-akhir-diniyah"
		label="Pendidikan Akhir Diniyah"
		class="q-my-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>

	<input-select-array
		v-model="inputs.pa_diniyah_kelas"
		url="kelas"
		label="Kelas"
		class="q-my-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>

	<q-input
		dense
		hint="Nama sekolah dan alamat"
		class="q-my-sm"
		outlined
		label="Sekolah"
		v-model="inputs.pa_diniyah_alamat"
		clearable
		autogrow
	/>
</template>
<script setup>
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const inputs = defineModel();
</script>
<style></style>
