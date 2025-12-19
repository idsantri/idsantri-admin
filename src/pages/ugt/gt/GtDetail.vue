<template lang="">
	<CardPage>
		<CardHeader title="Data Guru Tugas" @on-reload="loadData" />
		<div class="row" style="max-width: 1200px">
			<div class="col-12 col-md-6 q-my-sm">
				<!-- GT -->
				<q-card class="q-mx-sm" flat bordered>
					<q-card-section class="bg-green-7 no-padding">
						<q-toolbar class="no-padding no-margin">
							<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11">
								Identitas GT
							</q-toolbar-title>
							<q-btn
								dense
								class="q-px-md q-mr-sm text-green-10"
								label="Edit"
								no-caps=""
								icon="edit"
								color="green-2"
								@click="crudShow = true"
							/>
						</q-toolbar>
					</q-card-section>
					<q-card-section class="q-pa-sm">
						<q-markup-table flat class="text-green-10">
							<tbody>
								<tr>
									<td>ID</td>
									<td>{{ gt.id }}</td>
								</tr>
								<tr>
									<td>Tahun Ajaran</td>
									<td>{{ gt.th_ajaran_h }}</td>
								</tr>
								<tr>
									<td>Santri ID</td>
									<td>
										<div class="flex flex-center">
											<div>
												{{ gt.santri_id }}
											</div>

											<q-space />
											<q-btn
												class="bg-green-11"
												icon="info"
												glossy
												round
												dense
												:to="`/santri/${gt.santri_id}`"
											/>
										</div>
									</td>
								</tr>
								<tr>
									<td>Nama</td>
									<td>{{ gt.nama }}</td>
								</tr>
								<tr>
									<td>Data Akhir</td>
									<td>{{ gt.data_akhir }}</td>
								</tr>
								<tr>
									<td>No Telepon</td>
									<td>{{ gt.telepon }}</td>
								</tr>
								<tr>
									<td>Email</td>
									<td>{{ gt.email }}</td>
								</tr>
							</tbody>
						</q-markup-table>
						<CardLoading :showing="loading" />
					</q-card-section>
					<q-card-actions class="bg-green-7 flex items-center justify-between q-pt-none q-gutter-y-sm">
						<div class="flex q-gutter-x-sm">
							<q-btn
								label="Sertifikat"
								dense
								no-caps
								icon="download"
								color="green-11"
								class="q-px-md text-green-10"
								@click="downloadSertifikat"
								title="Cetak Sertifikat"
							/>
							<q-btn
								label="Surat Tugas"
								dense
								no-caps
								icon="download"
								color="green-11"
								class="q-px-md text-green-10"
								@click="downloadSuratTugas"
								title="Cetak Surat Tugas"
							/>
						</div>
						<div class="flex q-gutter-x-sm">
							<q-btn
								label="Sertifikat"
								dense
								no-caps
								icon="print"
								color="green-11"
								class="q-px-md text-green-10"
								@click="viewSertifikat"
								title="Cetak Sertifikat"
							/>
							<q-btn
								label="Surat Tugas"
								dense
								no-caps
								icon="print"
								color="green-11"
								class="q-px-md text-green-10"
								@click="viewSuratTugas"
								title="Cetak Surat Tugas"
							/>
						</div>
					</q-card-actions>
				</q-card>
			</div>
			<div class="col-12 col-md-6 q-my-sm">
				<!-- pjgt -->
				<q-card class="q-mx-sm" flat bordered>
					<q-card-section class="bg-green-7 no-padding">
						<q-toolbar class="no-padding no-margin">
							<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11"> Data PJGT </q-toolbar-title>
						</q-toolbar>
					</q-card-section>
					<q-card-section class="q-pa-sm">
						<q-markup-table flat class="text-green-10">
							<tbody>
								<tr>
									<td>PJGT ID</td>
									<td>
										<div class="flex flex-center">
											<div>
												{{ gt.pjgt_id }}
											</div>

											<q-space />
											<q-btn
												class="bg-green-11"
												icon="info"
												glossy
												round
												dense
												:to="`/ugt/pjgt/${gt.pjgt_id}`"
											/>
										</div>
									</td>
								</tr>
								<tr>
									<td>Nama</td>
									<td>{{ gt.pjgt_nama }}</td>
								</tr>
								<tr>
									<td>Alamat</td>
									<td>
										{{ gt.pjgt_alamat }}
									</td>
								</tr>
								<tr>
									<td>Wilayah</td>
									<td>{{ gt.pjgt_wilayah }}</td>
								</tr>
								<tr>
									<td>Lembaga</td>
									<td>{{ gt.pjgt_lembaga }}</td>
								</tr>
								<tr>
									<td>Administrasi</td>
									<td>
										Rp{{ digitSeparator(gt.administrasi_nominal || 0) }} ({{
											gt.administrasi_count || 0
										}}x)
									</td>
								</tr>
							</tbody>
						</q-markup-table>
						<CardLoading :showing="loading" />
					</q-card-section>
				</q-card>
			</div>
		</div>

		<q-dialog persistent="" v-model="crudShow">
			<UgtGtForm :data="gt" @success-submit="loadData()" @success-delete="$router.go(-1)" />
		</q-dialog>
		<q-dialog v-model="showViewer">
			<ReportViewer :url="urlReport" />
		</q-dialog>
		<!-- <pre>{{ gt }}</pre> -->
	</CardPage>
</template>
<script setup>
import { digitSeparator } from 'src/utils/format-number';
import { onMounted, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import UgtGtForm from 'src/components/forms/UgtGtForm.vue';
import ReportViewer from 'src/components/ReportViewer.vue';
import loadingStore from 'src/stores/loading-store';
import UgtGt from 'src/models/UgtGt';
import DownloadFile from 'src/models/DownloadFile';

const route = useRoute();
const id = route.params.id;
const loading = ref(false);
const gt = ref({});
const crudShow = ref(false);
const urlReport = ref('');
const { loadingMain } = toRefs(loadingStore());

async function loadData() {
	try {
		loading.value = true;
		const data = await UgtGt.getById({ id, notifySuccess: true });
		gt.value = data.gt;
	} catch (_err) {
		// console.error(_err);
		console.log('error get gt');
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});

const showViewer = ref(false);
async function viewSuratTugas() {
	urlReport.value = `reports/ugt/surat-tugas/view?id=${gt.value.id}`;
	showViewer.value = true;
}

async function viewSertifikat() {
	urlReport.value = `reports/ugt/sertifikat/view?id=${gt.value.id}`;
	showViewer.value = true;
}

async function downloadSuratTugas() {
	try {
		loadingMain.value = true;
		await DownloadFile.GtSuratTugas(gt.value.id, 'gt-surat-tugas-' + gt.value.id + '.pdf');
	} catch (error) {
		console.error('Error downloading surat tugas:', error);
	} finally {
		loadingMain.value = false;
	}
}

async function downloadSertifikat() {
	try {
		loadingMain.value = true;
		await DownloadFile.GtSertifikat(gt.value.id, 'gt-sertifikat-' + gt.value.id + '.pdf');
	} catch (error) {
		console.error('Error downloading sertifikat:', error);
	} finally {
		loadingMain.value = false;
	}
}
</script>
<style scoped>
td {
	white-space: normal;
	word-wrap: break-word;
}
</style>
