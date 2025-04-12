<template lang="">
	<q-btn-dropdown
		color="green-11"
		label="Cetak"
		icon="print"
		no-caps
		class="text-green-10 q-px-md"
		dense
	>
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
import { onMounted, ref, toRefs } from 'vue';
import apiDownload from 'src/api/api-download';
import loadingStore from 'src/stores/loading-store';
import ReportViewer from 'src/components/ReportViewer.vue';

const { loadingMain } = toRefs(loadingStore());
const urlReport = ref('');
const showViewer = ref(false);
const props = defineProps({ data: {} });
const param = ref('');

onMounted(() => {
	param.value = new URLSearchParams(props.data).toString();
});

async function downloadCard() {
	await apiDownload({
		endPoint: `reports/iuran-card/download?${param.value}`,
		loading: loadingMain,
		fileName: 'iuran-card',
		confirm: true,
		message: 'Download kartu iuran?',
	});
}

async function downloadCover() {
	await apiDownload({
		endPoint: `reports/iuran-cover/download?${param.value}`,
		loading: loadingMain,
		fileName: 'iuran-cover',
		confirm: true,
		message: 'Download cover kartu iuran?',
	});
}

async function downloadKuitansi() {
	await apiDownload({
		endPoint: `reports/iuran-kuitansi/download?${param.value}`,
		loading: loadingMain,
		fileName: 'iuran-kuitansi',
		confirm: true,
		message: 'Download kuitansi iuran?',
	});
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
