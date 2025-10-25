<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data GT" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section class="q-pa-sm">
				<InputSelectSantriId
					:active-only="true"
					@emit-input="(val) => Object.assign(inputs, val)"
					:data="props.data"
				/>
				<q-select
					class="q-my-sm"
					dense
					outlined
					label="PJGT ID*"
					v-model="inputs.pjgt_id"
					:options="pjgtList"
					emit-value
					map-options
					option-value="id"
					option-label="id"
					error-color="negative"
					:loading="pjgtLoading"
					use-input
					clearable=""
					@update:model-value="onInputPjgt"
					behavior="menu"
				>
					<template v-slot:option="scope">
						<q-item v-bind="scope.itemProps">
							<q-item-section>
								<q-item-label
									>{{ scope.opt.id }} &mdash;
									{{ scope.opt.nama }}
								</q-item-label>
								<q-item-label caption>{{ scope.opt.wilayah }}</q-item-label>
							</q-item-section>
						</q-item>
					</template>
				</q-select>
				<q-input
					dense
					:hint="inputs.pjgt_wilayah"
					class="q-my-sm"
					outlined
					label="Nama PJGT"
					v-model="inputs.pjgt_nama"
					disable
					filled
				/>
				<InputSelectTahunAjaran
					v-model="inputs.th_ajaran_h"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
					sort="desc"
				/>

				<q-input
					dense
					hint="08123456789"
					class="q-my-sm"
					outlined
					label="Telepon"
					v-model="inputs.telepon"
					:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
					error-color="negative"
				/>
				<q-input dense class="q-my-sm" outlined label="Email GT" v-model="inputs.email" />
				<q-input dense class="q-my-sm" outlined label="Keterangan" v-model="inputs.keterangan" autogrow="" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import useCrudForm from './utils/useCrudForm';
import UgtGt from 'src/models/UgtGt';
import InputSelectTahunAjaran from '../inputs/InputSelectTahunAjaran.vue';
import UgtPjgt from 'src/models/UgtPjgt';

const props = defineProps({
	data: Object,
});
const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const pjgtList = ref([]);
const pjgtLoading = ref(false);
const isNew = !props.data?.id;

async function getPjgt() {
	try {
		pjgtLoading.value = true;
		const response = await UgtPjgt.getAll({ notifySuccess: false });
		pjgtList.value = response.pjgt;
	} catch (_err) {
		// console.error('err ', _err);
	} finally {
		pjgtLoading.value = false;
	}
}

onMounted(async () => {
	await getPjgt();
});

function onInputPjgt() {
	inputs.value.pjgt_nama = pjgtList.value.find((o) => o.id == inputs.value?.pjgt_id)?.nama;
	inputs.value.pjgt_wilayah = pjgtList.value.find((o) => o.id == inputs.value?.pjgt_id)?.wilayah;
}

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(UgtGt, { emit, responseKey: 'gt' });

async function onSubmit() {
	const data = {
		pjgt_id: inputs.value.pjgt_id,
		santri_id: inputs.value.santri_id,
		th_ajaran_h: inputs.value.th_ajaran_h,
		telepon: inputs.value.telepon,
		email: inputs.value.email,
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
</script>
<style lang=""></style>
