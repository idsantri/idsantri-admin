<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader
				:title="'Input List ' + kebabToTitleCase(dataInput?.key || '')"
				:is-new="isNew"
			/>
			<FormLoading v-if="loadingCrud" />
			<q-card-section class="q-pa-sm">
				<q-input
					label="text1"
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.val0"
					autogrow=""
					:loading="loadingCrud"
					v-if="props.showInput.val0"
				/>
				<q-input
					label="text2"
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.val1"
					autogrow=""
					:loading="loadingCrud"
					v-if="props.showInput.val1"
				/>
				<q-input
					label="text3"
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.val2"
					autogrow=""
					:loading="loadingCrud"
					v-if="props.showInput.val2"
				/>
			</q-card-section>

			<FormActions :btn-delete="!isNew" @on-delete="onDelete" />
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { kebabToTitleCase } from 'src/utils/format-text';
import Lists from 'src/models/Lists';

const props = defineProps({
	dataInput: {
		type: Object,
		required: true,
	},
	showInput: {
		type: Object,
		required: true,
	},
});
const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const loadingCrud = ref(false);
const inputs = ref({});
const isNew = !props.dataInput?.id;

onMounted(() => {
	Object.assign(inputs.value, props.dataInput);
});

async function onSubmit() {
	const data = JSON.parse(JSON.stringify(inputs.value));
	delete data.id;

	try {
		loadingCrud.value = true;
		const response = isNew
			? await Lists.create({ data })
			: await Lists.update({
					id: props.dataInput.id,
					data,
					confirm: true,
				});

		if (response) {
			document.getElementById('btn-close-form').click();
			emit('successSubmit', response?.list);
			if (isNew) {
				emit('successCreate', response?.list);
			} else {
				emit('successUpdate', response?.list);
			}
		}
	} finally {
		loadingCrud.value = false;
	}
}

async function onDelete() {
	try {
		loadingCrud.value = true;
		const id = props.dataInput.id;

		const result = await Lists.remove({ id });
		if (result) {
			document.getElementById('btn-close-form').click();
			emit('successDelete', id);
		}
	} finally {
		loadingCrud.value = false;
	}
}
</script>
<style lang=""></style>
