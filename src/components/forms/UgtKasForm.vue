<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Kas UGT" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
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
						<div class="text-caption">Jika terkait dengan administrasi PJGT</div>
						<q-input
							dense
							class="q-my-sm"
							outlined
							label="PJGT ID"
							v-model="inputs.pjgt_id"
							clearable
							debounce="500"
							ref="firstInput"
						/>
						<q-input
							dense
							class="q-my-sm"
							outlined
							label="Nama PJGT"
							v-model="pjgt.nama"
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
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';
import InputCurrency from 'src/components/inputs/InputCurrency.vue';
import useCrudForm from './utils/useCrudForm';
import UgtKas from 'src/models/UgtKas';
import UgtPjgt from 'src/models/UgtPjgt';

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
const pjgt = ref({});
const isNew = !props.data?.id;
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

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

async function getPjgt(id) {
	try {
		loadingGt.value = true;
		const response = await UgtPjgt.getById({ id, notifySuccess: false });
		pjgt.value = response.pjgt;
	} catch (_err) {
		pjgt.value.nama = 'Data tidak ditemukan';
		// console.error('err ', _err);
	} finally {
		loadingGt.value = false;
	}
}

watch(
	() => inputs.value.pjgt_id,
	async (newValue, oldValue) => {
		pjgt.value.nama = '';
		pjgt.value.pjgt_nama = '';
		if (newValue != oldValue) {
			await getPjgt(newValue);
		}
	},
	{ immediate: true },
);
</script>
<style></style>
