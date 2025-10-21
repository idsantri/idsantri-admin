<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Izin Madrasah" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Nama"
					:model-value="inputs?.nama + ' (' + inputs?.santri_id + ')'"
					disable=""
					filled=""
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Data Kelas"
					:model-value="
						inputs?.th_ajaran_h +
						' | ' +
						inputs?.tingkat_id +
						' | ' +
						inputs?.kelas
					"
					disable=""
					filled=""
				/>
				<q-input
					dense
					:hint="
						isDate(inputs.dari_tgl)
							? formatDateFull(inputs.dari_tgl)
							: ''
					"
					class="q-my-sm"
					outlined
					label="Tanggal (M)*"
					v-model="inputs.dari_tgl"
					type="date"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Durasi (hari)*"
					v-model="inputs.durasi"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) => !val || !isNaN(val) || 'Hanya angka',
					]"
					error-color="negative"
				/>
				<input-select-array
					v-model="inputs.keperluan"
					url="keperluan-izin"
					label="Keperluan *"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<input-select-array
					v-model="inputs.keterangan"
					url="keterangan-izin"
					label="Keterangan"
					class="q-my-sm"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Catatan"
					v-model="inputs.catatan"
					autogrow=""
				/>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { formatDateFull, isDate } from 'src/utils/format-date';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import useCrudForm from './utils/useCrudForm';
import IzinMadrasah from 'src/models/IzinMadrasah';

const props = defineProps({
	data: { type: Object, required: true },
});
const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const inputs = ref({ keperluan: 'Sakit', durasi: 1 });
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(
	IzinMadrasah,
	{ emit, responseKey: 'izin_madrasah' },
);

onMounted(async () => {
	Object.assign(inputs.value, props.data);
});

const onSubmit = async () => {
	const data = {
		kelas_id: inputs.value.kelas_id,
		dari_tgl: inputs.value.dari_tgl,
		durasi: inputs.value.durasi,
		keperluan: inputs.value.keperluan,
		keterangan: inputs.value.keterangan,
		catatan: inputs.value.catatan,
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
