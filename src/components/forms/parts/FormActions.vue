<template lang="">
	<q-card-actions class="flex bg-green-6">
		<q-btn
			v-if="btnDelete"
			:label="labelDelete"
			class="bg-red text-red-1"
			no-caps=""
			@click="$emit('onDelete')"
		/>
		<q-space />
		<q-btn
			v-if="btnClose"
			:label="labelClose"
			v-close-popup
			class="bg-green-11"
			no-caps=""
			id="btn-close-form"
		/>
		<q-btn
			type="submit"
			:label="labelSubmit"
			class="bg-green-10 text-green-11"
			no-caps=""
		/>
	</q-card-actions>
</template>
<script setup>
defineProps({
	btnDelete: { type: Boolean, default: true },
	btnClose: { type: Boolean, default: true },
	labelDelete: { type: String, default: () => 'Hapus' },
	labelClose: { type: String, default: () => 'Tutup' },
	labelSubmit: { type: String, default: () => 'Simpan' },
});
</script>
<style lang=""></style>
