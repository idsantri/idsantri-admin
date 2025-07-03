<template>
	<div class="flex items-center justify-between">
		<div class="flex items-center q-gutter-x-sm">
			<q-select
				dense
				outlined
				label="Pilih Tingkat Pendidikan"
				style="width: 300px"
				clearable
				:options="optionsTingkat"
				v-model="modelTingkat"
			/>
			<q-select
				dense
				outlined
				multiple
				label="Filter Faslah/Kelas"
				:options="optionsKelas"
				v-model="modelKelas"
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
		<q-btn
			label="Filter by Domisili"
			no-caps
			color="green-6"
			dense
			class="q-px-sm"
			@click="$emit('onToggle')"
		/>
	</div>
</template>

<script setup>
const modelTingkat = defineModel('modelTingkat', {
	type: String,
	default: () => '',
});

const modelKelas = defineModel('modelKelas', {
	type: Array,
	default: () => [],
});

defineProps({
	optionsTingkat: {
		type: Array,
		default: () => [],
	},
	optionsKelas: {
		type: Array,
		default: () => [],
	},
});
defineEmits(['onToggle']);
// defineEmits(['update:modelTingkat', 'update:modelKelas', 'toggle']);
</script>
