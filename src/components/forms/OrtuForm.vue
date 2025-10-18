<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data Orang Tua" :is-new="isNew" />
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
						<CarouselRegister v-model="inputs" />
					</q-carousel-slide>

					<!-- ayah -->
					<q-carousel-slide name="ayah" class="no-wrap flex-center">
						<CarouselAyah v-model="inputs" />
					</q-carousel-slide>

					<!-- ibu -->
					<q-carousel-slide name="ibu" class="no-wrap flex-center">
						<CarouselIbu v-model="inputs" />
					</q-carousel-slide>
				</q-carousel>
			</q-card-section>

			<q-card-section class="q-pa-sm bg-green-2">
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
					id="btn-close-ortu-crud"
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
import { useRouter } from 'vue-router';
import ortuStore from 'src/stores/ortu-store.js';
import dialogStore from 'src/stores/dialog-store';
import santriStore from 'src/stores/santri-store';
import CarouselRegister from './carousel/OrtuRegister.vue';
import CarouselAyah from './carousel/OrtuAyah.vue';
import CarouselIbu from './carousel/OrtuIbu.vue';
import Ortu from 'src/models/Ortu';

const router = useRouter();
const { ortu } = reactive(ortuStore());
const { isNew } = reactive(ortuStore());
const loadingCrud = ref(false);
const inputs = ref({ ...ortu });

const onSubmit = async () => {
	const data = JSON.parse(JSON.stringify(inputs.value));
	delete data.santri;

	try {
		loadingCrud.value = true;

		const response = isNew
			? await Ortu.create({ data })
			: await Ortu.update({
					id: ortu.id,
					data,
					confirm: true,
				});

		if (response) {
			ortuStore().setOrtu(response.ortu);
			dialogStore().toggleCrudOrtu(false);
			dialogStore().toggleSearchOrtu(false);

			if (isNew) {
				santriStore().setOrtuId(ortu.id);
			}
		}
	} finally {
		loadingCrud.value = false;
	}
};

const resetOrDelete = async () => {
	if (isNew) {
		ortuStore().setNull();
		return;
	}

	try {
		loadingCrud.value = true;
		const response = await Ortu.remove({
			id: ortu.id,
			message: `<span style="color:red">Hapus Orang Tua?</span><br/><br/>
				<hr/><em>Pastikan yang bersangkutan tidak memiliki anak!</em><hr/>`,
		});
		if (response) {
			dialogStore().toggleCrudOrtu(false);
			router.push('/cari/ortu');
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
		value: 'ayah',
	},
	{
		label: 3,
		value: 'ibu',
	},
];
</script>
