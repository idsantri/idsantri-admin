<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="setBack">
			<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
				<div class="text-subtitle1">Tetapkan Tanggal Kembali</div>
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<div v-if="loading">
					<q-dialog v-model="loading" persistent="">
						<q-spinner-cube
							color="green-12"
							size="8em"
							class="flex q-ma-lg q-mx-auto"
						/>
					</q-dialog>
				</div>
				<q-input
					dense
					:hint="
						isDate(input.kembali_tgl)
							? formatDateFull(input.kembali_tgl)
							: ''
					"
					class="q-mt-sm"
					outlined
					label="Tanggal (M)*"
					v-model="input.kembali_tgl"
					type="datetime-local"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
				/>
			</q-card-section>
			<q-card-actions class="bg-green-6 text-green-11 q-pa-sm">
				<q-btn
					label="Belum Kembali"
					no-caps
					class="q-px-sm text-red-1"
					color="negative"
					@click="setNotBack"
				/>
				<q-space />
				<q-btn
					label="Tutup"
					no-caps
					class="q-px-sm"
					color="green-4"
					v-close-popup
					id="btn-close-crud"
				/>
				<q-btn
					label="Simpan"
					no-caps
					class="q-px-sm"
					color="green-10"
					type="submit"
				/>
			</q-card-actions>
			<!-- {{ input }} -->
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import apiUpdate from 'src/api/api-update';
import {
	formatDateFull,
	isDate,
	formatDateTimeHtmlToSql,
} from 'src/utils/format-date';

const props = defineProps({
	data: Object,
});
const emit = defineEmits(['successSubmit']);

const input = ref({});
const loading = ref(false);

async function setBack() {
	const updated = await apiUpdate({
		endPoint: `izin-pesantren/${input.value.id}/set-kembali`,
		loading,
		data: {
			kembali_tgl: input.value.kembali_tgl,
		},
		message: 'Tetapkan sudah kembali ke pesantren pada tanggal ini?',
	});
	if (updated) {
		document.getElementById('btn-close-crud').click();
		emit('successSubmit');
	}
	// console.log('back');
}

async function setNotBack() {
	const updated = await apiUpdate({
		endPoint: `izin-pesantren/${input.value.id}/set-kembali`,
		loading,
		data: {
			kembali_tgl: null,
		},
		message: 'Tetapkan belum kembali ke pesantren?',
	});
	if (updated) {
		document.getElementById('btn-close-crud').click();
		emit('successSubmit');
	}
	// console.log('not back');
}

onMounted(() => {
	input.value = props.data;
	// console.log(input.value);
});

watch(
	() => input.value.kembali_tgl,
	(newValue) => {
		input.value.kembali_tgl = formatDateTimeHtmlToSql(newValue);
	},
);
</script>
<style lang=""></style>
