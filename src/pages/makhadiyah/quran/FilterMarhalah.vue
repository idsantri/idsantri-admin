<template>
	<div class="flex items-center q-gutter-x-sm">
		<q-select
			dense
			outlined
			label="Filter Marhalah"
			style="width: 300px"
			clearable
			:options="optionsMarhalah"
			v-model="modelMarhalah"
		/>
		<q-select
			dense
			outlined
			multiple
			label="Filter Faslah/Kelas"
			:options="optionsFaslah"
			v-model="modelFaslah"
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
	</div>
</template>

<script setup>
const modelMarhalah = defineModel('modelMarhalah', {
	type: String,
	default: () => '',
});

const modelFaslah = defineModel('modelFaslah', {
	type: Array,
	default: () => [],
});

defineProps({
	optionsMarhalah: {
		type: Array,
		default: () => [],
	},
	optionsFaslah: {
		type: Array,
		default: () => [],
	},
});
</script>
