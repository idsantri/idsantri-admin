<template lang="">
	<q-input
		outlined
		dense
		debounce="300"
		v-model="model"
		placeholder="Cari"
		:bg-color="bgColor"
		:color="color"
		type="search"
		clearable
	>
		<template v-slot:append>
			<q-icon name="search" />
		</template>
	</q-input>
</template>
<script setup>
const model = defineModel();
defineProps({
	bgColor: { type: String, default: 'white' },
	color: { type: String, default: 'green-10' },
});
</script>
<style lang=""></style>
