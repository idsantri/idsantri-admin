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
		label="Jumlah Anak"
		v-model="jumlah_anak"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka']"
		error-color="negative"
	/>
</template>
<script setup>
import ortuState from 'src/stores/ortu-store.js';
import { toRefs } from 'vue';
const props = defineProps({
	title: { type: String, default: '' },
});

const { ortu } = ortuState();
const { id, jumlah_anak } = toRefs(ortu);
</script>
