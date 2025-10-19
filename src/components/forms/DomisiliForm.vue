<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader
				title="Input Domisili"
				:is-new="input.id ? false : true"
			/>
			<FormLoading v-if="loadingCrud" />
			<q-card-section>
				<q-input
					class="q-my-sm"
					dense
					outlined
					label="Nama"
					:model-value="input?.nama + ' (' + input?.santri_id + ')'"
					disable=""
					filled=""
				/>
				<input-select-array
					class="q-my-sm"
					v-model="input.domisili"
					url="domisili"
					label="Domisili *"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input
					class="q-my-sm"
					dense
					outlined
					label="Keterangan"
					v-model="input.keterangan"
					autogrow=""
				/>
			</q-card-section>
			<FormActions
				:btn-delete="input.id ? true : false"
				@on-delete="onDelete"
			/>
		</q-form>
		<!-- <pre>{{ input }}</pre> -->
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import apiDelete from 'src/api/api-delete';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	data: { type: Object, required: true },
});
const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const input = ref({});
const loadingCrud = ref(false);

onMounted(async () => {
	Object.assign(input.value, props.data);
});

const submit = async () => {
	const data = {
		santri_id: input.value.santri_id,
		domisili: input.value.domisili,
		keterangan: input.value.keterangan,
	};

	let response = null;
	const isNew = !input.value.id;
	if (isNew) {
		response = await apiPost({
			endPoint: 'domisili',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `domisili/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.domisili);
		if (isNew) {
			emit('successCreate', response?.domisili);
		} else {
			emit('successUpdate', response?.domisili);
		}
	}
};

const onDelete = async () => {
	const id = input.value.id;
	const result = await apiDelete({
		endPoint: `domisili/${id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close-form').click();
		emit('successDelete', id);
	}
};
</script>
