<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Izin Santri" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section class="q-pa-sm">
				<InputSelectSantriId
					:active-only="true"
					@emit-input="(val) => Object.assign(inputs, val)"
					:data="props.data"
					class="q-my-sm"
				/>
				<input-select-array
					v-model="inputs.sifat"
					url="sifat-izin"
					label="Sifat"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-select
					label="Pengajuan"
					v-model="inputs.pengajuan"
					dense
					outlined
					class="q-my-sm"
					:options="[
						'Baru',
						'Perpanjangan ke-1',
						'Perpanjangan ke-2',
					]"
					:disable="inputs.sifat == 'Pulang' ? false : true"
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
					hint=""
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
					label="Tujuan"
					v-model="inputs.tujuan"
					autogrow=""
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
import { isDate, formatDateFull } from 'src/utils/format-date';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import IzinPesantren from 'src/models/IzinPesantren';
import useCrudForm from './utils/useCrudForm';

const props = defineProps({
	data: Object,
});

const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const inputs = ref({ pengajuan: 'Baru', tujuan: 'Sesuai alamat rumah' });
const isNew = !props.data?.id;
const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(
	IzinPesantren,
	{
		emit: emit,
		responseKey: 'izin_pesantren',
	},
);

onMounted(async () => {
	Object.assign(inputs.value, props.data);
});

async function onSubmit() {
	const data = {
		santri_id: inputs.value.santri_id,
		sifat: inputs.value.sifat,
		pengajuan: inputs.value.pengajuan,
		dari_tgl: inputs.value.dari_tgl,
		durasi: inputs.value.durasi,
		keperluan: inputs.value.keperluan,
		keterangan: inputs.value.keterangan,
		tujuan: inputs.value.tujuan,
		catatan: inputs.value.catatan,
	};

	if (isNew) {
		return await handleCreate(data, true);
	} else {
		return await handleUpdate(props.data.id, data, true);
	}
}

const onDelete = async () => {
	return await handleDelete(props.data.id);
};
</script>
<style lang=""></style>
