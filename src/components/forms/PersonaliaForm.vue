<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data Personalia" :is-new="isNew" />
			<FormLoading v-if="loading" />
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
						<PersonaliaIdentity v-model="inputs" />
					</q-carousel-slide>

					<!-- alamat -->
					<q-carousel-slide name="alamat" class="no-wrap flex-center">
						<CarouselAlamat v-model="inputs" @emit-route="null" />
					</q-carousel-slide>

					<!-- lain-lain -->
					<q-carousel-slide name="others" class="no-wrap flex-center">
						<PersonaliaOthers v-model="inputs" />
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
			<FormActions
				:btn-delete="isNew ? false : true"
				@on-delete="onDelete"
			/>
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import CarouselAlamat from 'src/components/forms/carousel/CarouselAlamat.vue';
import PersonaliaIdentity from './carousel/PersonaliaIdentity.vue';
import PersonaliaOthers from './carousel/PersonaliaOthers.vue';
import Aparatur from 'src/models/Aparatur';
import useCrudForm from './utils/useCrudForm';

const props = defineProps({
	data: Object,
});
const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const inputs = ref({ ...props.data });
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(
	Aparatur,
	{
		emit: emit,
		responseKey: 'aparatur',
	},
);

const onSubmit = async () => {
	const data = JSON.parse(JSON.stringify(inputs.value));
	delete data.image;
	delete data.aktif;

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
