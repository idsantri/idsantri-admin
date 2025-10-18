<template>
	<div class="text-subtitle2">Identitas Diri</div>
	<q-input
		dense
		hint=""
		class="q-mt-sm"
		outlined
		label="Nama*"
		v-model="inputs.nama"
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
		class="q-mt-sm"
		outlined
		label="Nomor Induk Siswa Nasional"
		v-model="inputs.nisn"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
		error-color="negative"
	/>
	<q-input
		dense
		hint=""
		class="q-mt-sm"
		outlined
		label="Nomor Kartu Keluarga"
		v-model="inputs.nkk"
		:rules="[
			(val) =>
				!val || (val?.length == 16 && !isNaN(val)) || '16 digit angka!',
		]"
		error-color="negative"
	/>
	<q-input
		dense
		hint=""
		class="q-mt-sm"
		outlined
		label="Nomor Induk Kependudukan"
		v-model="inputs.nik"
		:rules="[
			(val) =>
				!val || (val?.length == 16 && !isNaN(val)) || '16 digit angka!',
		]"
		error-color="negative"
	/>
	<input-select-kota-lahir v-model="inputs.tmp_lahir" />

	<q-input
		dense
		:hint="
			isDate(inputs.tgl_lahir)
				? formatDateFull(inputs.tgl_lahir) +
					' | ' +
					bacaHijri(m2h(inputs.tgl_lahir))
				: ''
		"
		class="q-mt-sm"
		outlined
		label="Tanggal Lahir"
		v-model="inputs.tgl_lahir"
		type="date"
	/>

	<q-select
		dense
		:hint="
			inputs.sex == 'L'
				? 'Laki-Laki'
				: inputs.sex == 'P'
					? 'Perempuan'
					: ''
		"
		class="q-mt-sm"
		outlined
		label="Jenis Kelamin"
		v-model="inputs.sex"
		:options="['L', 'P']"
		emit-value
		map-options
		error-color="negative"
		behavior="menu"
	/>
</template>
<script setup>
import { m2h, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDateFull } from 'src/utils/format-date';
import InputSelectKotaLahir from 'src/components/inputs/InputSelectKotaLahir.vue';

const inputs = defineModel();
</script>
