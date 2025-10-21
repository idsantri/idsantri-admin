<template>
	<div>
		<div v-if="props.spinner">
			<q-spinner-cube color="green-12" size="8em" class="flex q-mx-auto" />
		</div>
		<div v-else style="min-height: 50px">
			<div class="row" v-for="(value, key) in props.data" :key="key">
				<div class="col-4 text-caption">{{ key }}</div>
				<div class="col">{{ value }}</div>
			</div>
			<q-btn
				icon="info"
				color="green-8"
				class="text-green-11 absolute-bottom-right q-ma-sm"
				:to="props.route"
				round
				glossy
			/>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: null,
	route: null,
	spinner: Boolean,
});
</script>
