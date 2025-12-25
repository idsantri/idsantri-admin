<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Detail APB" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					label="Item *"
					v-model="inputs.item"
					dense
					outlined=""
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input
					label="Kuantitas / Banyaknya *"
					v-model="inputs.qty"
					dense
					outlined=""
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					type="number"
				/>
				<input-select-array
					v-model="inputs.satuan"
					url="satuan"
					label="Satuan *"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
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
				<input-select-array v-model="inputs.siklus" url="siklus" label="Siklus" class="q-my-sm" />
				<q-input dense class="q-my-sm" outlined label="Waktu" v-model="inputs.waktu" />
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Penanggung Jawab"
					v-model="inputs.penanggung_jawab"
					autogrow=""
				/>
				<q-input dense class="q-my-sm" outlined label="Catatan" v-model="inputs.catatan" autogrow="" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';
import useCrudForm from 'src/components/forms/utils/useCrudForm';
import InputSelectTahunAjaran from '../inputs/InputSelectTahunAjaran.vue';
import ApbBudgetDetail from 'src/models/ApbBudgetDetail';
import InputCurrency from '../inputs/InputCurrency.vue';

const props = defineProps({
	data: { type: Object, required: true },
});

const emits = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ satuan: 'kali', ...props.data });
const isNew = !props.data?.id;

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(ApbBudgetDetail, {
	emit: emits,
	responseKey: 'detail',
});

const onSubmit = async () => {
	const data = {
		budget_id: inputs.value.budget_id,
		urut: inputs.value.urut ?? null,
		item: inputs.value.item,
		qty: inputs.value.qty,
		satuan: inputs.value.satuan,
		nominal: inputs.value.nominal,
		siklus: inputs.value.siklus,
		waktu: inputs.value.waktu,
		penanggung_jawab: inputs.value.penanggung_jawab,
		catatan: inputs.value.catatan,
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
