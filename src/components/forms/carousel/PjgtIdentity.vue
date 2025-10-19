<template>
	<div class="text-subtitle2">Identitas Diri</div>
	<q-input
		dense
		:hint="isNew ? 'Kosongkan jika ingin diisi otomatis!' : ''"
		class="q-mt-sm"
		outlined
		label="ID"
		v-model="inputs.id"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
		error-color="negative"
	/>
	<q-input
		dense
		hint=""
		class="q-mt-sm"
		outlined
		label="Nama*"
		v-model="inputs.nama"
		:rules="[
			(val) => !!val || 'Harus diisi!',
			(val) => val?.length >= 5 || 'Setidaknya 5 huruf!',
		]"
		error-color="negative"
		autocapitalize="words"
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
	<input-select-array
		v-model="inputs.jenis_lembaga"
		url="jenis-lembaga-pendidikan"
		label="Jenis Lembaga"
		hint=""
		class="q-mt-sm"
	/>
	<q-input
		dense
		hint=""
		class="q-mt-sm"
		outlined
		label="Nama Lembaga"
		v-model="inputs.nama_lembaga"
		:rules="[(val) => !!val || 'Harus diisi!']"
		error-color="negative"
		autocapitalize="words"
	/>
</template>
<script setup>
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
const inputs = defineModel();
</script>
