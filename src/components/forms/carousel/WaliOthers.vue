<template>
	<div class="text-subtitle2">
		{{ props.title }}
	</div>
	<InputSelectArray
		v-model="pa_formal_tingkat"
		url="pendidikan-akhir-formal"
		label="Pendidikan Akhir Formal"
		class="q-mt-sm"
		hint=""
	/>

	<InputSelectArray
		v-model="pa_diniyah_tingkat"
		url="pendidikan-akhir-diniyah"
		label="Pendidikan Akhir Diniyah"
		class="q-mt-sm"
		hint=""
	/>
	<InputSelectArray
		v-model="pekerjaan"
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
		v-model="telepon"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
		error-color="negative"
	/>
	<q-input
		dense
		hint=""
		class="q-mt-sm"
		outlined
		label="Email"
		v-model="email"
	/>
	<q-input
		dense
		hint="Penghasilan bulanan"
		class="q-mt-sm"
		outlined
		label="Penghasilan"
		v-model="penghasilan"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
		error-color="negative"
	/>
</template>
<script setup>
import { onMounted, toRefs } from 'vue';
import waliState from 'src/stores/wali-store';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	title: { type: String, default: '' },
});
const { wali } = waliState();
const {
	pa_formal_tingkat,
	pa_diniyah_tingkat,
	pekerjaan,
	telepon,
	email,
	penghasilan,
} = toRefs(wali);

onMounted(async () => {});
</script>
<style></style>
