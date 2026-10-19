<template lang="">
	<CardPage>
		<CardHeader title="Detail Izin Pesantren" :show-reload="false" />

		<q-card-section
			class="tw:flex tw:flex-col tw:sm:flex-row tw:sm:justify-between tw:gap-2 q-pa-sm"
			style="max-width: 1200px"
		>
			<q-card class="tw:w-full" flat bordered>
				<q-card-section class="bg-green-7 no-padding">
					<q-toolbar class="no-padding no-margin">
						<q-btn
							icon="sync"
							no-caps
							@click="loadData"
							flat
							dense
							class="q-pl-sm"
							color="green-11"
							title="Muat ulang"
						/>
						<q-toolbar-title class="text-subtitle1 text-green-11 q-px-none">
							Data Perizinan
						</q-toolbar-title>
						<q-btn
							dense
							class="q-px-md q-mr-sm text-green-10"
							label="Cetak"
							no-caps=""
							icon="print"
							color="green-11"
							@click="print"
						/>
						<q-btn
							dense
							class="q-px-md q-mr-sm text-green-10"
							label="Edit"
							no-caps=""
							icon="edit"
							color="green-11"
							@click="crudShow = true"
						/>
					</q-toolbar>
				</q-card-section>
				<q-card-section class="q-pa-sm" v-if="izin">
					<CardSantriSimple :id="izin.santri_id" />
					<q-card bordered flat class="q-mt-sm">
						<q-card-section class="q-pa-sm text-subtitle1 bg-green-11 flex">
							Data Izin
							<q-space />
							<q-btn
								dense
								label="Kembali"
								icon="manage_history"
								no-caps
								class="q-px-sm bg-green-10 text-green-12"
								@click="showKembali = true"
							/>
						</q-card-section>

						<q-card-section class="q-pa-sm">
							<table class="full-width">
								<tbody>
									<tr>
										<td class="">Sifat:</td>
										<td>{{ izin.sifat }}</td>
									</tr>
									<tr>
										<td class="">Pengajuan:</td>
										<td>{{ izin.pengajuan }}</td>
									</tr>
									<tr>
										<td class="">Durasi:</td>
										<td>
											{{ izin.durasi + ' hari' }}
										</td>
									</tr>
									<tr>
										<td class="">Dari Tanggal:</td>
										<td>
											{{
												formatDateFull(izin.dari_tgl) +
												' | ' +
												bacaHijri(masehiToHijri(izin.dari_tgl))
											}}
										</td>
									</tr>
									<tr>
										<td class="">Sampai Tanggal:</td>
										<td>
											{{
												formatDateFull(izin.sampai_tgl) +
												' | ' +
												bacaHijri(masehiToHijri(izin.sampai_tgl))
											}}
										</td>
									</tr>
									<tr>
										<td class="">Keperluan:</td>
										<td>
											{{ izin.keperluan }}
										</td>
									</tr>
									<tr>
										<td class="">Keterangan:</td>
										<td>
											{{ izin.keterangan ?? '-' }}
										</td>
									</tr>
									<tr>
										<td class="">Tujuan:</td>
										<td>
											{{ izin.tujuan }}
										</td>
									</tr>
									<tr>
										<td class="">Catatan:</td>
										<td>
											{{ izin.catatan || '-' }}
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<q-separator color="green-8" />
										</td>
									</tr>
									<tr>
										<td class="">Kembali:</td>
										<td>
											{{
												formatDateFull(izin.kembali_tgl) +
												' | ' +
												bacaHijri(masehiToHijri(izin.kembali_tgl))
											}}
										</td>
									</tr>
									<tr>
										<td class="">Status:</td>
										<td>
											{{ izin.status ? replaceDynamicText(izin.status) : '' }}
										</td>
									</tr>
								</tbody>
							</table>
							<CardLoading :showing="loading" />
						</q-card-section>
					</q-card>
				</q-card-section>
			</q-card>

			<div class="tw:w-full">
				<IzinRiwayat class="" :santri_id="izin.santri_id" />
			</div>
		</q-card-section>

		<q-dialog v-model="crudShow">
			<IzinPesantrenForm :data="izin" @success-delete="$router.go(-1)" @success-submit="loadData" />
		</q-dialog>
		<q-dialog v-model="showKembali">
			<IzinPesantrenKembaliForm
				:data="{
					id: izin.id,
					kembali_tgl: izin.kembali_tgl,
				}"
				@success-submit="loadData"
			/>
		</q-dialog>
		<q-dialog v-model="showViewer">
			<ReportViewer :url="urlReport" />
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateFull } from 'src/utils/format-date';
import { bacaHijri, masehiToHijri } from 'src/utils/hijri';
import ReportViewer from 'src/components/ReportViewer.vue';
import IzinRiwayat from './part/IzinRiwayat.vue';
import CardSantriSimple from 'src/components/santri/CardSantriSimple.vue';
import IzinPesantrenForm from 'src/components/forms/IzinPesantrenForm.vue';
import IzinPesantrenKembaliForm from 'src/components/forms/IzinPesantrenKembaliForm.vue';
import IzinPesantren from 'src/models/IzinPesantren';

const showViewer = ref(false);
const urlReport = ref('');
const route = useRoute();
const izin = ref({});
const loading = ref(false);
const crudShow = ref(false);
const showKembali = ref(false);

function print() {
	urlReport.value = `reports/izin-pesantren/view?id=${izin.value.id}`;
	// console.log(urlReport.value);
	showViewer.value = true;
}

async function loadData() {
	try {
		loading.value = true;
		const data = await IzinPesantren.getById({ id: route.params.id });
		izin.value = data.izin_pesantren;
	} catch (error) {
		console.log('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	if (route.params.id) await loadData();
});

function replaceDynamicText(inputString) {
	// Menggunakan regular expression untuk mencari pola "(+angka)"
	const regex = /\(\+(\d+)\)/g;
	// Menggantikan setiap pola dengan "(terlambat angka hari)"
	const result = inputString.replace(regex, (match, number) => {
		return `(terlambat ${number} hari)`;
	});

	return result;
}
</script>

<style scoped>
td {
	vertical-align: top;
}
tr td:first-child {
	width: 120px;
	font-style: italic;
}
</style>
