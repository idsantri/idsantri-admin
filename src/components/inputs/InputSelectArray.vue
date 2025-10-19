<template lang="">
	<q-select
		dense
		outlined
		emit-value
		map-options
		:options="options"
		:loading="loading"
		behavior="menu"
		clearable
		:hint="textHint()"
	>
		<template v-slot:after>
			<drop-down-after
				v-if="btnSetting"
				:route-to="url"
				@reload="fetchList"
			/>
		</template>
	</q-select>
</template>
<script setup>
import listsStore from 'src/stores/lists-store';
import { onMounted, ref } from 'vue';
import DropDownAfter from './DropDownAfter.vue';
import Lists from 'src/models/Lists';
import ArrayCrud from 'src/models/ArrayCrud';

const props = defineProps({
	url: {
		type: String,
		require: true,
	},
	sort: {
		type: String,
		default: 'asc',
	},
	selected: {
		type: String,
		default: '',
	},
	btnSetting: {
		type: Boolean,
		default: true,
	},
});

const loading = ref(false);
const options = ref([]);
const store = listsStore();
const key = props.url.replace(/-/g, '_');

function textHint() {
	let result = '';
	if (props.selected && props.url == 'tahun-ajaran') {
		const data = store.getStateByKey(key);
		result = data.find((th) => th.val0 === props.selected)?.val1;
	}
	return result;
}

onMounted(async () => {
	const data = store.getStateByKey_Arr(key);
	if (data.length) {
		options.value = ArrayCrud.sort(data, 'val0', props.sort);
	} else {
		await fetchList();
		const data = store.getStateByKey_Arr(key);
		options.value = ArrayCrud.sort(data, 'val0', props.sort);
	}
});

async function fetchList() {
	try {
		loading.value = true;
		const data = await Lists.getByKey(props.url);
		store.$patch({ [key]: data[key] });
	} catch (error) {
		console.log('error get list ', error);
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
