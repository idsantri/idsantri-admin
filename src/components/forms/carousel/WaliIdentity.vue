<template>
	<div class="text-subtitle2">Identitas Diri</div>
	<q-input
		hint="Diisi otomatis oleh sistem"
		dense
		class="q-my-sm"
		outlined
		label="ID"
		:model-value="inputs.id"
		readonly=""
		disable=""
	/>
	<q-input
		dense
		hint=""
		class="q-my-sm"
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
		class="q-my-sm"
		outlined
		label="Nomor Induk Kependudukan"
		v-model="inputs.nik"
		:rules="[
			(val) =>
				!val || (val?.length == 16 && !isNaN(val)) || '16 digit angka!',
		]"
		error-color="negative"
	/>
	<input-select-kota-lahir v-model="inputs.tmp_lahir" class="q-my-sm" />

	<q-input
		dense
		:hint="
			isDate(tgl_lahir)
				? formatDateFull(tgl_lahir) + ' | ' + bacaHijri(m2h(tgl_lahir))
				: ''
		"
		class="q-my-sm"
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
		class="q-my-sm"
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
