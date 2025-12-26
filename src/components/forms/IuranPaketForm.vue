<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Paket Iuran" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.urut"
					label="Nomor Urut"
					:rules="[(val) => !val || !isNaN(val) || 'Hanya angka']"
					ref="firstInput"
				/>

				<q-input
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.paket"
					required
					label="Nama Paket"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<InputSelectArray
					v-model="inputs.item"
					url="iuran"
					label="Nama Iuran"
					class="q-my-sm"
					@update:model-value="setNominal"
				/>
				<InputCurrency
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.nominal"
					required
					label="Nominal"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref } from 'vue';
import listsStore from 'src/stores/lists-store';
import InputCurrency from 'src/components/inputs/InputCurrency.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import IuranPaket from 'src/models/IuranPaket';
import useCrudForm from './utils/useCrudForm';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const iuranStore = listsStore().getStateByKey('iuran');
const inputs = ref({ ...props.data });
const iuran = ref([...iuranStore]);
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(IuranPaket, {
	emit: emit,
	responseKey: 'iuran_paket',
});

const firstInput = ref(null);
onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const setNominal = (val) => {
	const selectedOption = iuran.value.find((item) => item.val0 === val);
	if (selectedOption) {
		inputs.value.nominal = selectedOption.val1;
	}
};

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
</script>
