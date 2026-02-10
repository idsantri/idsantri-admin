<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Santri Indisipliner" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<InputSelectSantriId
					:active-only="true"
					@emit-input="(val) => Object.assign(inputs, val)"
					:data="props.data"
					class="q-my-sm"
					:ref="!inputs.santri_id ? 'firstInput' : null"
				/>
				<q-input
					dense
					:hint="
						isDate(inputs.tgl_kasus)
							? formatDateFull(inputs.tgl_kasus) + ' | ' + bacaHijri(masehiToHijri(inputs.tgl_kasus))
							: ''
					"
					class="q-my-sm"
					outlined
					label="Tanggal Kasus*"
					v-model="inputs.tgl_kasus"
					type="date"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
					:ref="inputs.santri_id ? 'firstInput' : null"
				/>

				<q-input
					dense
					:hint="
						isDate(inputs.tgl_sidang)
							? formatDateFull(inputs.tgl_sidang) + ' | ' + bacaHijri(masehiToHijri(inputs.tgl_sidang))
							: ''
					"
					class="q-my-sm"
					outlined
					label="Tanggal Sidang*"
					v-model="inputs.tgl_sidang"
					type="date"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
				/>
				<q-select
					dense
					v-model="inputs.kategori"
					class="q-my-sm"
					outlined
					label="Kategori*"
					:options="categoryOptions"
					emit-value
					map-options
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
					behavior="menu"
				>
					<template v-slot:after>
						<q-rating
							class=""
							name="kategori"
							v-model="inputs.kategori"
							max="5"
							color="red"
							icon="thumb_down"
							icon-selected="thumb_down"
							size="1em"
						/>
					</template>
				</q-select>
				<input-select-tatib-santri
					class="q-my-sm"
					v-model="inputs.pasal"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input dense class="q-my-sm" outlined label="Deskripsi" v-model="inputs.deskripsi" autogrow="" />
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Eksekutor"
					v-model="inputs.eksekutor"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
				/>
				<q-input dense class="q-my-sm" outlined label="Saksi" v-model="inputs.saksi" />
				<input-select-array
					v-model="inputs.takzir"
					url="takzir-santri"
					label="Takzir"
					class="q-my-sm"
					multiple
				/>
				<q-input dense class="q-my-sm" outlined label="Keterangan" v-model="inputs.keterangan" autogrow="" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import { masehiToHijri, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDateFull } from 'src/utils/format-date';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectTatibSantri from 'src/components/inputs/InputSelectTatibSantri.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import useCrudForm from './utils/useCrudForm';
import Indisipliner from 'src/models/Indisipliner';

const props = defineProps({
	data: Object,
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ kategori: 3, ...props.data });
const isNew = !props.data?.id;
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(Indisipliner, {
	emit: emit,
	responseKey: 'indisipliner',
});

async function onSubmit() {
	const data = {
		santri_id: inputs.value.santri_id,
		tgl_kasus: inputs.value.tgl_kasus,
		tgl_sidang: inputs.value.tgl_sidang,
		kategori: inputs.value.kategori,
		pasal: inputs.value.pasal?.join('; '),
		deskripsi: inputs.value.deskripsi,
		eksekutor: inputs.value.eksekutor,
		saksi: inputs.value.saksi,
		takzir: inputs.value.takzir?.join('; '),
		keterangan: inputs.value.keterangan,
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

onMounted(async () => {
	if (inputs.value.pasal) {
		inputs.value.pasal = inputs.value.pasal.split(',');
	}
	if (inputs.value.takzir) {
		inputs.value.takzir = inputs.value.takzir.split(',');
	}
});

const categoryOptions = [
	{ value: 1, label: 'Sangat Ringan' },
	{ value: 2, label: 'Ringan' },
	{ value: 3, label: 'Sedang' },
	{ value: 4, label: 'Berat' },
	{ value: 5, label: 'Sangat Berat' },
];
</script>
<style lang=""></style>
