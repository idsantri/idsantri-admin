<template lang="">
	<q-select
		dense
		outlined
		label="Tingkat Pendidikan *"
		emit-value
		map-options
		option-value="val0"
		option-label="val1"
		:options="options"
		:loading="loading"
		behavior="menu"
		clearable
		v-model="input"
		:bottom-slots="withHint"
	>
		<template v-slot:hint>
			<div>{{ hint }}</div>
		</template>
		<template v-slot:after>
			<drop-down-after
				v-if="btnSetting"
				route-to=""
				@reload="fetchList"
				:disableRoute="true"
			/>
		</template>
	</q-select>
</template>
<script setup>
import listsStore from 'src/stores/lists-store';
import { computed, onMounted, ref } from 'vue';
import DropDownAfter from './DropDownAfter.vue';
import Lists from 'src/models/Lists';

const input = defineModel();
defineProps({
	btnSetting: {
		type: Boolean,
		default: true,
	},
	withHint: {
		type: Boolean,
		default: true,
	},
});

const loading = ref(false);
const options = ref([]);
const store = listsStore();
const url = 'tingkat-pendidikan';
const key = url.replace(/-/g, '_');

const hint = computed(() => {
	if (input.value) {
		const tingkat = options.value?.find((tk) => tk?.val0 === input.value);
		return 'Tingkat ID: ' + tingkat?.val0 || '';
	} else {
		return 'Pilih tingkat pendidikan';
	}
});

onMounted(async () => {
	const data = store.getStateByKey(key);
	if (data.length) {
		options.value = data;
	} else {
		await fetchList();
		options.value = store.getStateByKey(key);
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
