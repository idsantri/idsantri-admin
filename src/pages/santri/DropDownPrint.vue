<template lang="">
	<q-btn-dropdown color="green-10" no-caps dense outline class="q-px-sm text-green-11" :disable="loadingDownload">
		<template v-slot:label>
			<q-spinner v-if="loadingDownload" class="q-mr-sm" />
			<q-icon v-else name="print" class="q-mr-sm" />
			<span v-if="!$q.screen.lt.sm"> Cetak / Unduh </span>
		</template>
		<q-list>
			<q-item v-close-popup>
				<q-item-section>
					<q-item-label>Registrasi</q-item-label>
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="download" flat @click="downloadRegistrasi" />
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="print" flat @click="printRegistrasi" />
				</q-item-section>
			</q-item>

			<q-item v-close-popup>
				<q-item-section>
					<q-item-label>Standbook</q-item-label>
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="download" flat @click="downloadStandbook" />
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="print" flat @click="printStandbook" />
				</q-item-section>
			</q-item>

			<q-item v-close-popup>
				<q-item-section>
					<q-item-label>Permohonan Berhenti</q-item-label>
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="download" flat disable />
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="print" flat @click="dialogPermohonan = true" />
				</q-item-section>
			</q-item>

			<q-item v-close-popup>
				<q-item-section>
					<q-item-label>Keterangan Berhenti</q-item-label>
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="download" flat @click="downloadKeterangan" />
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="print" flat @click="printKeterangan" />
				</q-item-section>
			</q-item>

			<q-item v-close-popup>
				<q-item-section>
					<q-item-label>ID Card</q-item-label>
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="download" flat @click="downloadIdCard" />
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="print" flat disable />
				</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>

	<q-dialog v-model="dialogPermohonan">
		<SantriPermohonanBerhentiForm @success-submit="printPermohonan" :data="props.santri" />
	</q-dialog>

	<q-dialog v-model="showViewer">
		<ReportViewer :url="urlReport" />
	</q-dialog>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ReportViewer from 'src/components/ReportViewer.vue';
import SantriPermohonanBerhentiForm from 'src/components/forms/SantriPermohonanBerhentiForm.vue';
import DownloadFile from 'src/models/DownloadFile';

const props = defineProps({
	santri: { type: Object, required: true },
});

const route = useRoute();
const dialogPermohonan = ref(false);
const urlReport = ref('');
const showViewer = ref(false);
const fileName = computed(() => {
	const namaSantri = props.santri.nama.replace(/\s+/g, '_').toLowerCase();
	return `${props.santri.id}-${namaSantri}.pdf`;
});
const loadingDownload = ref(false);

async function downloadRegistrasi() {
	try {
		loadingDownload.value = true;
		await DownloadFile.santriRegistrasi(props.santri.id, 'registrasi-' + fileName.value);
	} catch (error) {
		console.error('Error downloading registrasi:', error);
	} finally {
		loadingDownload.value = false;
	}
}

async function downloadStandbook() {
	try {
		loadingDownload.value = true;
		await DownloadFile.santriStandbook(props.santri.id, 'standbook-' + fileName.value);
	} catch (error) {
		console.error('Error downloading standbook:', error);
	} finally {
		loadingDownload.value = false;
	}
}

async function downloadKeterangan() {
	try {
		loadingDownload.value = true;
		await DownloadFile.santriKeteranganBerhenti(props.santri.id, 'keterangan-berhenti-' + fileName.value);
	} catch (error) {
		console.error('Error downloading keterangan berhenti:', error);
	} finally {
		loadingDownload.value = false;
	}
}

async function downloadIdCard() {
	try {
		loadingDownload.value = true;
		await DownloadFile.santriIdCard(props.santri.id, 'id-card-' + fileName.value);
	} catch (error) {
		console.error('Error downloading id card:', error);
	} finally {
		loadingDownload.value = false;
	}
}

function printRegistrasi() {
	urlReport.value = `reports/santri/registrasi/view?id=${route.params.id}`;
	showViewer.value = true;
}

function printStandbook() {
	urlReport.value = `reports/santri/standbook/view?id=${route.params.id}`;
	showViewer.value = true;
}

function printPermohonan(val) {
	dialogPermohonan.value = false;
	const queryString = new URLSearchParams(val).toString();

	urlReport.value = `reports/santri/permohonan-berhenti/view?${queryString}`;
	showViewer.value = true;
}

function printKeterangan() {
	urlReport.value = `reports/santri/keterangan-berhenti/view?id=${route.params.id}`;
	showViewer.value = true;
}
</script>
<style lang=""></style>
