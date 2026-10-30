<template>
	<q-select
		dense
		outlined
		label="Pasal dilanggar"
		emit-value
		map-options
		option-label="nomor"
		:options="options"
		:loading="loading"
		behavior="menu"
		clearable
		multiple
		v-model="input"
		:rules="[(val) => !!val || 'Harus diisi!']"
		popup-content-style="width: 300px; max-width: 100%;"
	>
		<template #option="scope">
			<q-item v-bind="scope.itemProps" :class="{ 'bg-green-11 text-green-10': scope.selected }">
				<q-item-section>
					<q-item-label overline :class="{ 'text-black tw:font-bold': scope.selected }">
						{{ scope.opt.nomor }}
					</q-item-label>
					<q-item-label
						caption
						style="white-space: normal; text-wrap: wrap"
						:class="{ 'text-italic text-green-10': scope.selected }"
					>
						{{ scope.opt.text }}
					</q-item-label>
				</q-item-section>
			</q-item>
		</template>
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
		result = data
			.filter((d) => d.val0.length != 1)
			.map((d) => {
				return {
					nomor: d.val0,
					text: d.val1,
				};
			});
	}
	// console.log('result', result);
	return result;
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
<style lang="scss" scoped></style>
