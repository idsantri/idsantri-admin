<template lang="">
	<q-page class="q-pa-sm">
		<q-card style="max-width: 600px">
			<CardHeader
				:title="`Upload ${selected.label}`"
				:showReload="false"
				:showBack="true"
			/>
			<q-card-section horizontal>
				<q-card-section class="q-pa-sm">
					<div style="width: 200px">
						<q-img
							:src="computedSrc"
							:ratio="1"
							alt="user"
							:img-style="{
								border: '1px',
								borderColor: 'green',
								borderStyle: 'solid',
							}"
						/>
						<q-btn
							icon="upload"
							label="Upload"
							no-caps
							dense
							outline
							class="full-width q-mt-md"
							@click="showUploader = true"
						/>
					</div>
				</q-card-section>

				<q-separator vertical />

				<q-card-section class="q-pa-sm">
					<div class="text-subtitle1">{{ selected.label }}</div>
					<ul class="text-italic q-mt-sm">
						<li>Pastikan gambar sudah transparan</li>
						<li>Gunakan file dengan ekstensi PNG</li>
					</ul>
				</q-card-section>
			</q-card-section>
		</q-card>
		<upload-image
			:show-uploader="showUploader"
			:url="`/config/profiles/upload/${selected.url}`"
			:width="200"
			:height="200"
			:img-format="imgFormat"
			@update-uploader="updateUploader"
			@success-upload="successUpload"
		/>
	</q-page>
</template>
<script setup>
import { computed, ref } from 'vue';
import UploadImage from 'src/components/ImageUploader.vue';
import api from 'src/api';
import config from 'src/config';
import CardHeader from 'src/components/CardHeader.vue';
import { useRoute, useRouter } from 'vue-router';
import { notifyError } from 'src/utils/notify';

const { params } = useRoute();
const router = useRouter();
let selected = null;
switch (params?.image?.toLocaleLowerCase()) {
	case 'stempel':
		selected = {
			label: 'Stempel Lembaga',
			url: 'stempel',
		};
		break;
	case 'tt-pengasuh':
		selected = {
			label: 'Tanda Tangan Pengasuh',
			url: 'tt-pengasuh',
		};
		break;
	case 'tt-ketua':
		selected = {
			label: 'Tanda Tangan Ketua',
			url: 'tt-ketua',
		};
		break;
	case 'tt-sekretaris':
		selected = {
			label: 'Tanda Tangan Sekretaris',
			url: 'tt-sekretaris',
		};
		break;
	default:
		notifyError(
			'Halaman tidak ditemukan',
			'Halaman yang anda cari tidak ditemukan',
		);
		selected = {
			label: 'Halaman tidak ditemukan',
			url: 'not-found',
		};
		router.push('/settings/profile');
		break;
}

const base = api.defaults.baseURL;
const url = base.replace(config.END_API, '/assets/');
const timestamp = ref(Date.now());

const showUploader = ref(false);
const updateUploader = (val) => (showUploader.value = val);
const imgFormat = 'png';

const computedSrc = computed(
	() => `${url}${selected.url}.${imgFormat}?timestamp=${timestamp.value}`,
);

async function successUpload() {
	showUploader.value = false;
	timestamp.value = Date.now();
}
</script>
<style lang=""></style>
