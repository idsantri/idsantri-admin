<template>
	<q-dialog v-model="internalShowUploader" persistent @hide="onDialogHide">
		<q-card style="width: 480px; max-width: 95vw" class="q-pa-md">
			<q-card-section class="row items-center q-pb-none">
				<div class="text-h6 text-weight-bold text-grey-9">Upload Foto / Gambar</div>
				<q-space />
				<q-btn icon="close" flat round dense v-close-popup :disable="uploading" />
			</q-card-section>

			<q-card-section class="q-pt-md">
				<!-- Step 1: Select File / Dropzone -->
				<div
					v-if="step === 1"
					class="drop-zone column items-center justify-center q-pa-xl cursor-pointer rounded-borders"
					:class="{ 'drop-zone--active': isDragging }"
					@dragover.prevent="isDragging = true"
					@dragleave.prevent="isDragging = false"
					@drop.prevent="handleDrop"
					@click="triggerFileInput"
				>
					<q-icon name="cloud_upload" size="56px" color="primary" class="q-mb-sm" />
					<div class="text-subtitle1 text-weight-medium text-grey-9 text-center">
						Klik atau tarik file gambar ke sini untuk upload
					</div>
					<div class="text-caption text-grey-6 q-mt-xs">Format: JPG, PNG, GIF (Maks 10 MB)</div>
					<input type="file" ref="fileInputRef" accept="image/*" class="hidden" @change="handleFileSelect" />
				</div>

				<!-- Step 2: Crop & Preview -->
				<div v-else-if="step === 2" class="column items-center">
					<div
						class="crop-box relative-position overflow-hidden rounded-borders bg-grey-4 cursor-move shadow-2"
						:style="{ width: previewW + 'px', height: previewH + 'px' }"
						@mousedown="startDrag"
						@mousemove="onDrag"
						@mouseup="stopDrag"
						@mouseleave="stopDrag"
						@touchstart.prevent="startDrag"
						@touchmove.prevent="onDrag"
						@touchend.prevent="stopDrag"
					>
						<canvas
							ref="canvasRef"
							:width="previewW"
							:height="previewH"
							class="full-width full-height"
						></canvas>
					</div>

					<div class="text-caption text-grey-7 q-mt-sm text-center">
						Tarik gambar untuk geser posisi, atau gunakan slider di bawah untuk zoom.
					</div>

					<!-- Zoom controls -->
					<div class="row items-center q-gutter-x-sm q-mt-sm full-width" style="max-width: 340px">
						<q-btn icon="zoom_out" flat round dense size="sm" @click="adjustZoom(-0.1)" />
						<q-slider
							v-model="zoom"
							:min="0.2"
							:max="3"
							:step="0.05"
							class="col"
							color="primary"
							@update:model-value="drawCanvas"
						/>
						<q-btn icon="zoom_in" flat round dense size="sm" @click="adjustZoom(0.1)" />
						<q-btn
							icon="restart_alt"
							flat
							round
							dense
							size="sm"
							@click="resetImagePosition"
							title="Reset Posisi"
						/>
					</div>
				</div>

				<!-- Step 3: Uploading State -->
				<div v-else-if="step === 3" class="column items-center justify-center q-py-lg">
					<q-spinner-dots color="primary" size="50px" />
					<div class="text-subtitle1 q-mt-md text-weight-medium text-grey-8">
						Mengunggah {{ uploadProgress }}%...
					</div>
					<q-linear-progress
						:value="uploadProgress / 100"
						color="primary"
						stripe
						animated
						class="q-mt-sm full-width"
						style="height: 8px; border-radius: 4px"
					/>
				</div>
			</q-card-section>

			<!-- Actions -->
			<q-card-actions align="right" class="q-pt-sm">
				<q-btn v-if="step === 1" label="Batal" flat color="grey-7" no-caps v-close-popup />
				<q-btn
					v-if="step === 2"
					label="Pilih Gambar Lain"
					flat
					color="grey-7"
					no-caps
					@click="step = 1"
					:disable="uploading"
				/>
				<q-btn
					v-if="step === 2"
					label="Simpan & Upload"
					color="primary"
					no-caps
					icon="cloud_upload"
					:loading="uploading"
					@click="uploadImage"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue';
import api from 'src/api';
import { useAuthStore } from 'src/stores/auth-store';
import { notifyError, notifySuccess } from 'src/utils/notify';

/**
 * ImageUploader.vue
 *
 * @deprecated This component is deprecated. Use ImageUploaderForm.vue instead.
 *
 * @description Component for uploading images with drag-and-drop, cropping, and preview functionality.
 * @props
 * - width: Number (default: 450) - The width of the output image.
 * - height: Number (default: 600) - The height of the output image.
 * - showUploader: Boolean (default: false) - Controls the visibility of the uploader dialog.
 * - url: String (default: null) - The API endpoint to upload the image.
 * - imgFormat: String (default: 'jpg') - The format of the output image ('jpg' or 'png').
 * - fieldImage: String (default: 'image') - The field name for the image in the form data.
 * @emits
 * - updateUploader: Emitted when the uploader visibility changes.
 * - successUpload: Emitted when the image is successfully uploaded.
 * - update:showUploader: Emitted when the showUploader prop is updated.
 * - update:modelValue: Emitted when the model value is updated.
 */

const props = defineProps({
	width: { type: Number, default: 450 },
	height: { type: Number, default: 600 },
	showUploader: { type: Boolean, default: false },
	url: { type: String, default: null },
	imgFormat: { type: String, default: 'jpg' },
	fieldImage: { type: String, default: 'image' },
});

const emit = defineEmits(['updateUploader', 'successUpload', 'update:showUploader', 'update:modelValue']);

const token = computed(() => useAuthStore().token || '');
const internalShowUploader = ref(false);

const step = ref(1); // 1: select, 2: crop, 3: uploading
const isDragging = ref(false);
const fileInputRef = ref(null);
const canvasRef = ref(null);

const loadedImage = ref(null);
const zoom = ref(1);
const offsetX = ref(0);
const offsetY = ref(0);
const isMouseDown = ref(false);
const dragStart = { x: 0, y: 0 };

const uploading = ref(false);
const uploadProgress = ref(0);

// Preview box dimensions (aspect ratio preserved, max height 320px)
const previewW = computed(() => {
	const maxH = 320;
	const ratio = props.width / props.height;
	if (props.height > maxH) {
		return Math.round(maxH * ratio);
	}
	return props.width;
});

const previewH = computed(() => {
	const maxH = 320;
	if (props.height > maxH) {
		return maxH;
	}
	return props.height;
});

watch(
	() => props.showUploader,
	(newVal) => {
		internalShowUploader.value = newVal;
		if (newVal) {
			step.value = 1;
			resetState();
		}
	},
	{ immediate: true },
);

function onDialogHide() {
	emit('updateUploader', false);
	emit('update:showUploader', false);
	emit('update:modelValue', false);
}

function resetState() {
	loadedImage.value = null;
	zoom.value = 1;
	offsetX.value = 0;
	offsetY.value = 0;
	uploading.value = false;
	uploadProgress.value = 0;
}

function triggerFileInput() {
	fileInputRef.value?.click();
}

function handleDrop(e) {
	isDragging.value = false;
	const files = e.dataTransfer?.files;
	if (files && files.length > 0) {
		processFile(files[0]);
	}
}

function handleFileSelect(e) {
	const files = e.target.files;
	if (files && files.length > 0) {
		processFile(files[0]);
	}
}

function processFile(file) {
	if (!file.type.startsWith('image/')) {
		notifyError('File harus berupa gambar (JPG, PNG, GIF)!');
		return;
	}
	if (file.size > 10 * 1024 * 1024) {
		notifyError('Ukuran gambar melebihi 10MB!');
		return;
	}

	const reader = new FileReader();
	reader.onload = (evt) => {
		const img = new Image();
		img.onload = () => {
			loadedImage.value = img;
			step.value = 2;
			nextTick(() => {
				resetImagePosition();
			});
		};
		img.src = evt.target.result;
	};
	reader.readAsDataURL(file);
}

function resetImagePosition() {
	if (!loadedImage.value) return;
	const img = loadedImage.value;

	const scaleX = previewW.value / img.naturalWidth;
	const scaleY = previewH.value / img.naturalHeight;
	const initialScale = Math.max(scaleX, scaleY);

	zoom.value = 1;

	const scaledWidth = img.naturalWidth * initialScale;
	const scaledHeight = img.naturalHeight * initialScale;

	offsetX.value = (previewW.value - scaledWidth) / 2;
	offsetY.value = (previewH.value - scaledHeight) / 2;

	drawCanvas();
}

function adjustZoom(delta) {
	zoom.value = Math.min(3, Math.max(0.2, zoom.value + delta));
	drawCanvas();
}

function drawCanvas() {
	const canvas = canvasRef.value;
	if (!canvas || !loadedImage.value) return;

	const ctx = canvas.getContext('2d');
	const img = loadedImage.value;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const scaleX = previewW.value / img.naturalWidth;
	const scaleY = previewH.value / img.naturalHeight;
	const baseScale = Math.max(scaleX, scaleY);
	const currentScale = baseScale * zoom.value;

	const drawW = img.naturalWidth * currentScale;
	const drawH = img.naturalHeight * currentScale;

	ctx.drawImage(img, offsetX.value, offsetY.value, drawW, drawH);
}

function getEventCoords(e) {
	if (e.touches && e.touches.length > 0) {
		return { x: e.touches[0].clientX, y: e.touches[0].clientY };
	}
	return { x: e.clientX, y: e.clientY };
}

function startDrag(e) {
	isMouseDown.value = true;
	const coords = getEventCoords(e);
	dragStart.x = coords.x - offsetX.value;
	dragStart.y = coords.y - offsetY.value;
}

function onDrag(e) {
	if (!isMouseDown.value) return;
	const coords = getEventCoords(e);
	offsetX.value = coords.x - dragStart.x;
	offsetY.value = coords.y - dragStart.y;
	drawCanvas();
}

function stopDrag() {
	isMouseDown.value = false;
}

async function uploadImage() {
	if (!loadedImage.value) return;

	uploading.value = true;
	uploadProgress.value = 0;
	step.value = 3;

	try {
		const outCanvas = document.createElement('canvas');
		outCanvas.width = props.width;
		outCanvas.height = props.height;
		const outCtx = outCanvas.getContext('2d');

		const img = loadedImage.value;
		const scaleRatio = props.width / previewW.value;

		const scaleX = previewW.value / img.naturalWidth;
		const scaleY = previewH.value / img.naturalHeight;
		const baseScale = Math.max(scaleX, scaleY);
		const currentScale = baseScale * zoom.value;

		const drawW = img.naturalWidth * currentScale * scaleRatio;
		const drawH = img.naturalHeight * currentScale * scaleRatio;
		const drawX = offsetX.value * scaleRatio;
		const drawY = offsetY.value * scaleRatio;

		outCtx.drawImage(img, drawX, drawY, drawW, drawH);

		const format = props.imgFormat.toLowerCase() === 'png' ? 'image/png' : 'image/jpeg';
		const blob = await new Promise((resolve) => outCanvas.toBlob(resolve, format, 0.92));

		if (!blob) {
			throw new Error('Gagal memproses gambar');
		}

		const formData = new FormData();
		const filename = `${props.fieldImage}.${props.imgFormat.toLowerCase()}`;
		formData.append(props.fieldImage, blob, filename);

		const fullUrl = props.url?.startsWith('http') ? props.url : `${api.defaults.baseURL || ''}${props.url}`;

		const response = await api.post(fullUrl, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: token.value ? `Bearer ${token.value}` : '',
			},
			onUploadProgress: (progressEvent) => {
				if (progressEvent.total) {
					uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				}
			},
		});

		notifySuccess(response.data?.message || 'Upload gambar berhasil');
		emit('successUpload', response.data?.data || response.data);
		internalShowUploader.value = false;
		onDialogHide();
	} catch (error) {
		console.error('Upload failed:', error);
		const status = error.response?.status;
		if (status === 401) {
			notifyError('Akses ditolak (401)! Sesi telah berakhir.');
		} else {
			notifyError(error.response?.data?.message || 'Gagal mengunggah gambar ke server');
		}
		step.value = 2;
	} finally {
		uploading.value = false;
	}
}
</script>

<style scoped>
.drop-zone {
	border: 2px dashed #bdbdbd;
	background-color: #fafafa;
	transition: all 0.2s ease-in-out;
	min-height: 220px;
}
.drop-zone:hover,
.drop-zone--active {
	border-color: var(--q-primary, #1976d2);
	background-color: #e3f2fd;
}
.crop-box {
	border: 1px solid #e0e0e0;
	user-select: none;
	touch-action: none;
}
</style>
