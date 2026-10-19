<template lang="">
	<q-card-actions class="flex items-center bg-green-6">
		<slot name="left1"></slot>
		<q-btn
			v-if="btnDelete"
			class="bg-red text-red-1"
			no-caps=""
			@click="$emit('onDelete')"
			:disable="disableDelete"
		>
			<q-icon v-if="iconDelete" :name="iconDelete" class="q-mr-xs" />
			<span>{{ labelDelete }}</span>
		</q-btn>
		<slot name="left2"></slot>
		<q-space />
		<slot name="right1"></slot>
		<q-btn v-if="btnClose" v-close-popup class="bg-green-11" no-caps="" id="btn-close-form" :disable="disableClose">
			<q-icon v-if="iconClose" :name="iconClose" class="q-mr-xs" />
			<span>{{ labelClose }}</span>
		</q-btn>
		<q-btn v-if="btnSubmit" type="submit" class="bg-green-10 text-green-11" no-caps="" :disable="disableSubmit">
			<q-icon v-if="iconSubmit" :name="iconSubmit" class="q-mr-xs" />
			<span>{{ labelSubmit }}</span>
		</q-btn>
		<slot name="right2"></slot>
	</q-card-actions>
</template>
<script setup>
defineProps({
	btnDelete: { type: Boolean, default: true },
	btnClose: { type: Boolean, default: true },
	btnSubmit: { type: Boolean, default: true },

	labelDelete: { type: String, default: () => 'Hapus' },
	labelClose: { type: String, default: () => 'Tutup' },
	labelSubmit: { type: String, default: () => 'Simpan' },

	iconSubmit: { type: String, default: () => 'sym_o_save' },
	iconDelete: { type: String, default: () => 'sym_o_delete' },
	iconClose: { type: String, default: () => 'sym_o_close' },

	disableSubmit: { type: Boolean, default: false },
	disableDelete: { type: Boolean, default: false },
	disableClose: { type: Boolean, default: false },
});
</script>
<style lang=""></style>
