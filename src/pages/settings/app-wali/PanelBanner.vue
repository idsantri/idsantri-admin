<template lang="">
	<div>
		<div class="flex justify-between items-center q-mb-sm">
			<div>
				<div class="text-italic text-weight-light">Banner Pengumuman</div>
			</div>

			<q-btn
				dense
				class="q-px-sm"
				:icon="showFormAdd ? 'close' : 'add'"
				outline
				:label="showFormAdd ? 'Batal' : 'Baru'"
				no-caps
				@click="showFormAdd = !showFormAdd"
			/>
		</div>

		<div v-if="showFormAdd">
			<q-form @submit.prevent="onSubmit">
				<q-editor
					v-model="bannerContent"
					min-height="10rem"
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
			</q-form>
		</div>

		<div v-if="!showFormAdd">
			<div v-if="!banners.length">
				<div class="text-center text-italic q-pa-lg text-negative">
					Tidak ada data <br />Silakan tambahkan banner baru
				</div>
			</div>
			<div v-else>
				<CardBanner
					v-for="(banner, index) in banners"
					:key="banner.id"
					:banner="banner"
					:index="index"
					@onUpdate="onUpdate"
					@onDelete="onDelete"
					:errorUpdate="errorUpdate"
					ref="cardRef"
				/>
			</div>
			<CardLoading :showing="loading" />
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import CardBanner from './CardBanner.vue';
import ConfigApp from 'src/models/ConfigApp';
import { notifyConfirm } from 'src/utils/notify';

const bannerContent = ref('');
const loading = ref(false);
const banners = ref([]);
const showFormAdd = ref(false);
const errorUpdate = ref(false);
const cardRef = ref(null);

async function onDelete(id) {
	const isConfirm = await notifyConfirm('Yakin menghapus banner ini?');
	if (!isConfirm) {
		return;
	}
	const jsonBanners = JSON.parse(JSON.stringify(banners.value));
	const newBanners = jsonBanners.filter((banner) => banner.id !== id);
	try {
		loading.value = true;
		await ConfigApp.setAppWali({ banners: newBanners }, 'banners');
		banners.value = newBanners;
	} catch (error) {
		console.error('🚀 ~ onDelete ~ error:', error);
	} finally {
		loading.value = false;
	}
}

async function onUpdate(banner) {
	const jsonBanners = JSON.parse(JSON.stringify(banners.value));
	const newBanners = jsonBanners.map((ban) => {
		if (ban.id === banner.id) {
			return { ...ban, content: banner.content };
		}
		return ban;
	});
	const i = newBanners.findIndex((ban) => ban.id === banner.id);
	try {
		loading.value = true;
		await ConfigApp.setAppWali({ banners: newBanners }, 'bannersa');
		banners.value = newBanners;
		errorUpdate.value = false;
		cardRef.value[i].setNotEdit();
	} catch (error) {
		console.error('🚀 ~ onUpdate ~ error:', error);
		errorUpdate.value = true;
	} finally {
		loading.value = false;
	}
}

async function fetchData() {
	try {
		loading.value = true;
		const data = await ConfigApp.getAppWali('banners');
		banners.value = data?.banners || [];
	} catch (error) {
		console.error('🚀 ~ fetchData ~ error:', error);
	} finally {
		loading.value = false;
	}
}
onMounted(async () => {
	await fetchData();
});

async function onSubmit() {
	const jsonBanners = JSON.parse(JSON.stringify(banners.value));
	const newBanners = [
		...jsonBanners,
		{
			id: new Date().getTime(),
			content: bannerContent.value,
		},
	];
	try {
		loading.value = true;
		await ConfigApp.setAppWali({ banners: newBanners }, 'banners');
		banners.value = newBanners;
		bannerContent.value = '';
		showFormAdd.value = false;
	} catch (error) {
		console.error('🚀 ~ onSubmit ~ error:', error);
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
