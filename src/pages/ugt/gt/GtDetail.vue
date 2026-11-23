<template>
	<CardPage>
		<CardHeader title="Data Guru Tugas" @on-reload="loadData" />
		<q-card-section
			class="tw:flex tw:flex-col tw:sm:flex-row tw:sm:justify-between tw:gap-2 q-pa-sm"
			style="max-width: 1200px"
		>
			<!-- GT -->
			<q-card class="tw:w-full" flat bordered>
				<q-card-section class="bg-green-7 no-padding">
					<q-toolbar class="no-padding no-margin">
						<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11"> Identitas GT </q-toolbar-title>
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
				<SectionGt :gt="gt" :loading="loading" />
				<q-card-actions class="bg-green-7 flex items-center justify-between q-pt-none q-gutter-y-sm">
					<div class="flex q-gutter-x-sm">
						<q-btn
							dense
							no-caps
							color="green-11"
							class="q-px-md text-green-10"
							@click="downloadSertifikat"
							title="Cetak Sertifikat"
							:disable="loadingSertifikat"
						>
							<template v-slot:default v-if="loadingSertifikat">
								<q-spinner />
								Sertifikat
							</template>
							<template v-slot:default v-else>
								<q-icon name="download" />
								Sertifikat
							</template>
						</q-btn>
						<q-btn
							dense
							no-caps
							color="green-11"
							class="q-px-md text-green-10"
							@click="downloadSuratTugas"
							title="Cetak Surat Tugas"
							:disable="loadingSurat"
						>
							<template v-slot:default v-if="loadingSurat">
								<q-spinner />
								Surat Tugas
							</template>
							<template v-slot:default v-else>
								<q-icon name="download" />
								Surat Tugas
							</template>
						</q-btn>
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

			<!-- TABS -->
			<q-card class="tw:w-full" flat bordered>
				<q-card-section class="bg-green-7 no-padding">
					<q-toolbar class="no-padding no-margin">
						<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11"> Data PJGT </q-toolbar-title>
						<q-tabs no-caps class="bg-green-9 text-green-11" v-model="tab">
							<q-route-tab name="pjgt" :to="{ query: { tab: 'pjgt' } }" exact replace label="PJGT" />
							<q-route-tab
								name="laporan"
								:to="{ query: { tab: 'laporan' } }"
								exact
								replace
								label="Laporan"
							/>
						</q-tabs>
					</q-toolbar>
				</q-card-section>
				<q-card-section class="q-pa-sm">
					<q-tab-panels v-model="tab" animated>
						<q-tab-panel name="pjgt" class="no-padding">
							<TabPjgt :gt="gt" :loading="loading" />
						</q-tab-panel>

						<q-tab-panel name="laporan" class="no-padding">
							<TabLaporan :gt-id="id" />
						</q-tab-panel>
					</q-tab-panels>
				</q-card-section>
			</q-card>
		</q-card-section>

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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import UgtGtForm from 'src/components/forms/UgtGtForm.vue';
import ReportViewer from 'src/components/ReportViewer.vue';
import UgtGt from 'src/models/UgtGt';
import DownloadFile from 'src/models/DownloadFile';
import { useRouteQuery } from '@vueuse/router';
import TabPjgt from './TabPjgt.vue';
import TabLaporan from './TabLaporan.vue';
import SectionGt from './SectionGt.vue';

const route = useRoute();
const id = route.params.id;
const loading = ref(false);
const gt = ref({});
const crudShow = ref(false);
const urlReport = ref('');
const loadingSurat = ref(false);
const loadingSertifikat = ref(false);
const tab = useRouteQuery('tab', null);

async function loadData() {
	try {
		loading.value = true;
		const data = await UgtGt.getById({ id, notifySuccess: true });
		if (data) {
			gt.value = data.gt;
		}
	} catch (_err) {
		// console.error(_err);
		console.log('error get gt');
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	if (!tab.value) {
		tab.value = 'pjgt';
	}
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
		loadingSurat.value = true;
		await DownloadFile.GtSuratTugas(gt.value.id, 'gt-surat-tugas-' + gt.value.id + '.pdf');
	} catch (error) {
		console.error('Error downloading surat tugas:', error);
	} finally {
		loadingSurat.value = false;
	}
}

async function downloadSertifikat() {
	try {
		loadingSertifikat.value = true;
		await DownloadFile.GtSertifikat(gt.value.id, 'gt-sertifikat-' + gt.value.id + '.pdf');
	} catch (error) {
		console.error('Error downloading sertifikat:', error);
	} finally {
		loadingSertifikat.value = false;
	}
}
</script>
<style scoped>
td {
	white-space: normal;
	word-wrap: break-word;
}
</style>
