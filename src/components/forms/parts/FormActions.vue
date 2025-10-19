<template lang="">
	<q-card-actions class="flex bg-green-6">
		<q-btn
			v-if="btnDelete"
			label="Hapus"
			class="bg-red text-red-1"
			no-caps=""
			@click="$emit('onDelete')"
		/>
		<q-btn
			v-if="btnReset"
			label="Reset"
			class="bg-red text-red-1"
			no-caps=""
			@click="$emit('onReset')"
		/>
		<q-space />
		<q-btn
			v-if="btnClose"
			label="Tutup"
			v-close-popup
			class="bg-green-11"
			no-caps=""
			id="btn-close-form"
		/>
		<q-btn
			type="submit"
			label="Simpan"
			class="bg-green-10 text-green-11"
			no-caps=""
		/>
	</q-card-actions>
</template>
<script setup>
defineProps({
	btnDelete: Boolean,
	btnReset: Boolean,
	btnClose: { type: Boolean, default: true },
});
</script>
<style lang=""></style>
