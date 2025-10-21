<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="">
			<CardHeader title="Modul Pendidikan Tajwid al-Quran" :showReload="false">
				<!-- <template v-slot:left>
					<q-btn
						dense
						color="green-11"
						glossy
						class="q-px-sm q-mr-sm text-green-10"
						label="Cetak"
						no-caps=""
						icon="print"
						to="/info/download"
					/>
				</template> -->
			</CardHeader>
			<q-card-section class="q-pa-sm">
				<q-tabs dense align="left">
					<q-route-tab label="Santri" to="/quran/santri" exact no-caps />
					<q-route-tab label="Mutaallim" to="/quran/mutaallim" exact no-caps />
					<q-route-tab label="Muallim" to="/quran/muallim" exact no-caps />
					<q-space />
					<q-btn
						dense
						color="green-11"
						glossy
						class="q-px-sm text-green-10 q-mr-sm"
						label="Download"
						no-caps=""
						icon="download"
						@click="download"
					/>
					<q-btn
						dense
						color="green-11"
						glossy
						class="q-px-sm text-green-10"
						label="Cetak"
						no-caps=""
						icon="print"
						to="/info/download"
					/>
					<!-- <q-btn label="Pengaturan" no-caps outline disabled /> -->
				</q-tabs>
			</q-card-section>
			<q-separator />
			<q-card-section class="q-pa-sm">
				<router-view />
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import loadingStore from 'src/stores/loading-store';
import { toRefs } from 'vue';

const { loadingMain } = toRefs(loadingStore());

async function download() {
	// console.log(isActive.value);
	const data = await apiGet({
		endPoint: 'export/mutaallim',
		loading: loadingMain,
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
