<template>
	<div class="text-subtitle2">Lain-Lain</div>

	<input-select-array
		v-model="inputs.wilayah"
		url="wilayah-ugt"
		label="Wilayah PJGT"
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
</template>
<script setup>
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const inputs = defineModel();
</script>
<style></style>
