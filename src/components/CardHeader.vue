<template lang="">
	<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
		<div class="flex items-center">
			<div class="text-subtitle2">
				<slot>Judul</slot>
			</div>
			<q-space />
			<slot name="action"></slot>
			<q-btn
				no-caps
				label="Kembali"
				icon="reply"
				dense
				class="q-px-md"
				outline
				@click="$router.go(-1)"
				title="Kembali"
			/>
		</div>
	</q-card-section>
</template>
<script setup></script>
<style lang=""></style>
