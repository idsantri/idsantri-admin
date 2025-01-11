<template lang="">
	<div
		class="container-logo"
		:style="{
			width: `${size}px`,
			height: `${size}px`,
			borderWidth: `${border}px`,
		}"
	>
		<div>
			<img src="/icons/icon-256x256.png" alt="logo/lambang" />
		</div>
	</div>
</template>
<script setup>
defineProps({
	size: {
		type: Number,
		default: 100,
	},
	border: {
		type: Number,
		default: 4,
	},
});
</script>
<style lang="scss">
.container-logo {
	overflow: hidden;
	background-color: transparent;
	border-radius: 50%;
	border-style: solid;
	border-color: #b9f6ca;

	div {
		background-color: transparent;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 50%;
		border-style: solid;
		border-color: #1b5e20;
		border-width: 2px;

		img {
			scale: 1.25;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
