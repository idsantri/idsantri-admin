<template lang="">
	<div>
		<div class="flex justify-between items-center q-mb-sm">
			<div>
				<div class="text-italic text-weight-light">
					Teks untuk ditampilkan di halaman beranda Aplikasi Wali Santri
				</div>
			</div>
			<q-btn
				dense
				class="q-px-sm"
				:icon="isEdit ? 'close' : 'edit'"
				outline
				:label="isEdit ? 'Batal' : 'Edit'"
				no-caps
				@click="onEdit"
			/>
		</div>
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
							options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
						},
						'removeFormat',
					],
					['unordered', 'ordered', 'outdent', 'indent'],
					['save'],
				]"
			/>
		</div>
		<div v-else>
			<q-separator class="q-mb-sm" />

			<div v-if="profile" class="">
				<span v-html="profile"> </span>
			</div>
			<div v-else>
				<div class="">Belum diatur</div>
			</div>
			<CardLoading :showing="loading" />
		</div>
	</div>
</template>
<script setup>
import ConfigApp from 'src/models/ConfigApp';
import { onMounted, ref } from 'vue';

const profile = ref('');
const inputProfile = ref('');
const isEdit = ref(false);
const loading = ref(false);

async function fetchData() {
	try {
		loading.value = true;
		const data = await ConfigApp.getAppWali('profile');
		profile.value = data?.profile || '';
	} catch (error) {
		console.error('🚀 ~ fetchData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await fetchData();
});

const onSubmit = async () => {
	try {
		loading.value = true;
		await ConfigApp.setAppWali({ profile: inputProfile.value }, 'profile');
		profile.value = inputProfile.value;
		isEdit.value = false;
	} catch (error) {
		console.error('🚀 ~ onSubmit ~ error:', error);
	} finally {
		loading.value = false;
	}
};

function onEdit() {
	inputProfile.value = profile.value;
	isEdit.value = !isEdit.value;
}
</script>
<style lang=""></style>
