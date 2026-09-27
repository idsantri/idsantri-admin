<template>
	<q-banner>
		<div class="absolute-top-right q-ma-sm" v-if="showBtnUpload">
			<q-btn icon="camera" round no-caps dense glossy class="q-ma-xs q-px-sm" @click="showUploader = true" />
		</div>
		<div style="max-width: 150px" class="q-mx-auto">
			<q-img
				:src="srcImg"
				:ratio="1"
				alt="user"
				:img-style="{
					borderRadius: '50%',
					border: '3px',
					borderColor: 'green',
					borderStyle: 'solid',
				}"
			/>
		</div>
		<upload-image
			:show-uploader="showUploader"
			:url="`/images/users/${userId}`"
			:width="300"
			:height="300"
			img-format="webp"
			@update-uploader="updateUploader"
			@success-upload="successUpload"
		/>
	</q-banner>
</template>
<script setup>
import Image from 'src/models/Image';
import { ref, watchEffect } from 'vue';
import UploadImage from 'src/components/ImageUploader.vue';

const props = defineProps({
	userId: { type: [String, Number] },
	showBtnUpload: { type: Boolean, default: false },
});

const srcImg = ref('/user-default.png');
const showUploader = ref(false);
const updateUploader = (val) => (showUploader.value = val);

async function successUpload(res) {
	// console.log(val);
	showUploader.value = false;
	srcImg.value = res.image.image_url + `?t=${new Date().getTime()}`;
}

watchEffect(async () => {
	if (props.userId) {
		await loadImage(props.userId);
	}
});

async function loadImage(id) {
	try {
		const img = await Image.user(id);
		if (img?.image_url) {
			srcImg.value = img.image_url + `?t=${new Date().getTime()}`;
		}
	} catch (error) {
		console.log('🚀 ~ loadImage ~ error:', error);
	}
}
</script>
<style lang=""></style>
