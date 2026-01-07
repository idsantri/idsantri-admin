<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="setBack">
			<FormHeader title="Tetapkan Tanggal Kembali" :is-new="false" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					dense
					:hint="isDate(inputs.kembali_tgl) ? formatDateFull(inputs.kembali_tgl) : ''"
					class="q-my-sm"
					outlined
					label="Tanggal (M)*"
					v-model="inputs.kembali_tgl"
					type="datetime-local"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
					ref="firstInput"
				/>
			</q-card-section>
			<FormActions :btn-delete="!!data.kembali_tgl" @on-delete="setNotBack" label-delete="Belum Kembali" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';
import { formatDateFull, isDate, formatDateTimeHtmlToSql } from 'src/utils/format-date';
import IzinPesantren from 'src/models/IzinPesantren';

const props = defineProps({
	data: Object,
});

const emit = defineEmits(['successSubmit']);

const inputs = ref({ ...props.data });
const loading = ref(false);
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

async function setBack() {
	try {
		loading.value = true;

		const response = await IzinPesantren.setKembali({
			id: props.data.id,
			data: { kembali_tgl: inputs.value.kembali_tgl },
			message: 'Tetapkan sudah kembali ke pesantren pada tanggal ini?',
		});

		if (response) {
			document.getElementById('btn-close-form').click();
			emit('successSubmit', response?.izin_pesantren);
		}
	} catch (error) {
		console.error('err set not back', error);
	} finally {
		loading.value = false;
	}
}

async function setNotBack() {
	try {
		loading.value = true;

		const response = await IzinPesantren.setKembali({
			id: props.data.id,
			data: { kembali_tgl: null },
			message: 'Tetapkan belum kembali ke pesantren?',
		});

		if (response) {
			document.getElementById('btn-close-form').click();
			emit('successSubmit', response?.izin_pesantren);
		}
	} catch (error) {
		console.error('err set not back', error);
	} finally {
		loading.value = false;
	}
}

watch(
	() => inputs.value.kembali_tgl,
	(newValue) => {
		inputs.value.kembali_tgl = formatDateTimeHtmlToSql(newValue);
	},
);
</script>
<style lang=""></style>
