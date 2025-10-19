<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader title="Input Provinsi" :is-new="isNew" />
			<FormLoading v-if="loadingCrud" />

			<q-card-section>
				<q-input
					v-model="inputs.id"
					name="id"
					dense
					class="q-my-sm"
					outlined
					required
					label="Kode Provinsi"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) =>
							/^[a-zA-Z0-9]+$/.test(val) ||
							'Harus berisi huruf atau angka!',
					]"
				/>
				<q-input
					v-model="inputs.provinsi"
					name="provinsi"
					dense
					class="q-my-sm"
					outlined
					required
					label="Nama Provinsi"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import Alamat from 'src/models/Alamat';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
});

const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const inputs = ref({});
const loadingCrud = ref(false);
const isNew = !props.data?.id;

onMounted(async () => {
	Object.assign(inputs.value, props.data);
});

const submit = async (e) => {
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());

	try {
		loadingCrud.value = true;
		const response = isNew
			? await Alamat.Provinsi.create({ data })
			: await Alamat.Provinsi.update({
					id: props.data.id,
					data,
					confirm: true,
				});

		if (response) {
			document.getElementById('btn-close-form').click();
			emit('successSubmit', response?.provinsi);
			if (isNew) {
				emit('successCreate', response?.provinsi);
			} else {
				emit('successUpdate', response?.provinsi);
			}
		}
	} finally {
		loadingCrud.value = false;
	}
};

const onDelete = async () => {
	try {
		loadingCrud.value = true;
		const id = props.data.id;

		const result = await Alamat.Provinsi.remove({ id });
		if (result) {
			document.getElementById('btn-close-form').click();
			emit('successDelete', id);
		}
	} finally {
		loadingCrud.value = false;
	}
};
</script>
