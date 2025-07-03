<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader
				title="Input Pendidikan Quran"
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
					url="kelas-tajwid-quran"
					label="Faslah/Kelas *"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<!-- <q-input
					dense
					outlined
					label="No Absen"
					v-model="input.no_absen"
					:rules="[
						(val) => !val || !isNaN(val) || 'Hanya menerima angka!',
					]"
				/> -->
				<q-card bordered flat class="q-px-sm q-mt-sm">
					<q-toggle
						v-model="input.aktif"
						color="green"
						:true-value="1"
						:false-value="0"
						label="Aktif"
						:disable="input.id ? false : true"
					/>
				</q-card>
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

const input = ref({ marhalah: 'Ula', faslah: null, no_absen: null, aktif: 1 });
const loadingCrud = ref(false);

onMounted(async () => {
	Object.assign(input.value, props.data);
});

const submit = async () => {
	const data = {
		santri_id: input.value.santri_id,
		marhalah: input.value.marhalah,
		faslah: input.value.faslah,
		no_absen: input.value.no_absen,
		aktif: input.value.aktif,
	};
	// console.log(data);
	// return;

	let response = null;
	const isNew = !input.value.id;
	if (isNew) {
		response = await apiPost({
			endPoint: 'quran/mutaallim',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `quran/mutaallim/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.mutaallim);
		if (isNew) {
			emit('successCreate', response?.mutaallim);
		} else {
			emit('successUpdate', response?.mutaallim);
		}
	}
};

const onDelete = async () => {
	const id = input.value.id;
	const result = await apiDelete({
		endPoint: `quran/mutaallim/${id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close-form').click();
		emit('successDelete', id);
	}
};
</script>
