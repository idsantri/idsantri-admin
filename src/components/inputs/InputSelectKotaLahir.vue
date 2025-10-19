<template lang="">
	<q-select
		class="q-mt-sm"
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
import getData from 'src/api/api-get';
import { ref } from 'vue';

const input = defineModel();
const options = ref([]);
const loading = ref(false);

async function filterFunction(val, update) {
	if (!val) {
		update(() => {
			options.value = [];
		});
		return;
	}
	const data = await getData({
		endPoint: 'alamat/kabupaten-kota',
		loading,
		params: {
			q: val,
		},
	});
	// console.log(data);
	update(
		() => (options.value = data.kabupaten_kota),
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
