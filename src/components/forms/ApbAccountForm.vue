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
					ref="firstInput"
				/>
				<InputSelectAccountGroup
					class="q-my-sm"
					v-model="inputs.group"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Nama Akun"
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
import ApbAccount from 'src/models/ApbAccount';
import InputSelectAccountGroup from 'src/components/inputs/InputSelectAccountGroup.vue';

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

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(ApbAccount, {
	emit: emit,
	responseKey: 'account',
});

const onSubmit = async () => {
	const data = {
		id: inputs.value.id,
		group: inputs.value.group,
		name: inputs.value.name,
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
