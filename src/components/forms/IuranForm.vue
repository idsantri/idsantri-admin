<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Iuran" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<InputSelectSantriId
					:active-only="true"
					@emit-input="(val) => Object.assign(inputs, val)"
					:data="props.data"
					class="q-my-sm"
					:ref="!inputs.santri_id ? 'firstInput' : null"
				/>

				<InputSelectTahunAjaran
					v-model="inputs.th_ajaran_h"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
					:disable="props.disableThAjaran"
					:ref="inputs.santri_id && !props.disableThAjaran ? 'firstInput' : null"
				/>
				<InputSelectArray
					v-model="inputs.item"
					url="iuran"
					label="Nama Iuran"
					class="q-my-sm"
					@update:model-value="setNominal"
					:ref="inputs.santri_id && props.disableThAjaran ? 'firstInput' : null"
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

				<InputSelectArray
					v-model="inputs.via"
					url="metode-pembayaran"
					label="Via"
					class="q-my-sm"
					v-show="inputs.id && inputs.lunas"
				/>
				<q-input label="Keterangan" v-model="inputs.keterangan" dense outlined="" class="q-my-sm" autogrow="" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import InputCurrency from 'src/components/inputs/InputCurrency.vue';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import useCrudForm from './utils/useCrudForm';
import Iuran from 'src/models/Iuran';
import { useListsStore } from 'src/stores/lists-store';
import InputSelectTahunAjaran from '../inputs/InputSelectTahunAjaran.vue';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
	disableSantriId: { type: Boolean, default: false },
	disableThAjaran: { type: Boolean, default: false },
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const iuranStore = useListsStore().getStateByKey('iuran');
const inputs = ref({ ...props.data });
const iuran = ref([...iuranStore]);
const isNew = !props.data?.id;
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(Iuran, {
	emit: emit,
	responseKey: 'iuran',
});

const setNominal = (val) => {
	const selectedOption = iuran.value.find((item) => item.val0 === val);
	if (selectedOption) {
		inputs.value.nominal = selectedOption.val1;
	}
};

const onSubmit = async () => {
	const data = {
		santri_id: inputs.value.santri_id,
		th_ajaran_h: inputs.value.th_ajaran_h,
		item: inputs.value.item,
		nominal: inputs.value.nominal,
		via: inputs.value.via,
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
