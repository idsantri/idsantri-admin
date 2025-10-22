<template>
	<q-card>
		<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
			<div class="flex items-center">
				<div class="text-subtitle2">{{ title }}</div>
				<q-space />
				<slot name="button" />
			</div>
		</q-card-section>
		<q-card-section class="no-padding">
			<q-markup-table flat class="q-px-sm">
				<tbody>
					<tr class="" v-for="(item, i) in data" :key="i">
						<td class="text-caption text-italic" style="width: 120px">
							{{ item.label }}
						</td>
						<td class="">
							{{ item.value }}
						</td>
					</tr>
				</tbody>
			</q-markup-table>
			<CardLoading :showing="loading" />
		</q-card-section>
	</q-card>
</template>
<script setup>
defineProps({
	title: String,
	data: {
		type: Array,
		required: true,
	},
	loading: Boolean,
});
</script>
<style scoped>
td {
	white-space: normal;
	word-wrap: break-word;
}
</style>
