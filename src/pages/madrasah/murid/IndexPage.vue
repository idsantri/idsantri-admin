<template>
	<CardPage>
		<CardHeader title="Data Murid" :show-reload="false">
			<template #more>
				<q-list>
					<q-item v-close-popup to="/madrasah/kenaikan-kelas">
						<q-item-section>
							<q-item-label>Kenaikan Kelas</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="trending_up" flat />
						</q-item-section>
					</q-item>
				</q-list>
			</template>
		</CardHeader>
		<q-card-section class="q-pa-sm">
			<filter-kelas :show-ujian-ke="false" start-url="/madrasah/murid" @data-filter="(v) => (textFilter = v)" />
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-card flat bordered>
				<q-card-section class="bg-green-8 text-green-1 text-subtitle1 q-pa-sm flex flex-center">
					<span v-html="textFilter || ''"></span>
					<q-space />
					<q-btn
						dense=""
						icon="sym_o_download"
						label="Excel"
						no-caps=""
						class="bg-green-11 text-green-10 q-px-md"
						@click="downloadExcel"
						title="Download Excel"
					/>
				</q-card-section>
				<q-card-section class="q-pa-sm">
					<q-dialog v-model="loadingDownload" persistent="">
						<q-spinner-cube color="green-12" size="8em" class="flex q-ma-lg q-mx-auto" />
					</q-dialog>
					<router-view :key="$route.fullPath" />
					<!-- <router-view v-slot="{ Component }">
							<transition name="fade" mode="out-in">
								<component :is="Component" :key="$route.fullPath" />
							</transition>
						</router-view> -->
				</q-card-section>
			</q-card>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { notifyWarning } from 'src/utils/notify';
import FilterKelas from 'src/components/filters/FilterKelas.vue';
import DownloadUrl from 'src/models/DownloadUrl';

const { params } = useRoute();
const loadingDownload = ref(false);
const textFilter = ref('');

async function downloadExcel() {
	if (!params.th_ajaran_h || !params.tingkat_id) {
		notifyWarning('Tentukan tahun ajaran dan tingkat pendidikan!');
		return;
	}

	try {
		loadingDownload.value = true;
		await DownloadUrl.kelas(params);
	} catch (error) {
		console.error('🚀 ~ downloadExcel ~ error:', error);
		notifyWarning('Gagal mengunduh file');
	} finally {
		loadingDownload.value = false;
	}
}
</script>
