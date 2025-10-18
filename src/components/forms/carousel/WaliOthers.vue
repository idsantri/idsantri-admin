<template>
	<div class="text-subtitle2">Lain-Lain</div>
	<InputSelectArray
		v-model="inputs.pa_formal_tingkat"
		url="pendidikan-akhir-formal"
		label="Pendidikan Akhir Formal"
		class="q-mt-sm"
		hint=""
	/>

	<InputSelectArray
		v-model="inputs.pa_diniyah_tingkat"
		url="pendidikan-akhir-diniyah"
		label="Pendidikan Akhir Diniyah"
		class="q-mt-sm"
		hint=""
	/>
	<InputSelectArray
		v-model="inputs.pekerjaan"
		url="pekerjaan"
		label="Pekerjaan"
		class="q-mt-sm"
		hint=""
	/>
	<q-input
		dense
		hint="08123456789"
		class="q-mt-sm"
		outlined
		label="Telepon"
		v-model="inputs.telepon"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
		error-color="negative"
	/>
	<q-input
		dense
		hint=""
		class="q-mt-sm"
		outlined
		label="Email"
		v-model="inputs.email"
	/>
	<q-input
		dense
		hint="Penghasilan bulanan"
		class="q-mt-sm"
		outlined
		label="Penghasilan"
		v-model="inputs.penghasilan"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
		error-color="negative"
	/>
</template>
<script setup>
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const inputs = defineModel();
</script>
<style></style>
