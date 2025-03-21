<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader :title="props.title" :is-new="!input.id" />
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
				<InputSelectArray
					v-model="input.th_ajaran_h"
					url="tahun-ajaran"
					label="Tahun Ajaran *"
					sort="desc"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:selected="input.th_ajaran_h"
				/>

				<InputSelectTingkatPendidikan
					v-model="input.tingkat_id"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:selected="input.tingkat_id"
				/>
				<input-select-array
					v-model="input.kelas"
					url="kelas"
					label="Kelas *"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>

				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Nomor Absen"
					v-model="input.no_absen"
					type="number"
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
			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="input.id"
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
import listsStore from 'src/stores/lists-store';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import apiDelete from 'src/api/api-delete';
import FormHeader from 'src/components/forms/FormHeader.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';

const props = defineProps({
	data: { type: Object, required: true },
	title: { type: String, default: () => 'Input' },
});

const emit = defineEmits(['successSubmit', 'successDelete']);

const input = ref({});
const loadingCrud = ref(false);
const tahunAjaran = ref([]);
const tingkat = ref([]);

onMounted(async () => {
	Object.assign(input.value, props.data);
	tahunAjaran.value = listsStore().getByStateName('tahun-ajaran');
	tingkat.value = listsStore().getByStateName('tingkat-pendidikan');
});

const submit = async () => {
	const data = {
		santri_id: input.value.santri_id,
		th_ajaran_h: input.value.th_ajaran_h,
		tingkat_id: input.value.tingkat_id,
		kelas: input.value.kelas,
		no_absen: input.value.no_absen,
		keterangan: input.value.keterangan,
	};

	let response = null;
	if (input.value.id) {
		response = await apiUpdate({
			endPoint: `kelas/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	} else {
		response = await apiPost({
			endPoint: 'kelas',
			data,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close').click();
		emit('successSubmit');
	}
};

const deleteData = async (id) => {
	const del = await apiDelete({
		endPoint: `kelas/${id}`,
		loading: loadingCrud,
	});
	if (del) {
		document.getElementById('btn-close').click();
		emit('successDelete');
	}
};
</script>
