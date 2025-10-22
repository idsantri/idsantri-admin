<template lang="">
	<q-card flat bordered class="">
		<q-card-section class="bg-green-7 no-padding">
			<q-toolbar class="no-padding no-margin">
				<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11"> Identitas </q-toolbar-title>
				<q-btn dense flat class="q-px-md q-mr-sm" no-caps="" icon="sync" color="green-2" @click="loadData" />
				<q-btn
					dense
					class="q-px-md q-mr-sm text-green-10"
					label="Edit"
					no-caps=""
					icon="edit"
					color="green-2"
					@click="crudShow = true"
				/>
			</q-toolbar>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<div v-if="loading">
				<q-spinner-cube color="green-12" size="8em" class="flex q-ma-lg q-mx-auto" />
			</div>
			<div v-else class="row">
				<div class="col-4 q-pr-sm">
					<q-img :src="aparatur?.image || '/user-default.png'" :ratio="3 / 4" alt="aparatur" />
					<q-btn
						class="q-mt-sm full-width"
						icon="upload"
						no-caps=""
						label="Foto"
						dense=""
						size="sm"
						outline=""
						color="green-10"
						@click="showUploader = true"
					/>
				</div>
				<div class="col">
					<div v-for="(value, key) in aparaturObj" :key="key">
						<div class="text-caption text-italic">
							{{ key }}
						</div>
						<div class="q-mb-sm">{{ value }}</div>
					</div>
				</div>
			</div>

			<!-- <pre>{{ personalia }}</pre> -->
		</q-card-section>
	</q-card>
	<q-dialog persistent="" v-model="crudShow">
		<PersonaliaForm :data="aparatur" @success-submit="handleSubmit" @success-delete="$router.go(-1)" />
	</q-dialog>
	<!-- modal -->
	<upload-image
		:show-uploader="showUploader"
		:url="`/images/aparatur/${route.params.id}`"
		img-format="webp"
		@update-uploader="updateUploader"
		@success-upload="successUpload"
	/>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiGet from 'src/api/api-get';
import { formatDateFull } from 'src/utils/format-date';
import UploadImage from 'src/components/ImageUploader.vue';
import PersonaliaForm from 'src/components/forms/PersonaliaForm.vue';
import { formatAlamatLengkap } from 'src/utils/format-text';

const route = useRoute();
const router = useRouter();
const aparatur = ref({});
const loading = ref(false);
const crudShow = ref(false);
const emits = defineEmits(['on-load']);

async function handleSubmit(val) {
	if (val.id == route.params.id) {
		aparatur.value = val;
		emits('on-load', aparatur.value);
	} else {
		router.push(`/personalia/${val.id}`);
	}
}

async function loadData() {
	const data = await apiGet({
		endPoint: `aparatur/${route.params.id}`,
		loading,
	});
	if (data) {
		aparatur.value = data.aparatur;
		await loadImage();
		emits('on-load', aparatur.value);
	}
}

async function loadImage() {
	const img = await apiGet({
		endPoint: `images/aparatur/${aparatur.value.id}`,
	});
	if (img) {
		aparatur.value.image = img.image_url;
	}
}

const aparaturObj = computed(() => ({
	Nama: `${aparatur.value.nama?.toUpperCase()} (${aparatur.value.sex?.toUpperCase()})`,
	Alamat: formatAlamatLengkap(
		aparatur.value.jl,
		aparatur.value.rt,
		aparatur.value.rw,
		aparatur.value.desa,
		aparatur.value.kecamatan,
		aparatur.value.kabupaten,
		aparatur.value.provinsi,
		aparatur.value.kode_pos,
	),
	Kelahiran: `${aparatur.value.tmp_lahir || '-'}, ${formatDateFull(aparatur.value.tgl_lahir)}`,
	Telepon: aparatur.value.telepon || '-',
	Email: aparatur.value.email || '-',
}));

onMounted(async () => {
	if (route.params.id) {
		await loadData();
	}
});

// uploader
const showUploader = ref(false);
const updateUploader = (value) => (showUploader.value = value);

async function successUpload() {
	showUploader.value = false;
	await loadImage();
}
</script>
<style lang=""></style>
