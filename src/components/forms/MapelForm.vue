<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Mata Pelajaran" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					dense
					outlined
					label="Urut"
					v-model="inputs.sequence"
					hint="Nomor urut tampil"
					class="q-my-sm"
				/>
				<InputSelectTingkatPendidikan
					v-model="inputs.tingkat_id"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>

				<q-input
					class="q-my-sm"
					dense
					outlined
					label="Kode/ID Mapel"
					v-model="inputs.id"
					hint="Format: tingkat_id—kode_mapel (ibt-qur; ts-taj; aly-tau)"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Mata Pelajaran"
					v-model="inputs.name"
					hint="Hanya huruf dan spasi"
				/>
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Mata Pelajaran (Alias)"
					v-model="inputs.alias"
				/>
				<q-select
					dense
					class="q-my-sm"
					outlined
					label="Kategori Fan"
					emit-value
					map-options
					v-model="inputs.category"
					:options="['Fan Pokok', 'Fan Dasar', 'Fan Tambahan']"
					behavior="menu"
				/>
				<q-card bordered flat class="q-px-sm q-my-sm">
					Tampilkan:
					<q-toggle
						v-model="inputs.show"
						color="green"
						:true-value="1"
						:false-value="0"
					/>
				</q-card>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';
import useCrudForm from './utils/useCrudForm';
import Mapel from 'src/models/Mapel';

const props = defineProps({
	data: { type: Object, required: true },
});
const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const inputs = ref({ category: 'Fan Dasar', show: 1 });
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(
	Mapel,
	{ emit, responseKey: 'mapel' },
);

onMounted(async () => {
	Object.assign(inputs.value, props.data);
});

const onSubmit = async () => {
	const data = {
		sequence: inputs.value.sequence,
		id: inputs.value.id.toLowerCase(),
		tingkat_id: inputs.value.tingkat_id,
		name: inputs.value.name,
		alias: inputs.value.alias,
		category: inputs.value.category,
		show: inputs.value.show,
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
