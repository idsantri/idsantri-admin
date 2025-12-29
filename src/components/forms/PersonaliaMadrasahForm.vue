<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Jabatan Madrasiyah" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					dense
					outlined
					label="Nama"
					:model-value="inputs?.nama + ' (' + inputs?.aparatur_id + ')'"
					disable=""
					filled=""
					class="q-my-sm"
				/>

				<input-select-array
					v-model="inputs.jabatan"
					url="jabatan-madrasiyah"
					label="Jabatan"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					ref="firstInput"
				/>
				<InputSelectTahunAjaran
					v-model="inputs.th_ajaran_h"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
				/>

				<InputSelectTingkatPendidikan
					v-model="inputs.tingkat_id"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<input-select-array v-model="inputs.kelas" url="kelas" label="Kelas" class="q-my-sm" />

				<q-input dense class="q-my-sm" outlined label="Ruang" v-model="inputs.ruang" />
				<q-input dense class="q-my-sm" outlined label="Keterangan" v-model="inputs.keterangan" autogrow="" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import useCrudForm from './utils/useCrudForm';
import AparaturMadrasah from 'src/models/AparaturMadrasah';
import InputSelectTahunAjaran from '../inputs/InputSelectTahunAjaran.vue';

const props = defineProps({
	data: { type: Object, required: true, default: () => {} },
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const isNew = !props.data.id;
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(AparaturMadrasah, {
	emit: emit,
	responseKey: 'aparatur_madrasah',
});

const onSubmit = async () => {
	const data = {
		aparatur_id: inputs.value.aparatur_id,
		jabatan: inputs.value.jabatan,
		th_ajaran_h: inputs.value.th_ajaran_h,
		tingkat_id: inputs.value.tingkat_id,
		kelas: inputs.value.kelas,
		ruang: inputs.value.ruang,
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
