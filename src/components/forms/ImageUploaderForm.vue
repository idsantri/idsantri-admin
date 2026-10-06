<template>
	<q-card style="width: 425px">
		<q-form @submit.prevent="cropAndUpload">
			<FormHeader title="Upload Foto" :is-new="false" />
			<FormLoading v-if="loading" />

			<!-- input galeri -->
			<input ref="fileInput" type="file" accept="image/*" @change="onFileSelect" class="tw:hidden" />
			<!-- fallback kamera (dipakai jika getUserMedia tidak tersedia, mis. HTTP non-localhost) -->
			<input
				ref="cameraInput"
				type="file"
				accept="image/*"
				:capture="facingMode"
				@change="onFileSelect"
				class="tw:hidden"
			/>

			<q-card-section class="q-pa-sm">
				<!-- Pratinjau + tombol pilih sumber -->
				<div
					v-if="!showCropper && !cameraActive"
					:style="{ aspectRatio: aspectRatio }"
					class="tw:relative tw:w-full tw:overflow-hidden tw:rounded-lg tw:bg-gray-200"
				>
					<img v-if="previewUrl" :src="previewUrl" alt="Foto" class="tw:w-full tw:h-full tw:object-cover" />

					<div class="tw:absolute tw:inset-0 tw:flex tw:items-center tw:justify-center tw:gap-4">
						<ButtonUploader label="Galeri" icon="sym_o_image" @click="selectFile" />
						<ButtonUploader label="Kamera" icon="sym_o_photo_camera" @click="openCamera" />
					</div>
				</div>

				<!-- Kamera langsung -->
				<div v-if="cameraActive" class="tw:relative tw:w-full">
					<video
						ref="videoEl"
						autoplay
						playsinline
						muted
						class="tw:w-full tw:rounded-md tw:bg-black tw:max-h-[60vh]"
						:class="{ 'tw:scale-x-[-1]': isMirrored }"
					></video>

					<!-- Gradient gelap di bawah agar tombol menyatu -->
					<div
						class="tw:absolute tw:inset-x-0 tw:bottom-0 tw:h-32 tw:rounded-b-lg tw:bg-linear-to-t tw:from-black/70 tw:to-transparent tw:pointer-events-none"
					></div>

					<!-- Tombol shutter ala kamera native -->
					<button
						type="button"
						class="tw:absolute tw:bottom-5 tw:left-1/2 tw:-translate-x-1/2 tw:w-16 tw:h-16 tw:rounded-full tw:bg-white/20 tw:border-2 tw:border-white/40 tw:shadow-lg tw:backdrop-blur active:tw:scale-90 tw:transition-transform"
						@click="capturePhoto"
					>
						<q-icon name="sym_o_photo_camera" size="28px" class="tw:text-white/75" />
					</button>

					<!-- Opsional: tombol putar kamera di kanan -->
					<button
						type="button"
						class="tw:absolute tw:bottom-8 tw:right-6 tw:w-11 tw:h-11 tw:rounded-full tw:bg-white/20 tw:text-white tw:backdrop-blur hover:tw:bg-white/30 disabled:tw:opacity-40 disabled:tw:pointer-events-none"
						:disabled="disableSwitchCamera"
						@click="switchCamera"
					>
						<q-icon name="sym_o_cameraswitch" size="22px" />
					</button>
				</div>

				<!-- Cropper -->
				<div v-if="showCropper">
					<Cropper
						ref="imgCropper"
						:src="selectedImage"
						:stencil-props="stencilProps"
						image-restriction="stencil"
						class="tw:h-96 tw:max-h-[50vh]"
					/>

					<div class="row items-center no-wrap q-gutter-x-sm q-mt-xs">
						<q-btn flat dense round icon="sym_o_rotate_left" @click="rotateBy(-90)" />
						<q-slider
							:model-value="tilt"
							:min="-45"
							:max="45"
							:step="0.5"
							label
							:label-value="`${tilt}°`"
							class="col"
							@update:model-value="onTilt"
						/>
						<q-btn flat dense round icon="sym_o_rotate_right" @click="rotateBy(90)" />
					</div>
				</div>
			</q-card-section>

			<FormActions :btn-delete="true" icon-delete="sync" label-delete="Batal" @on-delete="resetView" />
		</q-form>
	</q-card>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { notifyError, notifyWarning } from '@/utils/notify';
import Image from '@/models/Image';
import ButtonUploader from './parts/ButtonUploader.vue';

// ----- PROPS & EMITS -----
const props = defineProps({
	ownerId: {
		type: [String, Number],
		required: true,
	},
	ownerType: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	// lebar / tinggi, mis. 3 / 4 (potret), 1 (persegi), 16 / 9 (lanskap)
	aspectRatio: {
		type: Number,
		default: 3 / 4,
	},
	// ukuran file maksimal hasil cropping, dalam KB (1024 KB = 1 MB)
	maxFileSize: {
		type: Number,
		default: 1024,
	},
});
const emit = defineEmits(['upload-success', 'upload-error']);

// ----- STATE -----
const MAX_DIMENSION = 1024; // sisi terpanjang maksimal (px)
const MIN_DIMENSION = 200; // batas bawah saat kompresi agresif (px)
const stencilProps = computed(() => ({ aspectRatio: props.aspectRatio }));
const facingMode = ref('user'); // 'user' = depan, 'environment' = belakang
const isMirrored = ref(true);
const hasMultipleCameras = ref(false);
const switching = ref(false);
const disableSwitchCamera = computed(() => switching.value || !hasMultipleCameras.value);
const fileInput = ref(null);
const cameraInput = ref(null);
const videoEl = ref(null);
const imgCropper = ref(null);
const selectedImage = ref(null);
const showCropper = ref(false);
const cameraActive = ref(false);
const previewUrl = ref(props.imageUrl);
const loading = ref(false);

let stream = null;

const selectFile = () => fileInput.value.click();
onMounted(async () => {
	// await nextTick();
	// selectFile();
});
onBeforeUnmount(stopStream);

// ---------- Kamera ----------
async function startStream(facing) {
	// hentikan stream sebelumnya jika ada
	stopStream();
	stream = await navigator.mediaDevices.getUserMedia({
		video: {
			facingMode: { ideal: facing },
			width: { ideal: 1280 },
			height: { ideal: 1280 },
		},
		audio: false,
	});

	// Pakai nilai aktual dari perangkat; webcam desktop biasanya tidak melaporkannya
	const settings = stream.getVideoTracks()[0]?.getSettings() ?? {};
	isMirrored.value = settings.facingMode ? settings.facingMode === 'user' : facing === 'user';
	facingMode.value = facing;

	if (videoEl.value) videoEl.value.srcObject = stream;
}

async function openCamera() {
	// getUserMedia hanya tersedia di HTTPS atau localhost
	if (!navigator.mediaDevices?.getUserMedia) {
		cameraInput.value.click();
		return;
	}

	try {
		await startStream(facingMode.value);
		cameraActive.value = true;
		await nextTick();
		videoEl.value.srcObject = stream;

		// Setelah izin diberikan, daftar perangkat sudah lengkap
		const devices = await navigator.mediaDevices.enumerateDevices();
		hasMultipleCameras.value = devices.filter((d) => d.kind === 'videoinput').length > 1;
	} catch (error) {
		console.error('Camera error:', error);
		stopStream();
		if (error.name === 'NotAllowedError') {
			notifyWarning('Izin kamera ditolak. Aktifkan izin kamera di browser.');
		} else if (error.name === 'NotFoundError') {
			notifyWarning('Kamera tidak ditemukan pada perangkat ini.');
		} else {
			notifyWarning('Tidak dapat mengakses kamera.');
		}
	}
}

async function switchCamera() {
	if (switching.value) return;
	switching.value = true;

	const next = facingMode.value === 'user' ? 'environment' : 'user';
	try {
		await startStream(next);
	} catch (error) {
		console.error('Switch camera error:', error);
		notifyWarning('Gagal berpindah kamera.');
		// pulihkan kamera sebelumnya; jika gagal juga, tutup kamera
		try {
			await startStream(facingMode.value);
		} catch {
			stopCamera();
		}
	} finally {
		switching.value = false;
	}
}

function capturePhoto() {
	const video = videoEl.value;
	if (!video || !video.videoWidth) {
		notifyWarning('Kamera belum siap, coba lagi.');
		return;
	}

	const canvas = document.createElement('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

	selectedImage.value = canvas.toDataURL('image/jpeg', 0.92);
	stopCamera();
	showCropper.value = true;
}

function stopStream() {
	if (stream) {
		stream.getTracks().forEach((track) => track.stop());
		stream = null;
	}
}

function stopCamera() {
	stopStream();
	cameraActive.value = false;
}

function resetView() {
	stopCamera();
	showCropper.value = false;
}

// ---------- Rotasi & Tilt ----------
const tilt = ref(0); // sudut penyesuaian halus (derajat)

function rotateBy(deg) {
	imgCropper.value?.rotate(deg);
}

function onTilt(val) {
	const delta = val - tilt.value; // rotate() relatif, jadi kirim selisihnya
	tilt.value = val;
	imgCropper.value?.rotate(delta);
}

// Cropper dibuat ulang setiap gambar baru, jadi slider ikut di-reset
watch([selectedImage, showCropper], () => {
	tilt.value = 0;
});

// ---------- File ----------
const onFileSelect = (event) => {
	const file = event.target.files[0];
	if (!file) return;

	if (!file.type.startsWith('image/')) {
		notifyWarning('Harap pilih file gambar yang valid');
		event.target.value = '';
		return;
	}

	const reader = new FileReader();
	reader.onload = (e) => {
		selectedImage.value = e.target.result;
		showCropper.value = true;
		// agar file yang sama bisa dipilih ulang
		event.target.value = '';
	};
	reader.readAsDataURL(file);
};

// ---------- Resize & Compress ----------
function resizeCanvas(source, width, height) {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	canvas.getContext('2d').drawImage(source, 0, 0, width, height);
	return canvas;
}

function canvasToBlob(canvas, quality) {
	return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
}

const toBlob = async (inputCanvas) => {
	const maxBytes = props.maxFileSize * 1024;
	let canvas = inputCanvas;

	// 1) Batasi dimensi (sisi terpanjang)
	const longest = Math.max(canvas.width, canvas.height);
	if (longest > MAX_DIMENSION) {
		const ratio = MAX_DIMENSION / longest;
		canvas = resizeCanvas(canvas, Math.round(canvas.width * ratio), Math.round(canvas.height * ratio));
	}

	// 2) Turunkan kualitas JPEG bertahap, lalu kecilkan dimensi jika masih terlalu besar
	let quality = 0.9;
	let blob = await canvasToBlob(canvas, quality);

	while (blob.size > maxBytes) {
		if (quality > 0.5) {
			quality = Math.round((quality - 0.1) * 10) / 10;
		} else {
			const w = Math.round(canvas.width * 0.85);
			const h = Math.round(canvas.height * 0.85);
			if (Math.max(w, h) < MIN_DIMENSION) break;
			canvas = resizeCanvas(canvas, w, h);
		}
		blob = await canvasToBlob(canvas, quality);
	}

	return { blob, finalCanvas: canvas };
};

// ---------- Upload ----------
const cropAndUpload = async () => {
	if (!imgCropper.value) {
		notifyError('Gagal upload avatar. Silakan coba lagi. #1');
		return;
	}

	const { canvas } = imgCropper.value.getResult();
	if (!canvas) {
		notifyError('Gagal upload avatar. Silakan coba lagi. #2');
		return;
	}

	loading.value = true;

	try {
		const { blob, finalCanvas } = await toBlob(canvas);

		if (blob.size > props.maxFileSize * 1024) {
			notifyWarning(`Ukuran file tidak bisa dikecilkan hingga di bawah ${props.maxFileSize} KB.`);
			return;
		}

		const formData = new FormData();
		formData.append('image', blob, 'avatar.jpg');

		const data = await Image.create(props.ownerType, props.ownerId, formData);

		previewUrl.value = finalCanvas.toDataURL('image/jpeg', 0.8);
		showCropper.value = false;
		emit('upload-success', data.image);
	} catch (error) {
		console.error('Upload error:', error);
		emit('upload-error', error);
	} finally {
		loading.value = false;
	}
};
</script>
