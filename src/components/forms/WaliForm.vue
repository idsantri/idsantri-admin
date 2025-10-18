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

			<!-- action -->
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
					id="btn-close-wali-crud"
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
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import waliStore from 'src/stores/wali-store';
import dialogStore from 'src/stores/dialog-store';
import santriStore from 'src/stores/santri-store';
import ortuStore from 'src/stores/ortu-store';
import apiDelete from 'src/api/api-delete';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import { notifyWarning } from 'src/utils/notify';
import { forceRerender } from 'src/utils/buttons-click';
import CarouselAlamat from 'src/components/forms/carousel/CarouselAlamat.vue';
import CarouselIdentity from './carousel/WaliIdentity.vue';
import CarouselOthers from './carousel/WaliOthers.vue';

const router = useRouter();
const { wali } = reactive(waliStore());
const { isNew } = reactive(waliStore());
const { ortu, isNew: newOrtu } = reactive(ortuStore());
const { santri, isNew: newSantri, ortu: ortuSantri } = santriStore();
const { wali_id } = toRefs(santri);
const loadingCrud = ref(false);
const inputs = ref({ ...wali });

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
		wali.provinsi = santri.provinsi;
		wali.kabupaten = santri.kabupaten;
		wali.kecamatan = santri.kecamatan;
		wali.desa = santri.desa;
		wali.rt = santri.rt;
		wali.rw = santri.rw;
		wali.jl = santri.jl;
		wali.kode_pos = santri.kode_pos;

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
	let response = null;
	if (isNew) {
		response = await apiPost({
			endPoint: 'wali',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `wali/${wali.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		if (isNew) {
			wali_id.value = response.wali.id;
		} else {
			forceRerender();
		}
		dialogStore().toggleCrudWali(false);
		dialogStore().toggleSearchWali(false);
	}
};

const resetOrDelete = async () => {
	if (isNew) {
		waliStore().setNull();
	} else {
		const result = await apiDelete({
			endPoint: `wali/${wali.id}`,
			message:
				'<span style="color:red">Hapus Wali?</span><br/><br/><hr/><em>Pastikan yang bersangkutan tidak memiliki anak!</em><hr/>',
			loading: loadingCrud,
		});
		if (result) {
			router.push('/cari/wali');
			dialogStore().toggleCrudWali(false);
		}
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
