<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader title="Input Kabupaten/Kota" :is-new="isNew" />
			<FormLoading v-if="loadingCrud" />
			<q-card-section>
				<q-input
					v-model="input.provinsi_id"
					name="provinsi_id"
					dense
					class=""
					outlined
					required
					label="Kode Provinsi"
					:rules="[(val) => !!val || 'Harus diisi!']"
					readonly=""
				/>
				<q-input
					v-model="input.id"
					name="id"
					dense
					class="q-mt-sm"
					outlined
					required
					label="Kode Kabupaten/Kota"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) =>
							/^[a-zA-Z0-9]+$/.test(val) ||
							'Harus berisi huruf atau angka!',
					]"
				/>
				<q-input
					v-model="input.kabupaten"
					name="kabupaten"
					dense
					class="q-mt-sm"
					outlined
					required
					label="Nama Kabupaten/Kota"
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

const input = ref({});
const loadingCrud = ref(false);
const isNew = !props.data?.id;

onMounted(async () => {
	Object.assign(input.value, props.data);
});

const submit = async (e) => {
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());

	try {
		loadingCrud.value = true;
		const response = isNew
			? await Alamat.Kabupaten.create({ data })
			: await Alamat.Kabupaten.update({
					id: props.data.id,
					data,
					confirm: true,
				});

		if (response) {
			document.getElementById('btn-close-form').click();
			emit('successSubmit', response?.kabupaten);
			if (isNew) {
				emit('successCreate', response?.kabupaten);
			} else {
				emit('successUpdate', response?.kabupaten);
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

		const result = await Alamat.Kabupaten.remove({ id });
		if (result) {
			document.getElementById('btn-close-form').click();
			emit('successDelete', id);
		}
	} finally {
		loadingCrud.value = false;
	}
};
</script>
