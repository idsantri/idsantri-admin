<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Transaksi" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Keterangan"
					v-model="inputs.description"
					autogrow=""
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Atas Nama"
					v-model="inputs.by_name"
					autogrow=""
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input dense class="q-my-sm" outlined label="Catatan" v-model="inputs.note" autogrow="" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import useCrudForm from './utils/useCrudForm';
import ApbTransaction from 'src/models/ApbTransaction';

const props = defineProps({
	data: { type: Object, required: true },
});
const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(ApbTransaction, {
	emit: emit,
	responseKey: 'transaction',
});

const onSubmit = async () => {
	const data = {
		description: inputs.value.description,
		by_name: inputs.value.by_name,
		note: inputs.value.note,
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
