<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader title="Jabatan Madrasiyah" :is-new="isNew" />
			<div v-if="loadingCrud">
				<q-spinner-cube
					color="green-12"
					size="8em"
					class="flex q-ma-lg q-mx-auto"
				/>
			</div>

			<q-card-section v-else>
				<q-input
					dense
					outlined
					label="Nama"
					:model-value="input?.nama + ' (' + input?.aparatur_id + ')'"
					disable=""
					filled=""
				/>

				<input-select-array
					v-model="input.jabatan"
					url="jabatan-madrasiyah"
					label="Jabatan"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
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
					label="Kelas"
					class="q-mt-sm"
				/>

				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Ruang"
					v-model="input.ruang"
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
					id="btn-close-santri-crud"
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
import apiDelete from 'src/api/api-delete';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import FormHeader from 'src/components/forms/FormHeader.vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	data: { type: Object, required: true },
	isNew: { type: Boolean, default: true },
});

const emit = defineEmits(['successSubmit', 'successDelete']);

const input = ref({});
const loadingCrud = ref(false);
const tingkat = ref([]);
const tahunAjaran = ref([]);

onMounted(async () => {
	// input.value = props.data;  // menjadi reactive
	Object.assign(input.value, props.data);
	tahunAjaran.value = listsStore().getByStateName('tahun-ajaran');
	tingkat.value = listsStore().getByStateName('tingkat-pendidikan');
});

const submit = async () => {
	const data = {
		id: input.value.id,
		aparatur_id: input.value.aparatur_id,
		jabatan: input.value.jabatan,
		th_ajaran_h: input.value.th_ajaran_h,
		tingkat_id: input.value.tingkat_id,
		kelas: input.value.kelas,
		ruang: input.value.ruang,
		keterangan: input.value.keterangan,
	};

	let response = null;
	if (props.isNew) {
		response = await apiPost({
			endPoint: 'aparatur-madrasah',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `aparatur-madrasah/${data.id}`,
			data,
			confirm: true,
			loading: loadingCrud,
		});
	}
	if (response) emit('successSubmit');
};

const deleteData = async (id) => {
	const deleted = await apiDelete({
		endPoint: `aparatur-madrasah/${id}`,
		loading: loadingCrud,
	});
	if (deleted) emit('successDelete');
};
</script>
