<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Kas UGT" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section class="q-pa-sm">
				<q-input
					dense
					hint="Diisi oleh sistem"
					class=""
					outlined
					label="ID"
					v-model="inputs.id"
					disable
					filled
				/>
				<q-card class="q-my-sm" flat bordered>
					<q-card-section class="q-pa-sm">
						<div class="text-caption">Jika terkait dengan administrasi GT</div>
						<q-input
							dense
							class="q-my-sm"
							outlined
							label="GT ID"
							v-model="inputs.gt_id"
							clearable
							debounce="500"
						/>
						<q-input
							dense
							class="q-my-sm"
							outlined
							label="Nama GT"
							v-model="gt.nama"
							disable
							filled
							:loading="loadingGt"
						/>
						<q-input
							dense
							class="q-my-sm"
							outlined
							label="Nama PJGT"
							v-model="gt.pjgt_nama"
							disable
							filled
							:loading="loadingGt"
						/>
					</q-card-section>
				</q-card>
				<q-input dense class="q-my-sm" outlined label="Keperluan" v-model="inputs.keperluan" />
				<q-select
					dense
					class="q-my-sm"
					outlined
					label="Kas Masuk/Keluar"
					v-model="inputs.flag"
					:options="[
						{ value: '+', label: 'Masuk' },
						{ value: '-', label: 'Keluar' },
					]"
					emit-value
					map-options
					error-color="negative"
					behavior="menu"
				/>
				<input-currency dense class="q-my-sm" outlined v-model="inputs.nominal" required label="Nominal" />
				<q-input dense class="q-my-sm" outlined label="Keterangan" v-model="inputs.keterangan" autogrow />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref, watch } from 'vue';
import InputCurrency from 'src/components/inputs/InputCurrency.vue';
import useCrudForm from './utils/useCrudForm';
import UgtKas from 'src/models/UgtKas';
import UgtGt from 'src/models/UgtGt';

const props = defineProps({
	data: Object,
});
const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({
	keperluan: 'Biaya Administrasi GT',
	keterangan: 'Lunas',
	flag: '+',
	...props.data,
});
const loadingGt = ref(false);
const gt = ref({});
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(UgtKas, { emit, responseKey: 'kas' });

const onSubmit = async () => {
	const data = JSON.parse(JSON.stringify(inputs.value));
	delete data.id;

	if (isNew) {
		return await handleCreate(data, true);
	} else {
		return await handleUpdate(props.data.id, data, true);
	}
};

const onDelete = async () => {
	return await handleDelete(props.data.id);
};

async function getGt(id) {
	try {
		loadingGt.value = true;
		const response = await UgtGt.getById({ id, notifySuccess: false });
		gt.value = response.gt;
	} catch (_err) {
		gt.value.nama = 'Data tidak ditemukan';
		gt.value.pjgt_nama = 'Data tidak ditemukan';
		// console.error('err ', _err);
	} finally {
		loadingGt.value = false;
	}
}

watch(
	() => inputs.value.gt_id,
	async (newValue, oldValue) => {
		gt.value.nama = '';
		gt.value.pjgt_nama = '';
		if (newValue != oldValue) {
			await getGt(newValue);
		}
	},
	{ immediate: true },
);
</script>
<style lang=""></style>
