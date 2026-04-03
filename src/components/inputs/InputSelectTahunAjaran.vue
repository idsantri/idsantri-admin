<template lang="">
	<q-select
		dense
		outlined
		label="Tahun Ajaran *"
		emit-value
		map-options
		option-value="val0"
		option-label="val0"
		:options="options"
		:loading="loading"
		behavior="menu"
		clearable
		v-model="input"
		:bottom-slots="bottomSlots"
		ref="selectRef"
	>
		<template v-slot:hint>
			{{ hint }}
		</template>
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
	sort: {
		type: String,
		default: () => 'desc',
	},
	btnSetting: {
		type: Boolean,
		default: true,
	},
	bottomSlots: {
		type: Boolean,
		default: true,
	},
});

const store = useListsStore();
const storeRef = storeToRefs(store);
const { loading } = storeRef;
const url = 'tahun-ajaran';
const key = url.replace(/-/g, '_');

const options = computed(() => {
	return store.getStateByKey(key, props.sort);
});

const hint = computed(() => {
	if (input.value) {
		const tahun = options.value?.find((th) => th?.val0 === input.value);
		return tahun?.val1;
	} else {
		return 'Pilih Tahun Ajaran';
	}
});

async function reload() {
	await store.fetchList(url);
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
