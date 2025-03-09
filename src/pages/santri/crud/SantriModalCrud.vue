<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data Santri" :is-new="isNew" />
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
					<!-- registrasi -->
					<q-carousel-slide
						:name="carousel.registrasi.button"
						class="no-wrap flex-center"
					>
						<input-register :title="carousel.registrasi.title" />
					</q-carousel-slide>

					<!-- identitas -->
					<q-carousel-slide
						:name="carousel.identitas.button"
						class="no-wrap flex-center"
					>
						<input-identity :title="carousel.identitas.title" />
					</q-carousel-slide>

					<!-- alamat -->
					<q-carousel-slide
						:name="carousel.alamat.button"
						class="no-wrap flex-center"
					>
						<carousel-alamat
							@emit-input="(val) => Object.assign(santri, val)"
							@emit-route="closeModal"
							:data="santri"
						/>
						<!-- <input-alamat :title="carousel.alamat.title" /> -->
					</q-carousel-slide>

					<!-- pendidikan -->
					<q-carousel-slide
						:name="carousel.pendidikan.button"
						class="no-wrap flex-center"
					>
						<input-pendidikan-akhir
							:title="carousel.pendidikan.title"
						/>
					</q-carousel-slide>

					<!-- ortu wali -->
					<q-carousel-slide
						:name="carousel.ortu_wali.button"
						class="no-wrap flex-center"
					>
						<input-ortu-wali :title="carousel.ortu_wali.title" />
					</q-carousel-slide>
				</q-carousel>
			</q-card-section>
			<q-card-section class="q-pa-sm q-ma-sm">
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
					:label="isNew ? 'Reset' : 'Hapus'"
					class="bg-red text-red-1"
					no-caps=""
					@click="resetOrDelete"
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
	</q-card>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dialogStore from 'src/stores/dialog-store';
import santriStore from 'src/stores/santri-store';
import apiDelete from 'src/api/api-delete';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import { forceRerender } from 'src/utils/buttons-click';
import CarouselAlamat from 'src/components/CarouselAlamat.vue';
import FormHeader from 'src/components/FormHeader.vue';
import InputRegister from './SantriModalCrudRegister.vue';
import InputIdentity from './SantriModalCrudIdentity.vue';
import InputPendidikanAkhir from './SantriModalCrudPendidikanAkhir.vue';
import InputOrtuWali from './SantriModalCrudOrtuWali.vue';

const router = useRouter();
const route = useRoute();
const { santri } = reactive(santriStore());
const { isNew } = reactive(santriStore());
const loadingCrud = ref(false);
const emit = defineEmits(['successSubmit', 'successDelete']);

function closeModal() {
	dialogStore().toggleCrudSantri(false);
	dialogStore().toggleSearchSantri(false);

	dialogStore().toggleCrudWali(false);
	dialogStore().toggleSearchWali(false);

	dialogStore().toggleCrudOrtu(false);
	dialogStore().toggleSearchOrtu(false);
}

const onSubmit = async () => {
	const data = JSON.parse(JSON.stringify(santri));
	delete data.image_url;
	delete data.data_akhir;
	// console.log(data);
	// return;
	let response = null;
	if (isNew) {
		response = await apiPost({
			endPoint: 'santri',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `santri/${route.params.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		emit('successSubmit', response.santri);

		route.params.id == santri.id ? forceRerender() : null;
		dialogStore().toggleCrudSantri(false);
		dialogStore().toggleSearchSantri(false);
		router.push(`/santri/${response.santri.id}`);
	}
};

const resetOrDelete = async () => {
	if (isNew) {
		santriStore().setNull();
	} else {
		const result = await apiDelete({
			endPoint: `santri/${santri.id}`,
			message: '<span style="color:\'red\'">Hapus santri?</span>',
			loading: loadingCrud,
		});
		if (result) {
			emit('successDelete');

			router.push('/cari/santri');
			dialogStore().toggleCrudSantri(false);
		}
	}
};

const carousel = {
	registrasi: {
		title: 'Data Registrasi',
		button: '1',
	},
	identitas: {
		title: 'Identitas Diri',
		button: '2',
	},
	alamat: {
		title: 'Data Alamat',
		button: '3',
	},
	pendidikan: {
		title: 'Riwayat Pendidikan',
		button: '4',
	},
	ortu_wali: {
		title: 'Orang Tua dan Wali',
		button: '5',
	},
};
const slide = ref(carousel.registrasi.button);
const toggleOptions = [
	{
		label: carousel.registrasi.button,
		value: carousel.registrasi.button,
	},
	{
		label: carousel.identitas.button,
		value: carousel.identitas.button,
	},
	{
		label: carousel.alamat.button,
		value: carousel.alamat.button,
	},
	{
		label: carousel.pendidikan.button,
		value: carousel.pendidikan.button,
	},
	{
		label: carousel.ortu_wali.button,
		value: carousel.ortu_wali.button,
	},
];
</script>
