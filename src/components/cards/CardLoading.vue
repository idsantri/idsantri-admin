<template lang="">
	<!-- <q-inner-loading :showing="showing" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" /> -->

	<!-- 
		NOTE:
		- parent must be relative position (or the relative-position CSS class declared)
		- QInnerLoading must be the last element inside its parent so it can appear on top of the other content.
	-->
	<q-inner-loading :showing="showing">
		<q-spinner-puff size="8em" color="green-14" />
		<div class="text-subtitle2 text-green-10">Tunggu sebentar …</div>
	</q-inner-loading>
</template>
<script setup>
defineProps({
	showing: {
		type: Boolean,
		default: false,
	},
});
</script>
<style lang=""></style>
