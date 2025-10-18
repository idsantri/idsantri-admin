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

				<q-input
					dense
					class="q-mt-sm"
					outlined
					filled
					label="Jabatan"
					v-model="input.jabatan"
					disable
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

				<q-select
					dense
					outlined=""
					v-model="input.marhalah"
					label="Marhalah *"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:options="['Ula', 'Wustho', 'Ulya']"
				/>
				<input-select-array
					v-model="input.faslah"
					url="faslah-quran"
					label="Faslah/Kelas"
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

const input = ref({ jabatan: 'Muallim' });
const loadingCrud = ref(false);
const tahunAjaran = ref([]);

onMounted(async () => {
	Object.assign(input.value, props.data);
	tahunAjaran.value = listsStore().getByStateName('tahun-ajaran');
});

const submit = async () => {
	const data = {
		aparatur_id: input.value.aparatur_id,
		jabatan: input.value.jabatan,
		th_ajaran_h: input.value.th_ajaran_h,
		marhalah: input.value.marhalah,
		faslah: input.value.faslah,
		ruang: input.value.ruang,
		keterangan: input.value.keterangan,
	};

	let response = null;
	const isNew = !input.value.id;
	if (isNew) {
		response = await apiPost({
			endPoint: 'aparatur-quran',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `aparatur-quran/${input.value.id}`,
			data,
			confirm: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.aparatur_quran);
		if (isNew) {
			emit('successCreate', response?.aparatur_quran);
		} else {
			emit('successUpdate', response?.aparatur_quran);
		}
	}
};

const deleteData = async () => {
	const id = input.value.id;
	const deleted = await apiDelete({
		endPoint: `aparatur-quran/${id}`,
		loading: loadingCrud,
	});
	if (deleted) {
		document.getElementById('btn-close-form').click();
		emit('successDelete', id);
	}
};
</script>
