<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data PJGT" :is-new="isNew" />
			<FormLoading v-if="loading" />
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
					<q-carousel-slide name="identity" class="no-wrap flex-center">
						<PjgtIdentity v-model="inputs" :is-new="isNew" />
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
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import CarouselAlamat from 'src/components/forms/carousel/CarouselAlamat.vue';
import PjgtIdentity from './carousel/PjgtIdentity.vue';
import PjgtOthers from './carousel/PjgtOthers.vue';
import UgtPjgt from 'src/models/UgtPjgt';
import useCrudForm from './utils/useCrudForm';

const props = defineProps({
	data: Object,
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ provinsi: 'Jawa Timur', ...props.data });
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(UgtPjgt, {
	emit: emit,
	responseKey: 'pjgt',
});

const onSubmit = async () => {
	const data = JSON.parse(JSON.stringify(inputs.value));

	if (isNew) {
		return await handleCreate(data, true);
	} else {
		return await handleUpdate(props.data.id, data, true);
	}
};

const onDelete = async () => {
	return await handleDelete(props.data.id);
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
