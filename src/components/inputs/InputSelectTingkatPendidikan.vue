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
		:bottom-slots="bottomSlots"
	>
		<template v-slot:hint>
			{{ hint }}
		</template>
		<template v-slot:after>
			<drop-down-after v-if="btnSetting" route-to="" @reload="reload" :disableRoute="true" />
		</template>
	</q-select>
</template>
<script setup>
import { useListsStore } from 'src/stores/lists-store';
import { computed, onMounted } from 'vue';
import DropDownAfter from './DropDownAfter.vue';
import { storeToRefs } from 'pinia';

const input = defineModel();
defineProps({
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
const url = 'tingkat-pendidikan';
const key = url.replace(/-/g, '_');

const options = computed(() => {
	return store.getStateByKey(key);
});

const hint = computed(() => {
	if (input.value) {
		const tingkat = options.value?.find((tk) => tk?.val0 === input.value);
		return 'Tingkat ID: ' + tingkat?.val0 || '';
	} else {
		return 'Pilih tingkat pendidikan';
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
</script>
<style lang=""></style>
