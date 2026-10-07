<template>
	<button
		type="button"
		@click="$emit('click')"
		class="tw:w-24 tw:h-24 tw:rounded-full tw:bg-orange-600/25 hover:tw:bg-black/70 tw:text-orange-100 tw:border-2 tw:border-white/75 tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-1 tw:transition-all tw:duration-300 tw:backdrop-blur-xs"
	>
		<q-icon :name="icon" size="2em" />
		<span class="tw:text-xs tw:font-medium">{{ label }}</span>
	</button>
</template>
<script setup>
const props = defineProps({
	label: {
		type: String,
		default: 'Kamera',
	},
	icon: {
		type: String,
		default: 'sym_o_photo_camera',
	},
});
</script>
<style lang=""></style>
