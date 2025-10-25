<template>
	<div class="text-subtitle2">Data Registrasi</div>
	<q-input
		dense
		hint="Kosongkan jika ingin diisi otomatis!"
		class="q-my-sm"
		outlined
		label="ID"
		v-model="inputs.id"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
		error-color="negative"
	/>

	<q-input
		dense
		:hint="
			isDate(inputs.tgl_daftar_m)
				? formatDateFull(inputs.tgl_daftar_m)
				: ''
		"
		class="q-my-sm"
		outlined
		label="Tanggal Daftar (M)*"
		v-model="inputs.tgl_daftar_m"
		type="date"
		@change="
			isDate(inputs.tgl_daftar_m)
				? (inputs.tgl_daftar_h = m2h(inputs.tgl_daftar_m))
				: (inputs.tgl_daftar_h = '')
		"
		:rules="[(val) => !!val || 'Harus diisi!']"
		error-color="negative"
	/>
	<q-input
		dense
		:hint="
			inputs.tgl_daftar_h?.length ? bacaHijri(inputs.tgl_daftar_h) : ''
		"
		class="q-my-sm"
		outlined
		label="Tanggal Daftar (H)*"
		v-model="inputs.tgl_daftar_h"
		:rules="[
			(val) => !!val || 'Harus diisi!',
			(val) => val?.length == 8 || '8 digit angka!',
		]"
		error-color="negative"
		mask="####-##-##"
	/>
</template>
<script setup>
import { m2h, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDateFull } from 'src/utils/format-date';
import { watch } from 'vue';

const inputs = defineModel();
watch(
	() => inputs.value.tgl_daftar_h,
	(newValue, _oldValue) => {
		if (newValue?.length) {
			inputs.value.tgl_daftar_h = newValue.replace(/-/g, '');
		}
	},
);
</script>
