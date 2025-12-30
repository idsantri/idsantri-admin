<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Buat Anggaran" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<InputSelectTahunAjaran
					v-model="inputs.th_ajaran_h"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
				/>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import useCrudForm from 'src/components/forms/utils/useCrudForm';
import InputSelectTahunAjaran from '../inputs/InputSelectTahunAjaran.vue';
import ApbBudget from 'src/models/ApbBudget';
import { notifyConfirm } from 'src/utils/notify';

const props = defineProps({
	data: { type: Object, required: true },
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const isNew = !props.data?.id;

const { handleDelete, handleCreate, loading } = useCrudForm(ApbBudget, {
	emit: emit,
	responseKey: 'budgets',
});

const onSubmit = async () => {
	const message = `<hr><div class="text-bold q-py-sm">Buat Anggaran?</div><hr>
		<div class="text-italic q-mt-md">
			<div>PERHATIAN:</div>
			<ul style="list-style-type: square;" class="q-ml-md">
				<li>Buat Anggaran baru untuk tahun ajaran <strong>${inputs.value.th_ajaran_h}</strong>.</li>
				<li>Akun dan Tahun Ajaran bersifat unik (no duplicate). Jika data sudah ada sebelumnya maka TIDAK akan ditimpa.</li>
				<li>Aksi ini akan menyalin seluruh akun dengan kepala 4 dan 5 (Pendapatan dan Biaya).</li>
				<li>Akun yang disembunyikan (hidden) tidak akan disertakan.</li>
			</ul>
		</div>`;

	const isConfirmed = await notifyConfirm(message);
	if (!isConfirmed) {
		return;
	}

	return await handleCreate({ th_ajaran_h: inputs.value.th_ajaran_h }, false);
};

const onDelete = async () => {
	return await handleDelete(props.data.id);
};
</script>
