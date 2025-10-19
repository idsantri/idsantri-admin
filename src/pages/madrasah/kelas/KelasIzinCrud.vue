<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
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
				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Data Kelas"
					:model-value="
						input?.th_ajaran_h +
						' | ' +
						input?.tingkat_id +
						' | ' +
						input?.kelas
					"
					disable=""
					filled=""
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
					label="Catatan"
					v-model="input.catatan"
					autogrow=""
				/>
			</q-card-section>
			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="!props.isNew"
					label="Hapus"
					class="bg-red text-red-1"
					no-caps=""
					@click="handleDelete"
				/>
				<q-space />
				<q-btn
					label="Tutup"
					v-close-popup
					class="bg-green-11"
					no-caps=""
					id="btn-close-crud"
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
import apiUpdate from 'src/api/api-update';
import apiPost from 'src/api/api-post';
import apiDelete from 'src/api/api-delete';
import { formatDateFull, isDate } from 'src/utils/format-date';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import FormHeader from 'src/components/forms/parts/FormHeader.vue';

const props = defineProps({
	data: { type: Object, required: true },
	isNew: { type: Boolean, default: true },
	title: { type: String, default: () => 'Input' },
});
const emit = defineEmits(['successSubmit', 'successDelete']);

const input = ref({ keperluan: 'Sakit', durasi: 1 });
const loadingCrud = ref(false);

onMounted(async () => {
	Object.assign(input.value, props.data);
});

const onSubmit = async () => {
	// console.log(input.value.id);
	// return;
	const data = {
		kelas_id: input.value.kelas_id,
		dari_tgl: input.value.dari_tgl,
		durasi: input.value.durasi,
		keperluan: input.value.keperluan,
		keterangan: input.value.keterangan,
		catatan: input.value.catatan,
	};
	// console.log(data);
	// return;
	let response = null;
	if (props.isNew) {
		// console.log(data);
		// return;
		response = await apiPost({
			endPoint: 'izin-madrasah',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `izin-madrasah/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-crud').click();
		emit('successSubmit');
	}
};

const handleDelete = async () => {
	const result = await apiDelete({
		endPoint: `izin-madrasah/${input.value.id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close-crud').click();
		emit('successDelete');
	}
};
</script>
