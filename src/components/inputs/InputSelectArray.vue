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
		v-model="input"
		ref="selectRef"
	>
		<template v-slot:after>
			<drop-down-after v-if="btnSetting" :route-to="url" @reload="fetchList" />
		</template>
	</q-select>
</template>
<script setup>
import listsStore from 'src/stores/lists-store';
import { onMounted, ref, useTemplateRef } from 'vue';
import DropDownAfter from './DropDownAfter.vue';
import Lists from 'src/models/Lists';

const input = defineModel();
const props = defineProps({
	url: {
		type: String,
		require: true,
	},
	sort: {
		type: String,
		default: 'asc',
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

const selectRef = useTemplateRef('selectRef');
defineExpose({
	focus: () => {
		if (selectRef.value) selectRef.value.focus();
	},
	showPopup: () => {
		if (selectRef.value) selectRef.value.showPopup();
	},
});

onMounted(async () => {
	const data = store.getStateByKey_Arr(key, props.sort);
	if (data.length) {
		options.value = data;
	} else {
		await fetchList();
		options.value = store.getStateByKey_Arr(key, props.sort);
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
