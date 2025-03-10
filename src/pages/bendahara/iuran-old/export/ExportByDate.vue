<template lang="">
	<q-form @submit.prevent="onSubmit">
		<q-card class="">
			<q-card-section
				class="q-pa-sm text-subtitle2 text-italic bg-green-11"
			>
				Pilih rentang pembayaran iuran!
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<q-input
					dense
					class=""
					outlined
					label="Dari Tanggal (M)*"
					v-model="input.start_date"
					type="date"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
					:hint="
						isDate(input.start_date)
							? formatDateFull(input.start_date) +
								' | ' +
								bacaHijri(m2h(input.start_date))
							: ''
					"
				/>
				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Sampai Tanggal (M)*"
					v-model="input.end_date"
					type="date"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="negative"
					:hint="
						isDate(input.end_date)
							? formatDateFull(input.end_date) +
								' | ' +
								bacaHijri(m2h(input.end_date))
							: ''
					"
				/>
			</q-card-section>
			<q-card-actions class="q-pa-sm bg-green-6" align="right">
				<q-btn
					label="Unduh"
					icon="download"
					no-caps
					class="bg-green-10 text-green-11"
					type="submit"
				/>
			</q-card-actions>
		</q-card>
	</q-form>
</template>
<script setup>
import { ref, toRefs } from 'vue';
import loadingStore from 'src/stores/loading-store';
import apiGet from 'src/api/api-get';
import { m2h, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDateFull } from 'src/utils/format-date';
import { notifyError, notifyWarning } from 'src/utils/notify';

const input = ref({});
const { loadingMain } = toRefs(loadingStore());

async function onSubmit() {
	const params = JSON.parse(JSON.stringify(input.value));
	if (params.end_date < params.start_date) {
		return notifyError(
			'Tanggal akhir setidaknya sama atau lebih besar daripada tanggal awal!',
		);
	}
	const data = await apiGet({
		endPoint: 'export/iuran-old',
		loading: loadingMain,
		params,
	});

	if (!data) return;
	if (!data.url) return notifyWarning('Url tidak ditemukan');

	let link = document.createElement('a');
	link.href = data.url;
	link.click();
	link.remove();
}
</script>
<style lang=""></style>
