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
				<input-select-array
					v-model="inputs.bulan"
					url="bulan-hijri"
					label="Bulan Hijriah *"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:input-object="true"
				/>
				<q-input dense class="q-my-sm" outlined label="Nomor Urut" v-model="inputs.urut" type="number" />
				<q-input
					dense
					:hint="
						isDate(inputs.start)
							? formatDate(inputs.start, 'cccc, dd MMMM yyyy') +
								' | ' +
								bacaHijri(masehiToHijri(inputs.start))
							: ''
					"
					class="q-my-sm"
					outlined
					label="Dari Tanggal (M)*"
					v-model="inputs.start"
					type="date"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
				/>
				<q-input
					dense
					:hint="
						isDate(inputs.end)
							? formatDate(inputs.end, 'cccc, dd MMMM yyyy') +
								' | ' +
								bacaHijri(masehiToHijri(inputs.end))
							: ''
					"
					class="q-my-sm"
					outlined
					label="Sampai Tanggal (M)*"
					v-model="inputs.end"
					type="date"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
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
import { masehiToHijri, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDate } from 'src/utils/format-date';
import InputSelectArray from '../inputs/InputSelectArray.vue';
import UgtConfig from 'src/models/UgtConfig.js';
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

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(UgtConfig, {
	emit: emit,
	responseKey: 'config',
});

const onSubmit = async () => {
	const data = {
		th_ajaran_h: inputs.value.th_ajaran_h,
		bulan: parseInt(inputs.value.bulan), // inputs.value.bulan,
		urut: inputs.value.urut,
		start: inputs.value.start,
		end: inputs.value.end,
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
