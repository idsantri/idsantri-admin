<template lang="">
	<q-page class="q-pa-sm">
		<q-card style="max-width: 600px">
			<CardHeader title="Ekspor Data Santri" @on-reload="loadData" />
			<div class="relative-position">
				<q-card-section class="q-pa-sm" style="min-height: 200px">
					<h2 class="text-subtitle1 text-italic q-pl-md">
						Tentukan status akhir santri yang ingin didownload
					</h2>
					<div class="row">
						<div v-for="(item, index) in status" :key="index" class="col-6">
							<q-checkbox v-model="selectedStatus" :val="item" :label="item" />
						</div>
					</div>
				</q-card-section>
				<q-card-actions align="right" class="bg-green-6 q-pa-sm">
					<q-btn
						:disable="!selectedStatus.length || loading"
						label="Unduh"
						no-caps
						class="q-px-md"
						outline
						color="green-11"
						icon="file_download"
						@click="download"
					/>
				</q-card-actions>
				<CardLoading :showing="loading" />
			</div>
		</q-card>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiGet from 'src/api/api-get';
import { notifyWarning } from 'src/utils/notify';
import Status from 'src/models/Status';

const status = ref([]);
const selectedStatus = ref([]);
const loading = ref(false);

async function loadData() {
	try {
		status.value = [];
		loading.value = true;
		const response = await Status.lists();
		status.value = response.status;
	} catch (_err) {
		// console.error(_err);
		console.log('error get list status');
	} finally {
		loading.value = false;
	}
}
onMounted(async () => {
	await loadData();
});

async function download() {
	// console.log(isActive.value);
	const data = await apiGet({
		endPoint: 'export/santri',
		loading: loading,
		params: {
			status: selectedStatus.value,
		},
	});

	if (!data) return;
	if (!data.url) return notifyWarning('Url tidak ditemukan');

	const link = document.createElement('a');
	link.href = data.url;
	link.click();
	link.remove();
}
</script>
<style lang=""></style>
