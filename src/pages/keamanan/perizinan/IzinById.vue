<template lang="">
	<q-page class="">
		<div class="row" style="max-width: 1200px">
			<div class="col-xs-12 col-sm-6">
				<q-card class="q-ma-sm">
					<q-card-section class="bg-green-8 no-padding">
						<q-toolbar class="no-padding no-margin">
							<q-toolbar-title
								class="text-subtitle1 q-ml-sm text-green-11"
							>
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
							<q-card-section
								class="q-pa-sm text-subtitle1 bg-green-11 flex"
							>
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
								<div v-if="loading">
									<q-spinner-cube
										color="green-12"
										size="8em"
										class="flex q-ma-lg q-mx-auto"
									/>
								</div>
								<table v-else class="full-width">
									<tr>
										<td class="text-italic">Sifat:</td>
										<td>{{ izin.sifat }}</td>
									</tr>
									<tr>
										<td class="text-italic">Pengajuan:</td>
										<td>{{ izin.pengajuan }}</td>
									</tr>
									<tr>
										<td class="text-italic">Durasi:</td>
										<td>
											{{ izin.durasi + ' hari' }}
										</td>
									</tr>
									<tr>
										<td class="text-italic">
											Dari Tanggal:
										</td>
										<td>
											{{
												formatDateFull(izin.dari_tgl) +
												' | ' +
												bacaHijri(m2h(izin.dari_tgl))
											}}
										</td>
									</tr>
									<tr>
										<td class="text-italic">
											Sampai Tanggal:
										</td>
										<td>
											{{
												formatDateFull(
													izin.sampai_tgl,
												) +
												' | ' +
												bacaHijri(m2h(izin.sampai_tgl))
											}}
										</td>
									</tr>

									<tr>
										<td class="text-italic">Keperluan:</td>
										<td>
											{{ izin.keperluan }}
										</td>
									</tr>
									<tr>
										<td class="text-italic">Keterangan:</td>
										<td>
											{{ izin.keterangan ?? '-' }}
										</td>
									</tr>
									<tr>
										<td class="text-italic">Tujuan:</td>
										<td>
											{{ izin.tujuan }}
										</td>
									</tr>
									<tr>
										<td class="text-italic">Catatan:</td>
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
										<td class="text-italic">Kembali:</td>
										<td>
											{{
												formatDateFull(
													izin.kembali_tgl,
												) +
												' | ' +
												bacaHijri(m2h(izin.kembali_tgl))
											}}
										</td>
									</tr>
									<tr>
										<td class="text-italic">Status:</td>
										<td>
											{{
												izin.status
													? replaceDynamicText(
															izin.status,
														)
													: ''
											}}
										</td>
									</tr>
								</table>
							</q-card-section>
						</q-card>
					</q-card-section>
				</q-card>
			</div>

			<div class="col-xs-12 col-sm-6">
				<IzinRiwayat class="q-ma-sm" :santri_id="izin.santri_id" />
			</div>
		</div>
		<q-dialog v-model="crudShow">
			<izin-crud
				:data="izin"
				@success-delete="$router.go(-1)"
				@success-submit="loadData"
			/>
		</q-dialog>
		<q-dialog v-model="showKembali">
			<izin-kembali
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
		<!-- <pre>{{ izin }}</pre> -->
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import { formatDateFull } from 'src/utils/format-date';
import { bacaHijri, m2h } from 'src/utils/hijri';
import IzinCrud from 'src/pages/keamanan/perizinan/IzinCrud.vue';
import IzinKembali from 'src/pages/keamanan/perizinan/IzinKembali.vue';
import ReportViewer from 'src/components/ReportViewer.vue';
import IzinRiwayat from './IzinRiwayat.vue';
import CardSantriSimple from 'src/components/santri/CardSantriSimple.vue';

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
	const data = await apiGet({
		endPoint: `izin-pesantren/${route.params.id}`,
		loading,
	});
	if (data) {
		izin.value = data.izin_pesantren;
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
</style>
