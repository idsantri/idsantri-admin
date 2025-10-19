<template lang="">
	<q-select
		dense
		hint="Kota kelahiran"
		outlined
		label="Tempat Lahir"
		v-model="input"
		:options="options"
		emit-value
		map-options
		error-color="negative"
		:loading="loading"
		input-debounce="100"
		use-input
		clearable=""
		new-value-mode="add"
		@filter="filterFunction"
		behavior="menu"
	/>
</template>
<script setup>
import Alamat from 'src/models/Alamat';
import { ref } from 'vue';

const input = defineModel();
const options = ref([]);
const loading = ref(false);

async function getLists(val) {
	try {
		loading.value = true;
		const response = await Alamat.searchKabKota({
			q: val,
		});
		return response.kabupaten_kota;
	} finally {
		loading.value = false;
	}
}

async function filterFunction(val, update) {
	if (!val) {
		update(() => {
			options.value = [];
		});
		return;
	}
	const lists = await getLists(val);
	update(
		() => (options.value = lists),
		(menuRef) => {
			if (val !== '' && menuRef.options.length) {
				menuRef.setOptionIndex(-1);
				menuRef.moveOptionSelection(1, true);
			}
		},
	);
}
</script>
<style lang=""></style>
