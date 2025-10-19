<template>
	<div class="text-subtitle2">Data Ayah</div>
	<q-input
		dense
		hint=""
		class="q-my-sm"
		outlined
		label="Nama*"
		v-model="inputs.ayah"
		:rules="[
			(val) => !!val || 'Harus diisi!',
			(val) => val?.length >= 3 || 'Setidaknya 3 huruf!',
		]"
		error-color="negative"
		autocapitalize="words"
	/>

	<q-input
		dense
		hint=""
		class="q-my-sm"
		outlined
		label="Nomor Induk Kependudukan"
		v-model="inputs.a_nik"
		:rules="[
			(val) =>
				!val || (val?.length == 16 && !isNaN(val)) || '16 digit angka!',
		]"
		error-color="negative"
	/>
	<input-select-kota-lahir v-model="inputs.a_tmp_lahir" class="q-my-sm" />

	<q-input
		dense
		:hint="
			isDate(inputs.a_tgl_lahir)
				? formatDateFull(inputs.a_tgl_lahir) +
					' | ' +
					bacaHijri(m2h(inputs.a_tgl_lahir))
				: ''
		"
		class="q-my-sm"
		outlined
		label="Tanggal Lahir"
		v-model="inputs.a_tgl_lahir"
		type="date"
	/>
	<q-card bordered flat class="q-px-sm q-my-sm">
		<q-toggle
			v-model="inputs.a_hidup"
			color="green"
			:true-value="1"
			:false-value="0"
			label="Hidup"
		/>
	</q-card>
	<input-select-array
		v-model="inputs.a_pa_formal_tingkat"
		url="pendidikan-akhir-diniyah"
		label="Pendidikan Akhir Formal"
		class="q-my-sm"
		hint=""
		use-input=""
		new-value-mode="add"
	/>

	<input-select-array
		v-model="inputs.a_pa_diniyah_tingkat"
		url="pendidikan-akhir-diniyah"
		label="Pendidikan Akhir Diniyah"
		class="q-my-sm"
		use-input=""
		new-value-mode="add"
		hint=""
	/>

	<input-select-array
		v-model="inputs.a_pekerjaan"
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

const inputs = defineModel();
</script>
