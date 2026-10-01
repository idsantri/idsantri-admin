<template>
	<q-banner>
		<div class="absolute-top-right q-ma-sm" v-if="showBtnUpload">
			<q-btn icon="camera" round no-caps dense glossy class="q-ma-xs q-px-sm" @click="showUploader = true" />
		</div>
		<div style="max-width: 150px" class="q-mx-auto">
			<q-img
				:src="srcImage"
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
import { ref, watch } from 'vue';
import UploadImage from 'src/components/ImageUploader.vue';

const props = defineProps({
	userId: { type: [String, Number] },
	imageUrl: { type: String },
	showBtnUpload: { type: Boolean, default: false },
});
const emit = defineEmits(['image-uploaded']);

const srcImage = ref('/user-default.png');
watch(
	() => props.imageUrl,
	(val) => {
		srcImage.value = val ? val + `?t=${new Date().getTime()}` : '/user-default.png';
	},
	{ immediate: true },
);

const showUploader = ref(false);
const updateUploader = (val) => (showUploader.value = val);

async function successUpload(res) {
	showUploader.value = false;
	srcImage.value = res.image.image_url + `?t=${new Date().getTime()}`;
	emit('image-uploaded', res.image);
}
</script>
<style lang=""></style>
