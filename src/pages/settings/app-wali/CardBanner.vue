<template lang="">
	<q-card class="q-mt-sm" flat bordered>
		<q-card-section class="q-pa-sm bg-green-1 flex justify-between items-center">
			<div class="text-weight-bold">Banner {{ index + 1 }}</div>
			<div>
				<q-btn
					dense
					class="q-px-sm q-mr-sm"
					:icon="isEdit ? 'close' : 'edit'"
					outline
					:label="isEdit ? 'Batal' : 'Edit'"
					no-caps
					@click="isEdit = !isEdit"
				/>
				<q-btn
					dense
					class="q-px-sm"
					icon="delete"
					outline
					label="Hapus"
					no-caps
					color="negative"
					@click="$emit('onDelete', banner.id)"
				/>
			</div>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<div v-if="isEdit">
				<q-form @submit.prevent="onSubmit">
					<q-editor
						v-model="bannerContent"
						min-height="20rem"
						:definitions="{
							save: {
								tip: 'Save your work',
								icon: 'save',
								label: 'Simpan',
								handler: onSubmit,
							},
						}"
						:toolbar="[
							[
								{
									label: $q.lang.editor.align,
									icon: $q.iconSet.editor.align,
									fixedLabel: true,
									list: 'only-icons',
									options: ['left', 'center', 'right', 'justify'],
								},
							],
							['bold', 'italic', 'underline'],
							['undo', 'redo'],
							[
								{
									label: $q.lang.editor.formatting,
									icon: $q.iconSet.editor.formatting,
									list: 'no-icons',
									options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
								},
								{
									label: $q.lang.editor.fontSize,
									icon: $q.iconSet.editor.fontSize,
									fixedLabel: true,
									fixedIcon: true,
									list: 'no-icons',
									options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
								},
								'removeFormat',
							],
							['unordered', 'ordered', 'outdent', 'indent'],
							['save'],
						]"
					/>
				</q-form>
			</div>
			<div v-else v-html="banner?.content"></div>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';

const { banner, index } = defineProps({
	banner: {
		type: Object,
		default: () => {},
	},
	index: {
		type: Number,
		default: 0,
	},
});

const emit = defineEmits(['onUpdate', 'onDelete']);

const isEdit = ref(false);
const bannerContent = ref(banner?.content || '');

function onSubmit() {
	emit('onUpdate', {
		id: banner.id,
		content: bannerContent.value,
	});
}

function setNotEdit() {
	isEdit.value = false;
}
defineExpose({
	setNotEdit,
});
</script>
<style lang=""></style>
