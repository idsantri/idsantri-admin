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
				/>
			</div>
			<CardLoading :showing="loading" />
		</div>
	</div>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';
import { onMounted, ref } from 'vue';
import CardBanner from './CardBanner.vue';

const bannerContent = ref('');
const loading = ref(false);
const banners = ref([]);
const showFormAdd = ref(false);
const errorUpdate = ref(false);

async function onDelete(id) {
	const jsonBanners = JSON.parse(JSON.stringify(banners.value));
	const newBanners = jsonBanners.filter((banner) => banner.id !== id);
	const res = await apiPost({
		endPoint: 'config/app-wali/banners',
		loading: loading,
		data: { banners: newBanners },
		notify: true,
		message: 'Hapus banner?',
	});
	if (res) {
		banners.value = newBanners;
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
	const res = await apiPost({
		endPoint: 'config/app-wali/banners',
		loading: loading,
		data: { banners: newBanners },
	});
	if (res) {
		banners.value = newBanners;
	}
	// TODO: handle error
}

async function fetchData() {
	const data = await apiGet({
		endPoint: 'config/app-wali/banners',
		loading: loading,
	});
	if (data && data.banners) {
		banners.value = data.banners;
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

	const res = await apiPost({
		endPoint: 'config/app-wali/banners',
		loading: loading,
		data: { banners: newBanners },
	});
	if (res) {
		banners.value = newBanners;
		showFormAdd.value = false;
		bannerContent.value = '';
	}
}
</script>
<style lang=""></style>
