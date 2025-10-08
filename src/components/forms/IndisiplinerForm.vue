<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Santri Indisipliner" :is-new="!input.id" />
			<q-card-section class="q-pa-sm">
				<div v-if="loadingCrud">
					<q-dialog v-model="loadingCrud" persistent="">
						<q-spinner-cube
							color="green-12"
							size="8em"
							class="flex q-ma-lg q-mx-auto"
						/>
					</q-dialog>
				</div>
				<div>
					<InputSelectSantriId
						:active-only="true"
						@emit-input="(val) => Object.assign(input, val)"
						:data="props.data"
					/>
					<q-input
						dense
						:hint="
							isDate(input.tgl_kasus)
								? formatDateFull(input.tgl_kasus) +
									' | ' +
									bacaHijri(m2h(input.tgl_kasus))
								: ''
						"
						class="q-mt-sm"
						outlined
						label="Tanggal Kasus*"
						v-model="input.tgl_kasus"
						type="date"
						:rules="[(val) => !!val || 'Harus diisi!']"
						error-color="negative"
					/>

					<q-input
						dense
						:hint="
							isDate(input.tgl_sidang)
								? formatDateFull(input.tgl_sidang) +
									' | ' +
									bacaHijri(m2h(input.tgl_sidang))
								: ''
						"
						class="q-mt-sm"
						outlined
						label="Tanggal Sidang*"
						v-model="input.tgl_sidang"
						type="date"
						:rules="[(val) => !!val || 'Harus diisi!']"
						error-color="negative"
					/>
					<q-select
						dense
						v-model="input.kategori"
						class="q-mt-sm"
						outlined
						label="Kategori*"
						:options="categoryOptions"
						emit-value
						map-options
						:rules="[(val) => !!val || 'Harus diisi!']"
						error-color="negative"
						behavior="menu"
					>
						<template v-slot:after>
							<q-rating
								class=""
								name="kategori"
								v-model="input.kategori"
								max="5"
								color="red"
								icon="thumb_down"
								icon-selected="thumb_down"
								size="1em"
							/>
						</template>
					</q-select>
					<input-select-tatib-santri
						class="q-mt-sm"
						v-model="input.pasal"
						:rules="[(val) => !!val || 'Harus diisi!']"
						:selected="input.pasal ? input.pasal.join('; ') : ''"
					/>
					<q-input
						dense
						class="q-mt-sm"
						outlined
						label="Deskripsi"
						v-model="input.deskripsi"
						autogrow=""
					/>
					<q-input
						dense
						class="q-mt-sm"
						outlined
						label="Eksekutor"
						v-model="input.eksekutor"
						:rules="[(val) => !!val || 'Harus diisi!']"
						error-color="negative"
					/>
					<q-input
						dense
						class="q-mt-sm"
						outlined
						label="Saksi"
						v-model="input.saksi"
					/>
					<input-select-array
						v-model="input.takzir"
						url="takzir-santri"
						label="Takzir"
						class="q-mt-sm"
						multiple
					/>
					<q-input
						dense
						class="q-mt-sm"
						outlined
						label="Keterangan"
						v-model="input.keterangan"
						autogrow=""
					/>
				</div>
			</q-card-section>
			<FormActions
				:btn-delete="input.id ? true : false"
				@on-delete="onDelete"
			/>
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { m2h, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDateFull } from 'src/utils/format-date';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import apiDelete from 'src/api/api-delete';
import FormHeader from 'src/components/forms/FormHeader.vue';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectTatibSantri from 'src/components/inputs/InputSelectTatibSantri.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	data: Object,
});

const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const input = ref({ kategori: 3 });
const loadingCrud = ref(false);

async function onSubmit() {
	// console.log('input', input.value);
	// console.log('input', input.value.pasal);
	// return;
	const data = {
		santri_id: input.value.santri_id,
		tgl_kasus: input.value.tgl_kasus,
		tgl_sidang: input.value.tgl_sidang,
		kategori: input.value.kategori,
		pasal: input.value.pasal?.join('; '),
		deskripsi: input.value.deskripsi,
		eksekutor: input.value.eksekutor,
		saksi: input.value.saksi,
		takzir: input.value.takzir?.join('; '),
		keterangan: input.value.keterangan,
	};
	// console.log(data);
	// return;
	let response = null;
	const isNew = !input.value.id;
	if (!isNew) {
		response = await apiUpdate({
			endPoint: `indisipliner/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	} else {
		response = await apiPost({
			endPoint: 'indisipliner',
			data,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.indisipliner);
		if (isNew) {
			emit('successCreate', response?.indisipliner);
		} else {
			emit('successUpdate', response?.indisipliner);
		}
	}
}

const onDelete = async () => {
	const id = input.value.id;
	const result = await apiDelete({
		endPoint: `indisipliner/${id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close-form').click();
		emit('successDelete', id);
	}
};

onMounted(async () => {
	Object.assign(input.value, props.data);
	// console.log(input.value);
	if (input.value.pasal) {
		input.value.pasal = input.value.pasal.split(',');
	}
	if (input.value.takzir) {
		input.value.takzir = input.value.takzir.split(',');
	}
});

const categoryOptions = [
	{ value: 1, label: 'Sangat Ringan' },
	{ value: 2, label: 'Ringan' },
	{ value: 3, label: 'Sedang' },
	{ value: 4, label: 'Berat' },
	{ value: 5, label: 'Sangat Berat' },
];
</script>
<style lang=""></style>
