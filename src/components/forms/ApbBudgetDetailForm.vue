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
					ref="firstInput"
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
					v-model="inputs.unit"
					url="satuan"
					label="Satuan *"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
				/>
				<InputCurrency
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.price"
					required
					label="Nominal"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<input-select-array v-model="inputs.cycle" url="siklus" label="Siklus" class="q-my-sm" />
				<q-input dense class="q-my-sm" outlined label="Waktu" v-model="inputs.needed_at" />
				<q-input
					dense
					class="q-my-sm"
					outlined
					label="Penanggung Jawab"
					v-model="inputs.executor"
					autogrow=""
				/>
				<q-input dense class="q-my-sm" outlined label="Catatan" v-model="inputs.note" autogrow="" />
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import useCrudForm from 'src/components/forms/utils/useCrudForm';
import ApbBudgetDetail from 'src/models/ApbBudgetDetail';
import InputCurrency from '../inputs/InputCurrency.vue';

const props = defineProps({
	data: { type: Object, required: true },
});

const emits = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ unit: 'kali', ...props.data });
const isNew = !props.data?.id;
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(ApbBudgetDetail, {
	emit: emits,
	responseKey: 'detail',
});

const onSubmit = async () => {
	const data = {
		budget_id: inputs.value.budget_id,
		sequence: inputs.value.sequence ?? null,
		item: inputs.value.item,
		qty: inputs.value.qty,
		unit: inputs.value.unit,
		price: inputs.value.price,
		cycle: inputs.value.cycle,
		needed_at: inputs.value.needed_at,
		executor: inputs.value.executor,
		note: inputs.value.note,
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
