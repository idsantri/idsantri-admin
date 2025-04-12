<template>
	<q-card>
		<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
			<div class="flex items-center">
				<div class="text-subtitle2">{{ title }}</div>
				<q-space />
				<slot name="button" />
			</div>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<div v-if="loading">
				<q-spinner-cube
					color="green-12"
					size="8em"
					class="flex q-ma-lg q-mx-auto"
				/>
			</div>
			<table v-else>
				<tr class="" v-for="(value, key) in data" :key="key">
					<td class="text-caption text-italic q-pr-sm vertical-top">
						{{ key }}
					</td>
					<td class="vertical-top">
						{{ value }}
					</td>
				</tr>
			</table>
		</q-card-section>
	</q-card>
</template>
<script setup>
defineProps({
	title: String,
	data: Object,
	loading: Boolean,
});
</script>
