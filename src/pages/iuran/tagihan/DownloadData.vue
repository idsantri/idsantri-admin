<template lang="">
	<CardPage>
		<CardHeader title="Download Data Tagihan (VA)" @onReload="loadData" />
		<q-card-section class="q-pa-sm">
			<q-card style="max-width: 600px" flat bordered>
				<q-card-section class="q-pa-sm bg-green-7 text-green-1"> Pilih Data yang Akan Diunduh </q-card-section>
				<q-card-section class="q-pa-sm">
					<q-scroll-area style="height: 70vh">
						<q-spinner-facebook
							v-if="loading"
							color="green-6"
							size="3em"
							class="flex q-ma-md q-mx-auto flex items-center justify-center"
						/>
						<q-list v-else bordered separator>
							<q-item tag="label" v-for="(item, index) in trx" :key="index">
								<q-item-section>
									<q-item-label>{{ item.va_group }}</q-item-label>
									<q-item-label caption> {{ item.count }} item </q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-toggle
										:false-value="false"
										:true-value="true"
										color="green"
										v-model="item.selected"
									/>
								</q-item-section>
							</q-item>
						</q-list>
					</q-scroll-area>
					<!-- <pre>{{ trx }}</pre> -->
				</q-card-section>
				<q-card-actions class="flex items-center justify-between q-pa-sm bg-green-7">
					<q-btn no-caps outline glossy color="green-11" label="Atur VA" icon="settings" to="/settings/va" />
					<q-btn
						no-caps
						color="green-11"
						glossy
						class="text-green-9"
						label="Download"
						@click="onDownload"
						icon="download"
						:loading="loadingDownload"
						:disable="loadingDownload"
					/>
				</q-card-actions>
			</q-card>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { notifyError } from 'src/utils/notify';
import Iuran from 'src/models/Iuran';
import DownloadUrl from 'src/models/DownloadUrl';

const loading = ref(false);
const trx = ref([{}]);
const loadingDownload = ref(false);
async function loadData() {
	try {
		loading.value = true;
		const data = await Iuran.vaGroup();
		trx.value = data.va_group.map((item) => ({ ...item, selected: false }));
	} catch (error) {
		console.error('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});

async function onDownload() {
	const selectedItems = trx.value.filter((item) => item.selected).map((item) => item.va_group);
	if (selectedItems.length === 0) {
		notifyError('Pilih minimal satu VA Group untuk diunduh');
		return;
	}

	try {
		loadingDownload.value = true;
		await DownloadUrl.iuranVA({ va_group: selectedItems });
	} catch (e) {
		console.error('🚀 ~ onDownload ~ e:', e);
	} finally {
		loadingDownload.value = false;
	}
}
</script>
<style lang=""></style>
