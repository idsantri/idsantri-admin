<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader :title="props.title" :is-new="isNew" />
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
					label="Status"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<input-select-array
					v-model="input.keterangan"
					url="keterangan-status"
					label="Keterangan"
					class="q-mt-sm"
				/>
			</q-card-section>
			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="!props.isNew"
					label="Hapus"
					class="bg-red text-red-1"
					no-caps=""
					@click="deleteData(input.id)"
				/>
				<q-space />
				<q-btn
					label="Tutup"
					v-close-popup
					class="bg-green-11"
					no-caps=""
					id="btn-close"
				/>
				<q-btn
					type="submit"
					label="Simpan"
					class="bg-green-10 text-green-11"
					no-caps=""
				/>
			</q-card-actions>
		</q-form>
		<!-- <pre>{{ input }}</pre> -->
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import apiDelete from 'src/api/api-delete';
import FormHeader from 'src/components/forms/FormHeader.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	data: { type: Object, required: true },
	isNew: { type: Boolean, default: true },
	title: { type: String, default: () => 'Input' },
});
const emit = defineEmits(['successSubmit', 'successDelete']);

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
	if (props.isNew) {
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
		document.getElementById('btn-close').click();
		emit('successSubmit');
	}
};

const deleteData = async (id) => {
	const data = {
		endPoint: `status/${id}`,
		loading: loadingCrud,
	};
	const del = await apiDelete(data);
	if (del) {
		document.getElementById('btn-close').click();
		emit('successDelete');
	}
};
</script>
