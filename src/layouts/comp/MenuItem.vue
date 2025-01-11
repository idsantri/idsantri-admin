<template>
	<q-item
		:clickable="!item.disable"
		v-ripple
		:to="item.to"
		:disable="item.disable"
		active-class="text-green-13"
	>
		<q-item-section avatar>
			<q-icon color="green-1" :name="item.icon" />
		</q-item-section>
		<q-item-section>
			<q-item-label>{{ item.label }}</q-item-label>
			<q-item-label caption>{{ item.caption }}</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script setup>
defineProps({
	item: {
		type: Object,
		required: true,
	},
});
</script>
