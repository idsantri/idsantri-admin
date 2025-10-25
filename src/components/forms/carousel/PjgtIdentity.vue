<template>
	<div class="text-subtitle2">Identitas Diri</div>
	<q-input
		dense
		class="q-my-sm"
		outlined
		label="ID"
		v-model="inputs.id"
		disable=""
		hint="Diisi otomatis oleh sistem"
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
	<input-select-array
		v-model="inputs.jenis_lembaga"
		url="jenis-lembaga-pendidikan"
		label="Jenis Lembaga"
		hint=""
		class="q-my-sm"
	/>
	<q-input
		dense
		hint=""
		class="q-my-sm"
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

defineProps({ isNew: { type: Boolean } });

const inputs = defineModel();
</script>
