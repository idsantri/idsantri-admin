<template lang="">
	<q-select
		dense
		outlined
		:label="label"
		emit-value
		map-options
		v-model="input"
		:options="options"
		:loading="loading"
		behavior="menu"
		clearable
	>
		<template v-slot:after>
			<q-card flat bordered class="bg-transparent">
				<q-btn-dropdown flat dropdown-icon="more_vert" class="q-px-xs flex" color="">
					<q-btn
						no-caps
						label="Reload"
						flat
						icon="sync"
						v-close-popup
						class="block"
						@click="$emit('syncClick')"
					/>
					<q-separator />
					<q-btn
						no-caps
						label="Setting"
						flat
						icon="toc"
						to="/settings/alamat"
						v-close-popup
						class="block"
						@click="$emit('routeClick')"
					/>
				</q-btn-dropdown>
			</q-card>
		</template>
	</q-select>
</template>
<script setup>
const input = defineModel();
defineProps({
	options: {
		type: Array,
		default: () => [],
	},
	loading: {
		type: Boolean,
		default: false,
	},
	label: {
		type: String,
		default: () => 'Select Alamat',
	},
});
</script>
<style lang=""></style>
