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
		:hint="textHint()"
	>
		<template v-slot:after>
			<drop-down-after route-to="tatib-santri" @reload="fetchList" />
		</template>
	</q-select>
</template>
<script setup>
import listsStore from 'src/stores/lists-store';
import { onMounted, ref } from 'vue';
import DropDownAfter from './DropDownAfter.vue';
import Lists from 'src/models/Lists';

const props = defineProps({
	selected: {
		type: String,
	},
});

function textHint() {
	let result = '';
	if (props.selected) {
		result = extractDataInBrackets(props.selected);
	}
	return result;
}

function extractDataInBrackets(inputText) {
	let extractedData = '';
	const regex = /\[(.*?)\]/g;
	const matches = inputText.match(regex);

	if (matches) {
		extractedData = matches.map((match) => match.slice(1, -1)).join(', ');
	}

	return extractedData;
}

const loading = ref(false);
const options = ref([]);
const store = listsStore();
const url = 'tatib-santri';
const key = url.replace(/-/g, '_');

function mapData(data) {
	let result = [];
	if (data.length) {
		result = data
			.filter((d) => d.val0.length != 1)
			.map((d) => `[${d.val0}] ${d.val1}`);
	}
	return result;
}

onMounted(async () => {
	const data = store.getStateByKey(key);
	if (data.length) {
		options.value = mapData(data);
	} else {
		await fetchList();
		const result = store.getStateByKey(key);
		options.value = mapData(result);
	}
});

async function fetchList() {
	try {
		loading.value = true;
		const data = await Lists.getByKey(url);
		store.$patch({ [key]: data[key] });
	} catch (error) {
		console.log('error get list ', error);
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
