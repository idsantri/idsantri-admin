<template>
	<q-card-section class="q-pa-sm bg-green-11">
		<div class="flex items-center justify-between">
			<div class="flex items-center text-green-10">
				<q-btn
					dense
					icon="sync"
					flat
					@click="$emit('onReload')"
					class="q-px-sm q-mr-sm"
				/>
				<div class="text-subtitle2">
					{{ title }}
				</div>
			</div>
			<q-space />
			<div class="flex items-center">
				<q-btn
					no-caps
					outline
					dense
					class="q-px-sm q-mr-sm"
					:icon="showFilter ? 'filter_list_off' : 'filter_list'"
					label="Filter"
					:disable="disableFilter"
					@click="$emit('onFilter')"
					color="green-10"
					:glossy="showFilter"
				/>
				<q-input
					outlined
					dense
					debounce="300"
					color="green-6"
					v-model="model"
					clearable
					type="search"
					:placeholder="placeholder"
				>
					<template v-slot:append>
						<q-icon name="search" />
					</template>
				</q-input>
			</div>
		</div>
	</q-card-section>
</template>

<script setup>
const model = defineModel({ type: String, default: '' });

defineProps({
	title: String,
	placeholder: {
		type: String,
		default: 'Tulis teks pencarian di sini...',
	},
	disableFilter: {
		type: Boolean,
	},
	showFilter: {
		type: Boolean,
	},
});
defineEmits(['onReload', 'onFilter']);
</script>
