<template lang="">
	<q-page class="q-pa-sm">
		<q-card style="max-width: 600px">
			<q-card-section
				class="bg-green-8 text-green-11 text-subtitle1 q-pa-sm"
			>
				Ekspor Data Santri
			</q-card-section>

			<q-card-section class="q-pa-sm">
				<h2 class="text-subtitle1 text-italic q-pl-md">
					Tentukan status akhir santri yang ingin didownload
				</h2>
				<div class="row">
					<div
						v-for="(item, index) in status"
						:key="index"
						class="col-6"
					>
						<q-checkbox
							v-model="selectedStatus"
							:val="item"
							:label="item"
						/>
					</div>
				</div>
				<!-- <div class="q-px-sm">
					The model data: <strong>{{ selectedStatus }}</strong>
				</div> -->
			</q-card-section>
			<q-card-actions align="right" class="bg-green-6 q-pa-sm">
				<q-btn
					label="Unduh"
					no-caps
					class="q-px-md"
					outline
					color="green-11"
					icon="file_download"
					@click="download"
				/>
			</q-card-actions>
		</q-card>
	</q-page>
</template>
<script setup>
import { onMounted, ref, toRefs } from 'vue';
import apiGet from 'src/api/api-get';
import loadingStore from 'src/stores/loading-store';
import { notifyWarning } from 'src/utils/notify';

const { loadingMain } = toRefs(loadingStore());
const status = ref([]);
const selectedStatus = ref([]);

async function loadData() {
	const data = await apiGet({
		endPoint: 'status/lists',
		loading: loadingMain,
	});
	// console.log(data);
	status.value = data.status;
}
onMounted(async () => {
	await loadData();
});

async function download() {
	// console.log(isActive.value);
	const data = await apiGet({
		endPoint: 'export/santri',
		loading: loadingMain,
		params: {
			status: selectedStatus.value,
		},
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
