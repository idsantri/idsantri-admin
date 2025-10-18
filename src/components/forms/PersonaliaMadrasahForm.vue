<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader
				title="Input Jabatan Madrasiyah"
				:is-new="input.id ? false : true"
			/>
			<FormLoading v-if="loadingCrud" />
			<q-card-section>
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

			<FormActions
				:btn-delete="input.id ? true : false"
				@on-delete="deleteData"
			/>
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
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	data: { type: Object, required: true, default: () => {} },
});

const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const input = ref({});
const loadingCrud = ref(false);
const tingkat = ref([]);
const tahunAjaran = ref([]);

onMounted(async () => {
	Object.assign(input.value, props.data);
	tahunAjaran.value = listsStore().getByStateName('tahun-ajaran');
	tingkat.value = listsStore().getByStateName('tingkat-pendidikan');
});

const submit = async () => {
	const data = {
		aparatur_id: input.value.aparatur_id,
		jabatan: input.value.jabatan,
		th_ajaran_h: input.value.th_ajaran_h,
		tingkat_id: input.value.tingkat_id,
		kelas: input.value.kelas,
		ruang: input.value.ruang,
		keterangan: input.value.keterangan,
	};

	let response = null;
	const isNew = !input.value.id;
	if (isNew) {
		response = await apiPost({
			endPoint: 'aparatur-madrasah',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `aparatur-madrasah/${input.value.id}`,
			data,
			confirm: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.aparatur_madrasah);
		if (isNew) {
			emit('successCreate', response?.aparatur_madrasah);
		} else {
			emit('successUpdate', response?.aparatur_madrasah);
		}
	}
};

const deleteData = async () => {
	const id = input.value.id;
	const deleted = await apiDelete({
		endPoint: `aparatur-madrasah/${id}`,
		loading: loadingCrud,
	});
	if (deleted) {
		document.getElementById('btn-close-form').click();
		emit('successDelete', id);
	}
};
</script>
