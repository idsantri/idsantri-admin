<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Akun" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="ID"
					v-model="inputs.id"
					autogrow=""
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Group"
					v-model="inputs.group"
					autogrow=""
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Nama"
					v-model="inputs.nama"
					autogrow=""
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import useCrudForm from './utils/useCrudForm';
import ApbAccount from 'src/models/ApbAccount';

const props = defineProps({
	data: { type: Object, required: true },
});
const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(ApbAccount, {
	emit: emit,
	responseKey: 'account',
});

const onSubmit = async () => {
	const data = {
		id: inputs.value.id,
		group: inputs.value.group,
		nama: inputs.value.nama,
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
