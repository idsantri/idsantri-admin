<template>
	<div class="relative-position">
		<div style="min-height: 50px">
			<div class="row" v-for="(value, key) in props.data" :key="key">
				<div class="col-4 text-caption text-italic">{{ key }}</div>
				<div class="col">{{ value }}</div>
			</div>
			<q-btn
				icon="info"
				color="green-8"
				class="text-green-11 absolute-bottom-right"
				:to="props.route"
				round
				glossy
			/>
		</div>
		<CardLoading :showing="spinner" />
	</div>
</template>

<script setup>
const props = defineProps({
	data: null,
	route: null,
	spinner: Boolean,
});
</script>
