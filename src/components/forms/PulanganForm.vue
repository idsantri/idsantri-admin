<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Pulangan" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<InputSelectTahunAjaran
					v-model="inputs.th_ajaran_h"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
					ref="firstInput"
				/>
				<q-select
					v-model="inputs.nama"
					label="Pulangan *"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
					dense
					outlined
					:options="['Ramadan', 'Maulid']"
				/>
				<q-input
					dense
					:hint="isDate(inputs.tgl_pulang_m) ? formatDate(inputs.tgl_pulang_m, 'cccc, dd MMMM yyyy') : ''"
					class="q-my-sm"
					outlined
					label="Tanggal Pulang (M)*"
					v-model="inputs.tgl_pulang_m"
					type="date"
					@change="
						isDate(inputs.tgl_pulang_m)
							? (inputs.tgl_pulang_h = masehiToHijri(inputs.tgl_pulang_m))
							: (inputs.tgl_pulang_h = '')
					"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
				/>
				<q-input
					dense
					:hint="inputs.tgl_pulang_h?.length ? bacaHijri(inputs.tgl_pulang_h) : ''"
					class="q-my-sm"
					outlined
					label="Tanggal Pulang (H)*"
					v-model="inputs.tgl_pulang_h"
					:rules="[(val) => !!val || 'Harus diisi!', (val) => val?.length == 8 || '8 digit angka!']"
					error-color="negative"
					mask="####-##-##"
				/>

				<q-input
					dense
					:hint="isDate(inputs.tgl_kembali_m) ? formatDate(inputs.tgl_kembali_m, 'cccc, dd MMMM yyyy') : ''"
					class="q-my-sm"
					outlined
					label="Tanggal Kembali (M)*"
					v-model="inputs.tgl_kembali_m"
					type="date"
					@change="
						isDate(inputs.tgl_kembali_m)
							? (inputs.tgl_kembali_h = masehiToHijri(inputs.tgl_kembali_m))
							: (inputs.tgl_kembali_h = '')
					"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
				/>
				<q-input
					dense
					:hint="inputs.tgl_kembali_h?.length ? bacaHijri(inputs.tgl_kembali_h) : ''"
					class="q-my-sm"
					outlined
					label="Tanggal Kembali (H)*"
					v-model="inputs.tgl_kembali_h"
					:rules="[(val) => !!val || 'Harus diisi!', (val) => val?.length == 8 || '8 digit angka!']"
					error-color="negative"
					mask="####-##-##"
				/>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';
import useCrudForm from 'src/components/forms/utils/useCrudForm';
import InputSelectTahunAjaran from '../inputs/InputSelectTahunAjaran.vue';
import Pulangan from 'src/models/PulanganConfig';
import { masehiToHijri, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDate } from 'src/utils/format-date';

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

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(Pulangan, {
	emit: emit,
	responseKey: 'pulangan',
});

const onSubmit = async () => {
	const data = {
		th_ajaran_h: inputs.value.th_ajaran_h,
		nama: inputs.value.nama,
		tgl_pulang_m: inputs.value.tgl_pulang_m,
		tgl_pulang_h: inputs.value.tgl_pulang_h,
		tgl_kembali_m: inputs.value.tgl_kembali_m,
		tgl_kembali_h: inputs.value.tgl_kembali_h,
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

watch(
	() => inputs.value.tgl_pulang_h,
	(newValue, _oldValue) => {
		if (newValue?.length) {
			inputs.value.tgl_pulang_h = newValue.replace(/-/g, '');
		}
	},
);
watch(
	() => inputs.value.tgl_kembali_h,
	(newValue, _oldValue) => {
		if (newValue?.length) {
			inputs.value.tgl_kembali_h = newValue.replace(/-/g, '');
		}
	},
);
</script>
