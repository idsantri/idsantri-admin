<template lang="">
	<CardPage>
		<CardHeader title="Modul Pendidikan Tajwid al-Quran" :showReload="false" />
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
			<!-- <router-view v-slot="{ Component }">
					<transition name="fade" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view> -->
		</q-card-section>
	</CardPage>
</template>
<script setup>
import DownloadUrl from 'src/models/DownloadUrl';
import loadingStore from 'src/stores/loading-store';
import { toRefs } from 'vue';

const { loadingMain } = toRefs(loadingStore());

async function download() {
	try {
		loadingMain.value = true;
		await DownloadUrl.mutaallim();
	} catch (e) {
		console.error('🚀 ~ onDownload ~ e:', e);
	} finally {
		loadingMain.value = false;
	}
}
</script>
<style lang=""></style>
