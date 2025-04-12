<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader
				title="Input Status"
				:is-new="input.id ? false : true"
			/>
			<q-card-section>
				<div v-if="loadingCrud">
					<q-dialog v-model="loadingCrud" persistent="">
						<q-spinner-cube
							color="green-12"
							size="8em"
							class="flex q-ma-lg q-mx-auto"
						/>
					</q-dialog>
				</div>
				<q-input
					dense
					outlined
					label="Nama"
					:model-value="input?.nama + ' (' + input?.santri_id + ')'"
					disable=""
					filled=""
				/>

				<input-select-array
					v-model="input.status"
					url="status"
					label="Status *"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input
					dense
					class="q-mt-sm"
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
		status: input.value.status,
		keterangan: input.value.keterangan,
	};

	let response = null;
	const isNew = !input.value.id;
	if (isNew) {
		response = await apiPost({
			endPoint: 'status',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `status/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.status);
		if (isNew) {
			emit('successCreate', response?.status);
		} else {
			emit('successUpdate', response?.status);
		}
	}
};

const onDelete = async () => {
	const id = input.value.id;
	const result = await apiDelete({
		endPoint: `status/${id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close-form').click();
		emit('successDelete', id);
	}
};
</script>
