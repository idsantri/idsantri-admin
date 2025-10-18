<template>
	<div class="text-subtitle2">Data Registrasi</div>
	<q-input
		hint="Diisi otomatis oleh sistem"
		dense
		class="q-mt-sm"
		outlined
		label="ID"
		:model-value="inputs.id"
		readonly=""
		disable=""
	/>
	<q-input
		dense
		hint=""
		class="q-mt-sm"
		outlined
		label="Jumlah Anak"
		v-model="inputs.jumlah_anak"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka']"
		error-color="negative"
	/>
</template>
<script setup>
const inputs = defineModel();
</script>
