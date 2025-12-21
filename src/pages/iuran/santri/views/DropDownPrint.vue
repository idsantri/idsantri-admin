<template lang="">
	<q-btn-dropdown color="green-11" no-caps class="text-green-10 q-px-md" dense :disable="loadingDownload">
		<template v-slot:label>
			<q-spinner v-if="loadingDownload" class="q-mr-sm" />
			<q-icon v-else name="print" class="q-mr-sm" />
			Cetak / Unduh
		</template>
		<q-list>
			<q-item v-close-popup>
				<q-item-section>
					<q-item-label>Kartu</q-item-label>
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="download" flat @click="downloadCard" />
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="print" flat @click="printCard" />
				</q-item-section>
			</q-item>

			<q-item v-close-popup>
				<q-item-section>
					<q-item-label>Cover</q-item-label>
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="download" flat @click="downloadCover" />
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="print" flat @click="printCover" />
				</q-item-section>
			</q-item>

			<q-item v-close-popup>
				<q-item-section>
					<q-item-label>Kuitansi</q-item-label>
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="download" flat @click="downloadKuitansi" />
				</q-item-section>
				<q-item-section avatar>
					<q-btn icon="print" flat @click="printKuitansi" />
				</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>

	<q-dialog v-model="showViewer">
		<ReportViewer :url="urlReport" />
	</q-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import ReportViewer from 'src/components/ReportViewer.vue';
import DownloadFile from 'src/models/DownloadFile';

const urlReport = ref('');
const showViewer = ref(false);
const props = defineProps({ data: {} });
const param = ref('');
const loadingDownload = ref(false);

onMounted(() => {
	param.value = new URLSearchParams(props.data).toString();
});

async function downloadCard() {
	try {
		loadingDownload.value = true;
		await DownloadFile.iuranCard(props.data, 'iuran-card-' + props.data.santri_id + '.pdf');
	} catch (error) {
		console.error('Error downloading card:', error);
	} finally {
		loadingDownload.value = false;
	}
}

async function downloadCover() {
	try {
		loadingDownload.value = true;
		await DownloadFile.iuranCover(props.data, 'iuran-cover-' + props.data.santri_id + '.pdf');
	} catch (error) {
		console.error('Error downloading cover:', error);
	} finally {
		loadingDownload.value = false;
	}
}

async function downloadKuitansi() {
	try {
		loadingDownload.value = true;
		await DownloadFile.iuranKuitansi(props.data, 'iuran-kuitansi-' + props.data.santri_id + '.pdf');
	} catch (error) {
		console.error('Error downloading kuitansi:', error);
	} finally {
		loadingDownload.value = false;
	}
}

function printCard() {
	urlReport.value = `reports/iuran-card/view?${param.value}`;
	showViewer.value = true;
}

function printCover() {
	urlReport.value = `reports/iuran-cover/view?${param.value}`;
	showViewer.value = true;
}

function printKuitansi() {
	urlReport.value = `reports/iuran-kuitansi/view?${param.value}`;
	showViewer.value = true;
}
</script>
<style lang=""></style>
