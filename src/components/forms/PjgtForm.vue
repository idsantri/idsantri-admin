<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data PJGT" :is-new="props.isNew" />
			<FormLoading v-if="loadingCrud" />
			<q-card-section class="no-padding">
				<q-carousel
					v-model="slide"
					transition-prev="slide-right"
					transition-next="slide-left"
					animated
					control-color="primary"
					class="full-width"
					style="height: 60vh"
					swipeable
					infinite
				>
					<q-carousel-slide
						name="identity"
						class="no-wrap flex-center"
					>
						<PjgtIdentity v-model="inputs" />
					</q-carousel-slide>

					<q-carousel-slide name="alamat" class="no-wrap flex-center">
						<carousel-alamat v-model="inputs" />
					</q-carousel-slide>

					<q-carousel-slide name="others" class="no-wrap flex-center">
						<PjgtOthers v-model="inputs" />
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
					id="btn-close-form"
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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CarouselAlamat from 'src/components/forms/carousel/CarouselAlamat.vue';
import PjgtIdentity from './carousel/PjgtIdentity.vue';
import PjgtOthers from './carousel/PjgtOthers.vue';
import UgtPjgt from 'src/models/UgtPjgt';

const loadingCrud = ref(false);

const props = defineProps({
	data: Object,
	isNew: Boolean,
});
const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const route = useRoute();
const inputs = ref({});

onMounted(async () => {
	Object.assign(inputs.value, props.data);
	if (!inputs.value.provinsi) inputs.value.provinsi = 'Jawa Timur';
});

const onSubmit = async () => {
	const data = JSON.parse(JSON.stringify(inputs.value));
	const isNew = props.isNew;
	try {
		loadingCrud.value = true;
		const response = isNew
			? await UgtPjgt.create({ data })
			: await UgtPjgt.update({
					id: route.params.id,
					data,
					confirm: true,
				});

		if (response) {
			document.getElementById('btn-close-form').click();
			emit('successSubmit', response?.pjgt);
			if (isNew) {
				emit('successCreate', response?.pjgt);
			} else {
				emit('successUpdate', response?.pjgt);
			}
		}
	} finally {
		loadingCrud.value = false;
	}
};

const handleDelete = async () => {
	try {
		loadingCrud.value = true;
		const id = route.params.id;

		const result = await UgtPjgt.remove({ id });
		if (result) {
			document.getElementById('btn-close-form').click();
			emit('successDelete', id);
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
		label: 3,
		value: 'others',
	},
];
</script>
