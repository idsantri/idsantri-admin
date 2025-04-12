<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data Personalia" :is-new="props.isNew" />
			<q-card-section class="no-padding">
				<div v-if="loadingCrud" style="height: 70vh">
					<q-dialog v-model="loadingCrud" persistent="">
						<q-spinner-cube
							color="green-12"
							size="8em"
							class="flex q-ma-lg q-mx-auto"
						/>
					</q-dialog>
				</div>

				<q-carousel
					v-else
					v-model="slide"
					transition-prev="slide-right"
					transition-next="slide-left"
					animated
					control-color="primary"
					class="full-width"
					style="height: 70vh"
					swipeable
					infinite
				>
					<!-- identitas -->
					<q-carousel-slide
						:name="carousel.identitas.button"
						class="no-wrap flex-center"
					>
						<div class="text-subtitle2">
							{{ carousel.identitas.title }}
						</div>
						<q-input
							dense
							:hint="
								isNew
									? 'Kosongkan jika ingin diisi otomatis!'
									: ''
							"
							class="q-mt-sm"
							outlined
							label="ID"
							v-model="input.id"
							:rules="[
								(val) => !val || !isNaN(val) || 'Hanya angka!',
							]"
							error-color="negative"
						/>
						<q-input
							dense
							hint=""
							class="q-mt-sm"
							outlined
							label="Nama*"
							v-model="input.nama"
							:rules="[
								(val) => !!val || 'Harus diisi!',
								(val) =>
									val?.length >= 3 || 'Setidaknya 3 huruf!',
							]"
							error-color="negative"
							autocapitalize="words"
						/>

						<q-input
							dense
							hint=""
							class="q-mt-sm"
							outlined
							label="Nomor Induk Kependudukan"
							v-model="input.nik"
							:rules="[
								(val) =>
									!val ||
									(val?.length == 16 && !isNaN(val)) ||
									'16 digit angka!',
							]"
							error-color="negative"
						/>
						<input-select-kota-lahir
							@emit-input="
								(val) => (input.tmp_lahir = val.tmp_lahir)
							"
							:data="input"
						/>

						<q-input
							dense
							:hint="
								isDate(input.tgl_lahir)
									? formatDateFull(input.tgl_lahir) +
										' | ' +
										bacaHijri(m2h(input.tgl_lahir))
									: ''
							"
							class="q-mt-sm"
							outlined
							label="Tanggal Lahir"
							v-model="input.tgl_lahir"
							type="date"
						/>

						<q-select
							dense
							:hint="
								input.sex == 'L'
									? 'Laki-Laki'
									: input.sex == 'P'
										? 'Perempuan'
										: ''
							"
							class="q-mt-sm"
							outlined
							label="Jenis Kelamin"
							v-model="input.sex"
							:options="['L', 'P']"
							emit-value
							map-options
							error-color="negative"
							behavior="menu"
						/>
						<!-- <pre>{{ personalia }}</pre> -->
					</q-carousel-slide>

					<!-- alamat -->
					<q-carousel-slide
						:name="carousel.alamat.button"
						class="no-wrap flex-center"
					>
						<carousel-alamat
							@emit-input="(val) => Object.assign(input, val)"
							:data="input"
						/>
					</q-carousel-slide>

					<!-- lain-lain -->
					<q-carousel-slide
						:name="carousel.others.button"
						class="no-wrap flex-center"
					>
						<div class="text-subtitle2">
							{{ carousel.others.title }}
						</div>
						<input-select-array
							v-model="input.pa_formal"
							url="pendidikan-akhir-formal"
							label="Pendidikan Akhir Formal"
							class="q-mt-sm"
							hint=""
						/>
						<input-select-array
							v-model="input.pa_diniyah"
							url="pendidikan-akhir-diniyah"
							label="Pendidikan Akhir Diniyah"
							class="q-mt-sm"
							hint=""
						/>

						<q-input
							dense
							hint="08123456789"
							class="q-mt-sm"
							outlined
							label="Telepon"
							v-model="input.telepon"
							:rules="[
								(val) => !val || !isNaN(val) || 'Hanya angka!',
							]"
							error-color="negative"
						/>
						<q-input
							dense
							hint=""
							class="q-mt-sm"
							outlined
							label="Email"
							v-model="input.email"
						/>
					</q-carousel-slide>
				</q-carousel>
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<div class="row justify-center">
					<q-btn-toggle
						toggle-color="green-10"
						text-color="text-green-11"
						no-caps=""
						glossy
						v-model="slide"
						:options="toggleOptions"
					/>
				</div>
			</q-card-section>
			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="!$props.isNew"
					label="Hapus"
					class="bg-red text-red-1"
					no-caps=""
					@click="handleDelete"
				/>
				<q-space />
				<q-btn
					label="Tutup"
					v-close-popup
					class="bg-green-11"
					no-caps=""
					id="btn-close-santri-crud"
				/>
				<q-btn
					type="submit"
					label="Simpan"
					class="bg-green-10 text-green-11"
					no-caps=""
				/>
			</q-card-actions>
		</q-form>
		<!-- <pre>{{ $props.isNew }}</pre>
		<pre>{{ $props.dataPersonalia }}</pre> -->
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiDelete from 'src/api/api-delete';
import apiUpdate from 'src/api/api-update';
import apiPost from 'src/api/api-post';
import { formatDateFull, isDate } from 'src/utils/format-date';
import { bacaHijri, m2h } from 'src/utils/hijri';
import CarouselAlamat from 'src/components/alamat/CarouselAlamat.vue';
import InputSelectKotaLahir from 'src/components/inputs/InputSelectKotaLahir.vue';
import FormHeader from 'src/components/forms/FormHeader.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	dataAparatur: Object,
	isNew: Boolean,
});
const emit = defineEmits(['successSubmit', 'successDelete']);

const router = useRouter();
const route = useRoute();
const input = ref({});

const loadingCrud = ref(false);

onMounted(async () => {
	Object.assign(input.value, props.dataAparatur);
});

const onSubmit = async () => {
	const data = JSON.parse(JSON.stringify(input.value));
	delete data.image;
	delete data.aktif;
	let response = null;
	if (props.isNew) {
		response = await apiPost({
			endPoint: 'aparatur',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `aparatur/${route.params.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}

	if (response) {
		emit('successSubmit', response?.aparatur);
	}
};

const handleDelete = async () => {
	const result = await apiDelete({
		endPoint: `aparatur/${route.params.id}`,
		loading: loadingCrud,
	});
	if (result) {
		router.push('/personalia');
	}
};

const carousel = {
	identitas: {
		title: 'Identitas Diri',
		button: '1',
	},
	alamat: {
		title: 'Data Alamat',
		button: '2',
	},
	others: {
		title: 'Lain-Lain',
		button: '3',
	},
};
const slide = ref(carousel.identitas.button);
const toggleOptions = [
	{
		label: carousel.identitas.button,
		value: carousel.identitas.button,
	},
	{
		label: carousel.alamat.button,
		value: carousel.alamat.button,
	},
	{
		label: carousel.others.button,
		value: carousel.others.button,
	},
];
</script>
