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
			<drop-down-after v-if="btnSetting" :route-to="url" @reload="reload" />
		</template>
	</q-select>
</template>
<script setup>
import { useListsStore } from 'src/stores/lists-store';
import { computed, onMounted, useTemplateRef } from 'vue';
import DropDownAfter from './DropDownAfter.vue';
import { storeToRefs } from 'pinia';

const input = defineModel();
const props = defineProps({
	url: {
		type: String,
		require: true,
	},
	sort: {
		type: String,
		default: () => 'asc',
	},
	btnSetting: {
		type: Boolean,
		default: true,
	},
});

const store = useListsStore();
const storeRef = storeToRefs(store);
const { loading } = storeRef;
const key = props.url.replace(/-/g, '_');

const options = computed(() => {
	return store.getStateByKey(key, props.sort, true);
});

async function reload() {
	await store.fetchList(props.url);
}

onMounted(async () => {
	if (!options.value || options.value.length == 0) {
		await reload();
	}
});

const selectRef = useTemplateRef('selectRef');
defineExpose({
	focus: () => {
		if (selectRef.value) selectRef.value.focus();
	},
	showPopup: () => {
		if (selectRef.value) selectRef.value.showPopup();
	},
});
</script>
<style lang=""></style>
