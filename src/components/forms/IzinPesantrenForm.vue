<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Izin Santri" :is-new="!input.id" />
			<FormLoading v-if="loadingCrud" />
			<q-card-section class="q-pa-sm">
				<div>
					<InputSelectSantriId
						:active-only="true"
						@emit-input="(val) => Object.assign(input, val)"
						:data="props.data"
					/>
					<input-select-array
						v-model="input.sifat"
						url="sifat-izin"
						label="Sifat"
						class="q-mt-sm"
						:rules="[(val) => !!val || 'Harus diisi!']"
					/>
					<q-select
						label="Pengajuan"
						v-model="input.pengajuan"
						dense
						outlined
						class="q-mt-sm"
						:options="[
							'Baru',
							'Perpanjangan ke-1',
							'Perpanjangan ke-2',
						]"
						:disable="input.sifat == 'Pulang' ? false : true"
					/>

					<q-input
						dense
						:hint="
							isDate(input.dari_tgl)
								? formatDateFull(input.dari_tgl)
								: ''
						"
						class="q-mt-sm"
						outlined
						label="Tanggal (M)*"
						v-model="input.dari_tgl"
						type="date"
						:rules="[(val) => !!val || 'Harus diisi!']"
						error-color="negative"
					/>
					<q-input
						dense
						hint=""
						class="q-mt-sm"
						outlined
						label="Durasi (hari)*"
						v-model="input.durasi"
						:rules="[
							(val) => !!val || 'Harus diisi!',
							(val) => !val || !isNaN(val) || 'Hanya angka',
						]"
						error-color="negative"
					/>
					<input-select-array
						v-model="input.keperluan"
						url="keperluan-izin"
						label="Keperluan *"
						class="q-mt-sm"
						:rules="[(val) => !!val || 'Harus diisi!']"
					/>

					<input-select-array
						v-model="input.keterangan"
						url="keterangan-izin"
						label="Keterangan"
						class="q-mt-sm"
					/>

					<q-input
						dense
						class="q-mt-sm"
						outlined
						label="Tujuan"
						v-model="input.tujuan"
						autogrow=""
					/>
					<q-input
						dense
						class="q-mt-sm"
						outlined
						label="Catatan"
						v-model="input.catatan"
						autogrow=""
					/>
				</div>
			</q-card-section>

			<FormActions
				:btn-delete="input.id ? true : false"
				@on-delete="onDelete"
			/>
			<!-- <pre>{{ input }}</pre> -->
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import apiDelete from 'src/api/api-delete';
import { isDate, formatDateFull } from 'src/utils/format-date';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
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

const input = ref({ pengajuan: 'Baru', tujuan: 'Sesuai alamat rumah' });
const loadingCrud = ref(false);

async function onSubmit() {
	const data = {
		santri_id: input.value.santri_id,
		sifat: input.value.sifat,
		pengajuan: input.value.pengajuan,
		dari_tgl: input.value.dari_tgl,
		durasi: input.value.durasi,
		keperluan: input.value.keperluan,
		keterangan: input.value.keterangan,
		tujuan: input.value.tujuan,
		catatan: input.value.catatan,
	};
	// console.log(data);
	// return;
	let response = null;
	const isNew = !input.value.id;
	if (!isNew) {
		response = await apiUpdate({
			endPoint: `izin-pesantren/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	} else {
		response = await apiPost({
			endPoint: 'izin-pesantren',
			data,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.izin_pesantren);
		if (isNew) {
			emit('successCreate', response?.izin_pesantren);
		} else {
			emit('successUpdate', response?.izin_pesantren);
		}
	}
}

const onDelete = async () => {
	const id = input.value.id;
	const result = await apiDelete({
		endPoint: `izin-pesantren/${id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close-form').click();
		emit('successDelete', id);
	}
};

onMounted(async () => {
	Object.assign(input.value, props.data);
	// console.log(props.santri);
});
</script>
<style lang=""></style>
