<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Grup Akun" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-select
					dense
					outlined
					v-model="inputs.category"
					label="Grup"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:options="['AKTIVA', 'PENDAPATAN', 'BIAYA']"
					ref="firstInput"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Nama"
					v-model="inputs.name"
					autogrow=""
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import useCrudForm from './utils/useCrudForm';
import ApbGroup from 'src/models/ApbGroup';

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

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(ApbGroup, {
	emit: emit,
	responseKey: 'group',
});

const onSubmit = async () => {
	const data = {
		id: inputs.value.id || null,
		name: inputs.value.name,
		category: inputs.value.category,
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
