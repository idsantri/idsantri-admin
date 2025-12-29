<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader :title="'Input List ' + kebabToTitleCase(data?.key || '')" :is-new="isNew" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					label="text1"
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.val0"
					autogrow=""
					:loading="loading"
					v-if="showInput.val0"
					ref="firstInput"
				/>
				<q-input
					label="text2"
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.val1"
					autogrow=""
					:loading="loading"
					v-if="showInput.val1"
				/>
				<q-input
					label="text3"
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.val2"
					autogrow=""
					:loading="loading"
					v-if="showInput.val2"
				/>
			</q-card-section>
			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import { kebabToTitleCase } from 'src/utils/format-text';
import Lists from 'src/models/Lists';
import useCrudForm from './utils/useCrudForm';

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
	showInput: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const isNew = !props.data?.id;
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const { handleDelete, handleCreate, handleUpdate, loading } = useCrudForm(Lists, {
	emit: emit,
	responseKey: 'list',
});

async function onSubmit() {
	const data = JSON.parse(JSON.stringify(inputs.value));
	delete data.id;
	if (isNew) {
		return await handleCreate(data, true);
	} else {
		return await handleUpdate(props.data.id, data, true);
	}
}

async function onDelete() {
	return await handleDelete(props.data.id);
}
</script>
<style lang=""></style>
