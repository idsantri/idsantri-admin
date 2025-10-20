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
					:model-value="
						inputs?.nama + ' (' + inputs?.aparatur_id + ')'
					"
					disable=""
					filled=""
					class="q-my-sm"
				/>

				<q-input
					dense
					class="q-my-sm"
					outlined
					filled
					label="Jabatan"
					v-model="inputs.jabatan"
					disable
				/>
				<InputSelectArray
					v-model="inputs.th_ajaran_h"
					url="tahun-ajaran"
					label="Tahun Ajaran *"
					sort="desc"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:selected="inputs.th_ajaran_h"
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
					label="Faslah/Kelas"
					class="q-my-sm"
				/>

				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Ruang"
					v-model="inputs.ruang"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Keterangan"
					v-model="inputs.keterangan"
					autogrow=""
				/>
			</q-card-section>

			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import useCrudForm from './utils/useCrudForm';
import AparaturQuran from 'src/models/AparaturQuran';

const props = defineProps({
	data: { type: Object, required: true, default: () => {} },
});

const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const inputs = ref({ jabatan: 'Muallim' });
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(
	AparaturQuran,
	{
		emit: emit,
		responseKey: 'aparatur_quran',
	},
);

onMounted(async () => {
	Object.assign(inputs.value, props.data);
});

const onSubmit = async () => {
	const data = {
		aparatur_id: inputs.value.aparatur_id,
		jabatan: inputs.value.jabatan,
		th_ajaran_h: inputs.value.th_ajaran_h,
		marhalah: inputs.value.marhalah,
		faslah: inputs.value.faslah,
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
