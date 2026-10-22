<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Emaal" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					class="q-my-sm"
					dense
					outlined
					label="Nama"
					:model-value="inputs?.nama + ' (' + inputs?.santri_id + ')'"
					disable=""
					filled=""
				/>
				<q-input
					class="q-my-sm"
					dense
					outlined
					label="Nomor Emaal"
					v-model="inputs.no_emaal"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) => (val && val.length === 16) || 'Harus 16 karakter!',
						(val) => (val && /^\d+$/.test(val)) || 'Hanya angka!',
					]"
				/>
				<q-input class="q-my-sm" dense outlined label="Keterangan" v-model="inputs.keterangan" autogrow="" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import useCrudForm from './utils/useCrudForm';
import Emaal from 'src/models/Emaal';

const props = defineProps({
	data: { type: Object, required: true },
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const isNew = !props.data?.id;
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(Emaal, {
	emit: emit,
	responseKey: 'emaal',
});

const onSubmit = async () => {
	const data = {
		santri_id: inputs.value.santri_id,
		no_emaal: inputs.value.no_emaal,
		keterangan: inputs.value.keterangan,
	};

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
