<template>
	<q-card flat bordered>
		<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
			<div class="flex items-center">
				<div class="text-subtitle2">{{ title }}</div>
				<q-space />
			</div>
		</q-card-section>
		<q-card-section class="q-pa-sm row">
			<div class="col-4 q-pr-sm">
				<div v-if="loadingImage">
					<q-spinner-cube color="green-12" size="4em" class="flex q-ma-sm q-mx-auto" />
				</div>
				<q-img v-else :src="image" :ratio="3 / 4" alt="santri" />
				<slot name="button" />
			</div>
			<div class="col">
				<div v-for="(value, key) in data" :key="key">
					<div class="text-caption text-italic">{{ key }}</div>
					<div class="q-mb-sm">{{ value }}</div>
				</div>
			</div>
			<CardLoading :showing="loading" />
		</q-card-section>
	</q-card>
</template>
<script setup>
defineProps({
	title: String,
	data: Object,
	image: String,
	loading: Boolean,
	loadingImage: Boolean,
});
</script>
