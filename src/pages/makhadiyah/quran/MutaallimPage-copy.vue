<template lang="">
	<q-card flat bordered class="">
		<q-card-section class="text-subtitle2 q-pa-sm">
			<q-select
				outlined
				dense
				v-model="model"
				:options="options"
				label="Pilih Domisili"
				multiple
				style="max-width: 300px"
				@blur="input"
			>
				<template
					v-slot:option="{ itemProps, opt, selected, toggleOption }"
				>
					<q-item v-bind="itemProps">
						<q-item-section>
							<q-item-label>{{ opt }}</q-item-label>
						</q-item-section>
						<q-item-section side>
							<q-toggle
								:model-value="selected"
								@update:model-value="toggleOption(opt)"
							/>
						</q-item-section>
					</q-item>
				</template>
			</q-select>
		</q-card-section>
		<q-separator />

		<q-separator />
		<pre>
			Model: {{ model }}
		</pre
		>
		<!-- <pre>
			santri: {{ santri }}
		</pre
		> -->
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const model = ref([]);
const options = ref([
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
]);
async function loadData() {}

function input(val) {
	console.log('Selected values:', val.target.value);
	console.log('model:', JSON.parse(JSON.stringify(model.value)));
}
onMounted(async () => {
	await loadData();
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function groupByDomisili(data) {
	const domisiliSet = new Set();
	data.forEach((item) => {
		if (item.domisili) {
			domisiliSet.add(item.domisili);
		}
	});
	return Array.from(domisiliSet);
}
</script>
<style lang=""></style>
