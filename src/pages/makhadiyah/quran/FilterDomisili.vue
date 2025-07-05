<template>
	<div class="flex items-center justify-between">
		<q-select
			dense
			outlined
			multiple
			label="Pilih Domisili"
			v-model="model"
			:options="options"
			style="width: 300px"
			clearable
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
							color="green-6"
						/>
					</q-item-section>
				</q-item>
			</template>
		</q-select>
		<q-btn
			label="Filter by Kelas"
			class="q-px-sm"
			no-caps
			color="green-6"
			dense
			@click="$emit('onToggle')"
		/>
	</div>
</template>

<script setup>
const model = defineModel({
	type: Array,
	default: () => [],
});

defineProps({
	options: {
		type: Array,
		default: () => [],
	},
});
defineEmits(['onToggle']);
</script>
