<template lang="">
	<q-btn-dropdown
		color="green-10"
		label="Cetak"
		icon="print"
		no-caps
		class="text-green-11 q-px-md"
		size="sm"
	>
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
		<PermohonanBerhenti @submitted="printPermohonan" />
	</q-dialog>

	<q-dialog v-model="showViewer">
		<ReportViewer :url="urlReport" />
	</q-dialog>
</template>
<script setup>
import apiDownload from 'src/api/api-download';
import { ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import ReportViewer from 'src/components/ReportViewer.vue';
import PermohonanBerhenti from './PermohonanBerhenti.vue';
import loadingStore from 'src/stores/loading-store';

const props = defineProps({
	santri: { type: Object, required: true },
});

const { loadingMain } = toRefs(loadingStore());
const route = useRoute();
const dialogPermohonan = ref(false);
const urlReport = ref('');
const showViewer = ref(false);

async function downloadRegistrasi() {
	await apiDownload({
		endPoint: `reports/santri/registrasi/download?id=${route.params.id}`,
		loading: loadingMain,
		fileName: 'registrasi-' + route.params.id,
		confirm: true,
		message: 'Download data registrasi?',
	});
}

async function downloadStandbook() {
	await apiDownload({
		endPoint: `reports/santri/standbook/download?id=${route.params.id}`,
		loading: loadingMain,
		fileName: 'standbook-' + route.params.id,
		confirm: true,
		message: 'Download standbook?',
	});
}

async function downloadKeterangan() {
	await apiDownload({
		endPoint: `reports/santri/keterangan-berhenti/download?id=${route.params.id}`,
		loading: loadingMain,
		fileName: 'keterangan-berhenti-' + route.params.id,
		confirm: true,
		message: 'Download Keterangan Berhenti',
	});
}

async function downloadIdCard() {
	await apiDownload({
		endPoint: `reports/santri/id-card/download?id=${route.params.id}`,
		loading: loadingMain,
		fileName: 'card-' + route.params.id + ' ~ ' + props.santri.nama,
		confirm: true,
		message: 'Download ID Card',
	});
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
