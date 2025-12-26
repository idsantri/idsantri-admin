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
			<drop-down-after v-if="btnSetting" :route-to="url" @reload="fetchList" />
		</template>
	</q-select>
</template>
<script setup>
import listsStore from 'src/stores/lists-store';
import { computed, onMounted, ref } from 'vue';
import DropDownAfter from './DropDownAfter.vue';
import Lists from 'src/models/Lists';

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

const loading = ref(false);
const options = ref([]);
const store = listsStore();
const url = 'tahun-ajaran';
const key = url.replace(/-/g, '_');

const hint = computed(() => {
	if (input.value) {
		const tahun = options.value?.find((th) => th?.val0 === input.value);
		return tahun?.val1;
	} else {
		return 'Pilih Tahun Ajaran';
	}
});

const selectRef = ref(null);
defineExpose({
	focus: () => {
		if (selectRef.value) selectRef.value.focus();
	},
	showPopup: () => {
		if (selectRef.value) selectRef.value.showPopup();
	},
});

onMounted(async () => {
	const data = store.getStateByKey(key, props.sort);
	if (data.length) {
		options.value = data;
	} else {
		await fetchList();
		options.value = store.getStateByKey(key, props.sort);
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
