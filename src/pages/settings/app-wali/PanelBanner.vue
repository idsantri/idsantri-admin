<template lang="">
	<div>
		<div class="flex justify-between items-center">
			<div>
				<div class="text-italic text-weight-light">
					Banner Pengumuman
				</div>
			</div>
			<q-btn icon="edit" flat @click="onEdit" />
		</div>
		<q-separator class="q-mb-sm" />
		<div v-if="isEdit">
			<q-form @submit.prevent="onSubmit">
				<q-input
					v-model="bannerExpiredAt"
					type="date"
					outlined
					dense
					label="Tanggal Akhir"
					:disable="loading"
					class="q-mb-sm"
					clearable
					style="max-width: 400px"
					mask="date"
					:loading="loading"
				/>

				<q-editor
					v-model="bannerContent"
					min-height="20rem"
					:disable="loading"
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
								options: [
									'p',
									'h1',
									'h2',
									'h3',
									'h4',
									'h5',
									'h6',
								],
							},
							{
								label: $q.lang.editor.fontSize,
								icon: $q.iconSet.editor.fontSize,
								fixedLabel: true,
								fixedIcon: true,
								list: 'no-icons',
								options: [
									'size-1',
									'size-2',
									'size-3',
									'size-4',
									'size-5',
									'size-6',
									'size-7',
								],
							},
							'removeFormat',
						],
						['unordered', 'ordered', 'outdent', 'indent'],
						['save'],
					]"
				/>
				<q-btn
					type="submit"
					color="green-10"
					outline
					no-caps
					:disabled="loading"
					class="q-px-sm float-right q-my-sm"
					:loading="loading"
					icon="save"
					label="Simpan"
				/>
			</q-form>
		</div>
		<div v-else>
			<div>
				<div>
					<span class="text-italic text-weight-light">
						Tampil hingga:
					</span>
					<span class="text-weight-bold">
						{{
							banner?.expired_at
								? formatDateFullDay(banner.expired_at)
								: ''
						}}
					</span>
				</div>
			</div>
			<div class="q-mt-sm q-card--bordered q-pa-sm">
				<span v-if="banner?.content" v-html="banner?.content"></span>
				<span v-else>Tidak ada data</span>
			</div>
		</div>
	</div>
</template>
<script setup>
import apiPost from 'src/api/api-post';
import { formatDateFullDay } from 'src/utils/format-date';
import { ref } from 'vue';

const props = defineProps({ banner: { type: Object } });
const emit = defineEmits(['onUpdate']);

const bannerContent = ref('');
const bannerExpiredAt = ref('');
const isEdit = ref(false);
const loading = ref(false);

function onEdit() {
	bannerContent.value = props.banner?.content ?? '';
	bannerExpiredAt.value = props.banner?.expired_at ?? '';
	isEdit.value = !isEdit.value;
}

async function onSubmit() {
	const banner = {
		expired_at: bannerExpiredAt.value,
		content: bannerContent.value,
	};

	const res = await apiPost({
		endPoint: 'config/app-wali/banner',
		loading: loading,
		data: { banner },
	});
	if (res) {
		// console.log(res);
		emit('onUpdate', res.banner);
		isEdit.value = false;
	}
}
</script>
<style lang=""></style>
