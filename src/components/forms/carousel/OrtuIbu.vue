<template>
	<div class="text-subtitle2">Data Ibu</div>
	<q-input
		dense
		hint=""
		class="q-my-sm"
		outlined
		label="Nama*"
		v-model="inputs.ibu"
		:rules="[(val) => !!val || 'Harus diisi!', (val) => val?.length >= 3 || 'Setidaknya 3 huruf!']"
		error-color="negative"
		autocapitalize="words"
	/>

	<q-input
		dense
		hint=""
		class="q-my-sm"
		outlined
		label="Nomor Induk Kependudukan"
		v-model="inputs.i_nik"
		:rules="[(val) => !val || (val?.length == 16 && !isNaN(val)) || '16 digit angka!']"
		error-color="negative"
	/>
	<input-select-kota-lahir v-model="inputs.i_tmp_lahir" class="q-my-sm" />

	<q-input
		dense
		:hint="
			isDate(inputs.i_tgl_lahir)
				? formatDateFull(inputs.i_tgl_lahir) + ' | ' + bacaHijri(m2h(inputs.i_tgl_lahir))
				: ''
		"
		class="q-my-sm"
		outlined
		label="Tanggal Lahir"
		v-model="inputs.i_tgl_lahir"
		type="date"
	/>
	<input-toggle v-model="inputs.i_hidup" label="Hidup" hint />
	<input-select-array
		v-model="inputs.i_pa_formal_tingkat"
		url="pendidikan-akhir-formal"
		label="Pendidikan Akhir Formal"
		class="q-my-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>

	<input-select-array
		v-model="inputs.i_pa_diniyah_tingkat"
		url="pendidikan-akhir-diniyah"
		label="Pendidikan Akhir Diniyah"
		class="q-my-sm"
		use-input=""
		new-value-mode="add"
		hint=""
	/>

	<input-select-array
		v-model="inputs.i_pekerjaan"
		url="pekerjaan"
		label="Pekerjaan"
		class="q-my-sm"
		use-input=""
		new-value-mode="add"
		hint=""
	/>
</template>
<script setup>
import { m2h, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDateFull } from 'src/utils/format-date';
import InputSelectKotaLahir from 'src/components/inputs/InputSelectKotaLahir.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import InputToggle from 'src/components/inputs/InputToggle.vue';

const inputs = defineModel();
</script>
