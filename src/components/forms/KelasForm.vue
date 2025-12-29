<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Kelas" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					dense
					outlined
					label="Nama"
					:model-value="inputs?.nama + ' (' + inputs?.santri_id + ')'"
					disable=""
					filled=""
					class="q-my-sm"
				/>
				<InputSelectTahunAjaran
					v-model="inputs.th_ajaran_h"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
					ref="firstInput"
				/>
				<InputSelectTingkatPendidikan
					v-model="inputs.tingkat_id"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<input-select-array
					v-model="inputs.kelas"
					url="kelas"
					label="Kelas *"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
				/>

				<q-input dense class="q-my-sm" outlined label="Nomor Absen" v-model="inputs.no_absen" type="number" />
				<q-input dense class="q-my-sm" outlined label="Keterangan" v-model="inputs.keterangan" autogrow="" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';
import Kelas from 'src/models/Kelas';
import useCrudForm from 'src/components/forms/utils/useCrudForm';
import InputSelectTahunAjaran from '../inputs/InputSelectTahunAjaran.vue';

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

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(Kelas, {
	emit: emit,
	responseKey: 'kelas',
});

const onSubmit = async () => {
	const data = {
		santri_id: inputs.value.santri_id,
		th_ajaran_h: inputs.value.th_ajaran_h,
		tingkat_id: inputs.value.tingkat_id,
		kelas: inputs.value.kelas,
		no_absen: inputs.value.no_absen,
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
