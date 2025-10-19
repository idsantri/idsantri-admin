<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data Wali" :is-new="isNew" />
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
					<q-carousel-slide name="others" class="no-wrap flex-center">
						<CarouselOthers v-model="inputs" />
					</q-carousel-slide>
				</q-carousel>
			</q-card-section>

			<!-- page -->
			<q-card-section class="q-pa-sm bg-green-11">
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

			<FormActions
				:btn-delete="true"
				:label-delete="isNew ? 'Reset' : 'Hapus'"
				@onDelete="resetOrDelete"
			/>
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import waliStore from 'src/stores/wali-store';
import dialogStore from 'src/stores/dialog-store';
import santriStore from 'src/stores/santri-store';
import ortuStore from 'src/stores/ortu-store';
import { notifyWarning } from 'src/utils/notify';
import CarouselAlamat from 'src/components/forms/carousel/CarouselAlamat.vue';
import CarouselIdentity from './carousel/WaliIdentity.vue';
import CarouselOthers from './carousel/WaliOthers.vue';
import Wali from 'src/models/Wali';

const router = useRouter();
const { wali } = reactive(waliStore());
const { isNew } = reactive(waliStore());
const { ortu, isNew: newOrtu } = reactive(ortuStore());
const {
	isNew: newSantri,
	ortu: ortuSantri,
	inputs: inputsSantri,
} = santriStore();
const loadingCrud = ref(false);
const inputs = ref({});

onMounted(() => {
	if (isNew && newSantri && newOrtu && ortuSantri.ayah == ortu.ayah) {
		if (ortu.a_hidup) {
			wali.nama = ortu.ayah;
			wali.nik = ortu.a_nik;
			wali.tmp_lahir = ortu.a_tmp_lahir;
			wali.tgl_lahir = ortu.a_tgl_lahir;
			wali.pa_formal_tingkat = ortu.a_pa_formal_tingkat;
			wali.pa_diniyah_tingkat = ortu.a_pa_diniyah_tingkat;
			wali.pekerjaan = ortu.a_pekerjaan;
		}

		wali.provinsi = inputsSantri.provinsi;
		wali.kabupaten = inputsSantri.kabupaten;
		wali.kecamatan = inputsSantri.kecamatan;
		wali.desa = inputsSantri.desa;
		wali.rt = inputsSantri.rt;
		wali.rw = inputsSantri.rw;
		wali.jl = inputsSantri.jl;
		wali.kode_pos = inputsSantri.kode_pos;

		inputs.value = { ...wali };

		let message = ortu.a_hidup
			? 'Data default diambilkan dari data santri dan ortu (ayah).'
			: 'Data alamat diambilkan dari data santri.';
		message += '<br/><strong>Harap disesuaikan!</strong>';
		notifyWarning(message);
	}
});

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
	delete data.santri;

	try {
		loadingCrud.value = true;
		const response = isNew
			? await Wali.create({ data })
			: await Wali.update({
					id: wali.id,
					data,
					confirm: true,
				});
		if (response) {
			waliStore().setWali(response.wali);
			dialogStore().toggleCrudWali(false);
			dialogStore().toggleSearchWali(false);

			if (isNew) {
				santriStore().setWaliId(wali.id);
			}
		}
	} finally {
		loadingCrud.value = false;
	}
};

const resetOrDelete = async () => {
	if (isNew) {
		inputs.value = { ...wali };
		return;
	}

	try {
		loadingCrud.value = true;
		const response = await Wali.remove({
			id: wali.id,
			message: `<span style="color:red">Hapus Wali?</span><br/><br/>
			<hr/><em>Pastikan yang bersangkutan tidak memiliki anak!</em><hr/>`,
		});
		if (response) {
			dialogStore().toggleCrudWali(false);
			router.push('/cari/wali');
		}
	} finally {
		loadingCrud.value = false;
	}
};

const slide = ref('identity');
const toggleOptions = [
	{
		label: 1,
		value: 'identity',
	},
	{
		label: 2,
		value: 'alamat',
	},
	{
		label: 2,
		value: 'others',
	},
];
</script>
