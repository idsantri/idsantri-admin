<template>
	<my-upload
		:field="fieldImage"
		langType="en"
		:langExt="translate"
		no-circle
		@crop-success="cropSuccess"
		@crop-upload-success="cropUploadSuccess"
		@crop-upload-fail="cropUploadFail"
		v-model="internalShowUploader"
		:width="props.width"
		:height="props.height"
		:url="api.defaults.baseURL + props.url"
		:params="paramsImage"
		:headers="{ Authorization: `Bearer ${token}` }"
		withCredentials
		:img-format="props.imgFormat"
	></my-upload>
</template>
<script setup>
import myUpload from 'vue-image-crop-upload';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { onUpdated, ref, watch } from 'vue';
import api from 'src/api';
import useAuthStore from 'src/stores/auth-store';

/**
 * communicate parents children
 * @props
 * @emits
 */
const props = defineProps({
	width: { type: Number, default: 450 },
	height: { type: Number, default: 600 },
	showUploader: { type: Boolean, default: false },
	url: { default: null },
	// headers: { default: null },
	imgFormat: { type: String, default: 'png' },
	fieldImage: { type: String, default: 'image' },
});
const emit = defineEmits(['updateUploader', 'successUpload']);
const token = useAuthStore().token || '';

const internalShowUploader = ref(false);
watch(
	() => props.showUploader,
	(newVal) => {
		internalShowUploader.value = newVal;
	},
);

onUpdated(() => {
	// console.log('updated');
	emit('updateUploader', internalShowUploader.value);
});

/**
 * uploader
 */
const translate = {
	hint: 'Klik atau tarik file gambar ke sini untuk upload',
	loading: 'Uploading…',
	noSupported: 'Browser is not supported, please use IE10+ or other browsers',
	success: 'Upload berhasil',
	fail: 'Upload gagal',
	preview: 'Preview',
	btn: {
		off: 'Gagal',
		close: 'Tutup',
		back: 'Kembali',
		save: 'Simpan',
	},
	error: {
		onlyImg: 'Hanya gambar',
		outOfSize: 'Gambar melebihi batas ukuran: ',
		lowestPx: 'Ukuran gambar terlalu rendah. Setidaknya diharapkan: ',
	},
};

const imgDataUrl = ref('');
const paramsImage = {};
const cropSuccess = (imgData /*, field*/) => {
	imgDataUrl.value = imgData;
	// console.log(imgData);
	// console.log(field);
};

const cropUploadSuccess = (jsonData /*, field*/) => {
	// console.log(jsonData);
	// console.log('field: ' + field);
	notifySuccess(jsonData.message);
	emit('successUpload');
};

/**
 * upload fail
 *
 * [param] status    server api return error status, like 500
 * [param] field
 */
const cropUploadFail = (status, field) => {
	console.log('upload status', status);
	console.log('upload field', field);
	if (status == 401) {
		notifyError('Akses ditolak!');
	}
};
</script>
