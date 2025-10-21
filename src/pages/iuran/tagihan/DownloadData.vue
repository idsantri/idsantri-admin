<template lang="">
	<q-page class="q-pa-sm">
		<q-card style="max-width: 600px">
			<CardHeader title="Download Data Tagihan (VA)" @onReload="loadData" />
			<q-card-section class="q-pa-sm">
				<q-scroll-area style="height: 700px">
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
	</q-page>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { ref, onMounted } from 'vue';
import { notifyError } from 'src/utils/notify';

const loading = ref(false);
const trx = ref([{}]);
const loadingDownload = ref(false);
async function loadData() {
	const data = await apiGet({
		endPoint: 'iuran/va-group',
		loading,
	});
	trx.value = data.va_group.map((item) => ({ ...item, selected: false }));
}

onMounted(async () => {
	await loadData();
	// console.log(trx.value);
});

async function onDownload() {
	const selectedItems = trx.value.filter((item) => item.selected).map((item) => item.va_group);
	if (selectedItems.length === 0) {
		notifyError('Pilih minimal satu VA Group untuk diunduh');
		return;
	}

	const data = await apiGet({
		endPoint: 'export/iuran-va',
		params: { va_group: selectedItems },
		loading: loadingDownload,
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
