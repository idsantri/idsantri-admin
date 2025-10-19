<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="setBack">
			<FormHeader title="Tetapkan Tanggal Kembali" :is-new="false" />
			<FormLoading v-if="loadingCrud" />
			<q-card-section class="q-pa-sm">
				<q-input
					dense
					:hint="
						isDate(input.kembali_tgl)
							? formatDateFull(input.kembali_tgl)
							: ''
					"
					class="q-my-sm"
					outlined
					label="Tanggal (M)*"
					v-model="input.kembali_tgl"
					type="datetime-local"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
				/>
			</q-card-section>
			<FormActions
				:btn-delete="!!data.kembali_tgl"
				@on-delete="setNotBack"
				label-delete="Belum Kembali"
			/>
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
const loadingCrud = ref(false);

async function setBack() {
	const updated = await apiUpdate({
		endPoint: `izin-pesantren/${input.value.id}/set-kembali`,
		loading: loadingCrud,
		data: {
			kembali_tgl: input.value.kembali_tgl,
		},
		message: 'Tetapkan sudah kembali ke pesantren pada tanggal ini?',
	});
	if (updated) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit');
	}
	// console.log('back');
}

async function setNotBack() {
	const updated = await apiUpdate({
		endPoint: `izin-pesantren/${input.value.id}/set-kembali`,
		loading: loadingCrud,
		data: {
			kembali_tgl: null,
		},
		message: 'Tetapkan belum kembali ke pesantren?',
	});
	if (updated) {
		document.getElementById('btn-close-form').click();
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
