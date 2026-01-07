<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Data Domisili Baru" :is-new="false" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					:model-value="inputs.nama + ' (' + inputs.santri_id + ')'"
					class="q-my-sm"
					disable
					filled
					dense
					outlined
					label="Nama (ID)"
				/>
				<q-input
					:model-value="inputs.tingkat + ' &mdash; ' + inputs.kelas"
					class="q-my-sm"
					disable
					filled
					dense
					outlined
					label="Tingkat &mdash; Kelas"
				/>

				<q-input
					:model-value="inputs.domisili"
					class="q-my-sm"
					disable
					filled
					dense
					outlined
					label="Domisili (Asal)"
				/>
				<input-select-array
					v-model="inputs.new_domisili"
					url="domisili"
					label="Domisili (Baru) *"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:clearable="false"
					ref="firstInput"
				/>
				<q-input
					v-model="inputs.new_keterangan"
					class="q-my-sm"
					dense
					outlined
					label="Keterangan (Baru)"
					:autogrow="true"
				/>
			</q-card-section>
			<FormActions :btn-delete="true" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import Mutasi from 'src/models/Mutasi';
import useCrudForm from './utils/useCrudForm';

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const { handleDelete, handleUpdate, loading } = useCrudForm(Mutasi, {
	emit,
	responseKey: 'mutasi',
});

async function onSubmit() {
	const data = {
		new_domisili: inputs.value.new_domisili,
		new_keterangan: inputs.value.new_keterangan,
	};
	return await handleUpdate(props.data.id, data, true);
}

async function onDelete() {
	return await handleDelete(props.data.id);
}
</script>
<style lang=""></style>
