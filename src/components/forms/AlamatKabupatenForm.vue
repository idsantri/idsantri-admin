<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Kabupaten/Kota" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					v-model="inputs.provinsi_id"
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
					v-model="inputs.id"
					name="id"
					dense
					class="q-my-sm"
					outlined
					required
					label="Kode Kabupaten/Kota"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) => /^[a-zA-Z0-9]+$/.test(val) || 'Harus berisi huruf atau angka!',
					]"
					ref="firstInput"
				/>
				<q-input
					v-model="inputs.kabupaten"
					name="kabupaten"
					dense
					class="q-my-sm"
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
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import Alamat from 'src/models/Alamat';
import useCrudForm from './utils/useCrudForm';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const isNew = !props.data?.id;
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	firstInput.value.focus();
});

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(Alamat.Kabupaten, {
	emit: emit,
	responseKey: 'kabupaten',
});

const onSubmit = async (e) => {
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());

	if (isNew) {
		return await handleCreate(data, true);
	} else {
		return await handleUpdate(props.data.id, data, true);
	}
};

const onDelete = async () => {
	return await handleDelete(props.data.id);
};
</script>
