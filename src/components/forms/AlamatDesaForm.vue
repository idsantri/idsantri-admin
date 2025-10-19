<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader title="Input Desa/Kelurahan" :is-new="isNew" />
			<FormLoading v-if="loadingCrud" />
			<q-card-section>
				<q-input
					v-model="inputs.kecamatan_id"
					name="kecamatan_id"
					dense
					class="q-my-sm"
					outlined
					required
					label="Kode Kecamatan/Distrik"
					:rules="[(val) => !!val || 'Harus diisi!']"
					readonly=""
				/>
				<q-input
					v-model="inputs.id"
					name="id"
					dense
					class="q-my-sm"
					outlined
					required
					label="Kode Desa/Kelurahan"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) =>
							/^[a-zA-Z0-9]+$/.test(val) ||
							'Harus berisi huruf atau angka!',
					]"
				/>
				<q-input
					v-model="inputs.desa"
					name="desa"
					dense
					class="q-my-sm"
					outlined
					required
					label="Nama Desa/Kelurahan"
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
			? await Alamat.Desa.create({ data })
			: await Alamat.Desa.update({
					id: props.data.id,
					data,
					confirm: true,
				});

		if (response) {
			document.getElementById('btn-close-form').click();
			emit('successSubmit', response?.desa);
			if (isNew) {
				emit('successCreate', response?.desa);
			} else {
				emit('successUpdate', response?.desa);
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

		const result = await Alamat.Desa.remove({ id });
		if (result) {
			document.getElementById('btn-close-form').click();
			emit('successDelete', id);
		}
	} finally {
		loadingCrud.value = false;
	}
};
</script>
