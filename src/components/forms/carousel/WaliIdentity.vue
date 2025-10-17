<template>
	<div class="text-subtitle2">
		{{ props.title }}
	</div>
	<q-input
		hint="Diisi otomatis oleh sistem"
		dense
		class="q-mt-sm"
		outlined
		label="ID"
		:model-value="id"
		readonly=""
		disable=""
	/>
	<q-input
		dense
		hint=""
		class="q-mt-sm"
		outlined
		label="Nama*"
		v-model="nama"
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
		label="Nomor Induk Kependudukan"
		v-model="nik"
		:rules="[
			(val) =>
				!val || (val?.length == 16 && !isNaN(val)) || '16 digit angka!',
		]"
		error-color="negative"
	/>
	<input-select-kota-lahir
		@emit-input="(val) => (wali.tmp_lahir = val.tmp_lahir)"
		:data="wali"
	/>

	<q-input
		dense
		:hint="
			isDate(tgl_lahir)
				? formatDateFull(tgl_lahir) + ' | ' + bacaHijri(m2h(tgl_lahir))
				: ''
		"
		class="q-mt-sm"
		outlined
		label="Tanggal Lahir"
		v-model="tgl_lahir"
		type="date"
	/>

	<q-select
		dense
		:hint="sex == 'L' ? 'Laki-Laki' : sex == 'P' ? 'Perempuan' : ''"
		class="q-mt-sm"
		outlined
		label="Jenis Kelamin"
		v-model="sex"
		:options="['L', 'P']"
		emit-value
		map-options
		error-color="negative"
		behavior="menu"
	/>
</template>
<script setup>
import { toRefs } from 'vue';
import waliState from 'src/stores/wali-store';
import { m2h, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDateFull } from 'src/utils/format-date';
import InputSelectKotaLahir from 'src/components/inputs/InputSelectKotaLahir.vue';

const props = defineProps({
	title: { type: String, default: '' },
});

const { wali } = waliState();
const { id, nama, tgl_lahir, nik, sex } = toRefs(wali);
</script>
