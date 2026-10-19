<template lang="">
	<q-select
		dense
		outlined
		label="Pasal dilanggar"
		emit-value
		map-options
		:options="options"
		:loading="loading"
		behavior="menu"
		clearable
		multiple
		:hint="hint"
		v-model="input"
	>
		<template v-slot:after>
			<drop-down-after route-to="tatib-santri" @reload="reload" />
		</template>
	</q-select>
</template>
<script setup>
import { useListsStore } from 'src/stores/lists-store';
import { computed, onMounted } from 'vue';
import DropDownAfter from './DropDownAfter.vue';
import { storeToRefs } from 'pinia';

const input = defineModel();

const store = useListsStore();
const storeRef = storeToRefs(store);
const { loading } = storeRef;
const url = 'tatib-santri';
const key = url.replace(/-/g, '_');

const options = computed(() => {
	const data = store.getStateByKey(key);
	let result = [];
	if (data.length) {
		result = data.filter((d) => d.val0.length != 1).map((d) => `[${d.val0}] ${d.val1}`);
	}
	return result;
});

function extractData(inputValue) {
	try {
		// Jika input kosong/null/undefined, kembalikan string ...
		if (!inputValue) {
			return 'Pilih pasal dilanggar';
		}

		// Normalisasi ke array
		const values = Array.isArray(inputValue) ? inputValue : [inputValue];

		// Gabungkan menjadi satu string dengan pemisah
		const joined = values.join('; ');

		// Ekstraksi konten di dalam tanda kurung []
		const regex = /\[(.*?)\]/g;
		const matches = joined.match(regex);

		// Jika tidak ada match, kembalikan string kosong
		if (!matches) {
			return '';
		}

		// Bersihkan tanda kurung [] dan gabungkan hasilnya
		const extractedData = matches.map((match) => match.slice(1, -1)).join(', ');
		return '[' + extractedData + ']';
	} catch (error) {
		// Tangani error secara aman
		console.error(error);
		return '';
	}
}
const hint = computed(() => extractData(input.value));

async function reload() {
	await store.fetchList(url);
}

onMounted(async () => {
	if (!options.value || options.value.length == 0) {
		await reload();
	}
});
</script>
<style lang=""></style>
