<template>
	<div>
		<q-separator dark v-if="separator" />
		<q-expansion-item
			expand-separator
			:label="label"
			:caption="caption"
			:header-class="headerClass"
			:expand-icon-class="expandIconClass"
		>
			<slot></slot>
		</q-expansion-item>
	</div>
</template>

<script setup>
defineProps({
	label: String,
	caption: String,
	headerClass: {
		type: Array,
		default: () => ['text-body1', 'text-green-11'],
	},
	expandIconClass: {
		type: String,
		default: 'text-green-11',
	},
	separator: { type: Boolean, default: true },
});
</script>
