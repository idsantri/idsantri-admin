<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Buat Pengaturan Anggaran" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<InputSelectTahunAjaran
					v-model="inputs.th_ajaran_h"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
					ref="firstInput"
				/>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import InputSelectTahunAjaran from '../inputs/InputSelectTahunAjaran.vue';
import { notifyConfirm } from 'src/utils/notify';
import ApbBudgetConfig from 'src/models/ApbBudgetConfig';

const props = defineProps({
	data: { type: Object, required: true },
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const isNew = !props.data?.id;
const loading = ref(false);
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const onSubmit = async () => {
	const message = `<hr><div class="text-bold q-py-sm">Buat Pengaturan Anggaran?</div><hr>
		<div class="text-italic q-mt-md">
			<div>PERHATIAN:</div>
			<ul style="list-style-type: square;" class="q-ml-md">
				<li>Buat Pengaturan Anggaran baru untuk tahun ajaran <strong>${inputs.value.th_ajaran_h}</strong>.</li>
				<li>Grup dan Tahun Ajaran bersifat unik (no duplicate). Data yang sudah ada TIDAK akan ditimpa.</li>
				<li>Aksi ini akan menyalin seluruh grup dengan kategori Pendapatan dan Biaya.</li>
			</ul>
		</div>`;

	const isConfirmed = await notifyConfirm(message);
	if (!isConfirmed) {
		return;
	}

	try {
		loading.value = true;
		const response = await ApbBudgetConfig.create({ data: { th_ajaran_h: inputs.value.th_ajaran_h } });

		emit('successSubmit', response);
		emit('successCreate', response);
	} catch (error) {
		console.error('Error creating data:', error);
		// throw error;
	} finally {
		loading.value = false;
	}
};

const onDelete = async () => {
	return await handleDelete(props.data.id);
};
</script>
