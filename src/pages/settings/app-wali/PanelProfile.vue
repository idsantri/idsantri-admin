<template lang="">
	<div>
		<div class="flex justify-between items-center">
			<div>
				<div class="text-italic text-weight-light">
					Teks untuk ditampilkan di halaman beranda Aplikasi Wali
					Santri
				</div>
			</div>
			<q-btn icon="edit" flat @click="onEdit" />
		</div>
		<q-separator class="q-mb-sm" />
		<div v-if="isEdit">
			<q-editor
				v-model="inputProfile"
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
							options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
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
				color="green-10"
				outline
				no-caps
				:disabled="loading"
				class="q-px-sm float-right q-my-sm"
				@click="onSubmit"
				:loading="loading"
				icon="save"
				label="Simpan"
			/>
		</div>
		<div v-else>
			<div v-if="props.profile" class="">
				<span v-html="props.profile"> </span>
			</div>
			<div v-else>
				<div class="">Belum diatur</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import apiPost from 'src/api/api-post';
import { ref } from 'vue';

const props = defineProps({
	profile: String,
});
const emit = defineEmits(['onUpdate']);

const inputProfile = ref('');
const isEdit = ref(false);
const loading = ref(false);

const onSubmit = async () => {
	const res = await apiPost({
		endPoint: 'config/app-wali/profile',
		loading: loading,
		data: { profile: inputProfile.value },
	});
	if (res) {
		emit('onUpdate', res.profile);
		isEdit.value = false;
	}
};

function onEdit() {
	inputProfile.value = props.profile;
	isEdit.value = !isEdit.value;
}
</script>
<style lang=""></style>
