<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data Santri" :is-new="isNew" />
			<FormLoading v-if="loadingCrud" />
			<q-card-section class="no-padding">
				<q-carousel
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
						name="register"
						class="no-wrap flex-center"
					>
						<CarouselRegister v-model="inputs" />
					</q-carousel-slide>

					<!-- identitas -->
					<q-carousel-slide
						name="identity"
						class="no-wrap flex-center"
					>
						<CarouselIdentity v-model="inputs" />
					</q-carousel-slide>

					<!-- alamat -->
					<q-carousel-slide name="alamat" class="no-wrap flex-center">
						<CarouselAlamat
							v-model="inputs"
							@emit-route="closeModal"
						/>
					</q-carousel-slide>

					<!-- pendidikan -->
					<q-carousel-slide
						name="pendidikan"
						class="no-wrap flex-center"
					>
						<CarouselPendidikanAkhir v-model="inputs" />
					</q-carousel-slide>

					<!-- ortu wali -->
					<q-carousel-slide
						name="ortu_wali"
						class="no-wrap flex-center"
					>
						<CarouselOrtuWali v-model="inputs" />
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
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dialogStore from 'src/stores/dialog-store';
import santriStore from 'src/stores/santri-store';
import CarouselRegister from './carousel/SantriRegister.vue';
import CarouselIdentity from './carousel/SantriIdentity.vue';
import CarouselAlamat from './carousel/CarouselAlamat.vue';
import CarouselPendidikanAkhir from './carousel/SantriPendidikanAkhir.vue';
import CarouselOrtuWali from './carousel/SantriOrtuWali.vue';
import Santri from 'src/models/Santri';

const emit = defineEmits(['successSubmit', 'successDelete']);
const router = useRouter();
const route = useRoute();
const { isNew } = reactive(santriStore());
const { santri } = reactive(santriStore());
const inputs = ref({ ...santri });
const loadingCrud = ref(false);

watch(
	() => santri.ortu_id,
	(value) => {
		inputs.value.ortu_id = value;
	},
);

watch(
	() => santri.wali_id,
	(value) => {
		inputs.value.wali_id = value;
	},
);

function closeModal() {
	dialogStore().toggleCrudSantri(false);
	dialogStore().toggleSearchSantri(false);

	dialogStore().toggleCrudWali(false);
	dialogStore().toggleSearchWali(false);

	dialogStore().toggleCrudOrtu(false);
	dialogStore().toggleSearchOrtu(false);
}

const onSubmit = async () => {
	const data = JSON.parse(JSON.stringify(inputs.value));
	delete data.image_url;
	delete data.data_akhir;
	delete data.alamat_lengkap;
	delete data.alamat_pendek;
	delete data.th_ajaran_h;
	delete data.th_ajaran_m;
	// console.log(data);
	// return;

	try {
		loadingCrud.value = true;
		const response = isNew
			? await Santri.create({ data })
			: await Santri.update({ id: route.params.id, data, confirm: true });
		if (response) {
			emit('successSubmit', response.santri);

			dialogStore().toggleCrudSantri(false);
			dialogStore().toggleSearchSantri(false);

			if (route.params.id != response.santri.id) {
				router.push(`/santri/${response.santri.id}`);
			} else {
				santriStore().setSantri(response.santri);
			}
		}
	} finally {
		loadingCrud.value = false;
	}
};

const resetOrDelete = async () => {
	if (isNew) {
		santriStore().setNull();
	} else {
		try {
			loadingCrud.value = true;
			const response = await Santri.remove({ id: santri.id });
			if (response) {
				emit('successDelete');

				router.push('/cari/santri');
				dialogStore().toggleCrudSantri(false);
			}
		} finally {
			loadingCrud.value = false;
		}
	}
};

const slide = ref('register');
const toggleOptions = [
	{
		label: 1,
		value: 'register',
	},
	{
		label: 2,
		value: 'identity',
	},
	{
		label: 3,
		value: 'alamat',
	},
	{
		label: 4,
		value: 'pendidikan',
	},
	{
		label: '5',
		value: 'ortu_wali',
	},
];
</script>
