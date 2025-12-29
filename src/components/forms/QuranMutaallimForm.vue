<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Pendidikan Quran" :is-new="isNew" />
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
				<InputSelectArray
					v-model="inputs.th_ajaran_h"
					url="tahun-ajaran"
					label="Tahun Ajaran *"
					sort="desc"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:selected="inputs.th_ajaran_h"
					ref="firstInput"
				/>
				<q-select
					dense
					outlined=""
					v-model="inputs.marhalah"
					label="Marhalah *"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:options="['Ula', 'Wustho', 'Ulya']"
				/>
				<input-select-array
					v-model="inputs.faslah"
					url="faslah-quran"
					label="Faslah/Kelas *"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<InputToggle v-model="inputs.aktif" label="Aktif" :disable="inputs.id ? false : true" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import useCrudForm from './utils/useCrudForm';
import Mutaallim from 'src/models/Mutaallim';
import InputToggle from '../inputs/InputToggle.vue';

const props = defineProps({
	data: { type: Object, required: true },
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ marhalah: 'Ula', faslah: null, no_absen: null, aktif: 1, ...props.data });
const isNew = !props.data?.id;
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(Mutaallim, {
	emit,
	responseKey: 'mutaallim',
});

const onSubmit = async () => {
	const data = {
		santri_id: inputs.value.santri_id,
		th_ajaran_h: inputs.value.th_ajaran_h,
		marhalah: inputs.value.marhalah,
		faslah: inputs.value.faslah,
		no_absen: inputs.value.no_absen,
		aktif: inputs.value.aktif,
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
