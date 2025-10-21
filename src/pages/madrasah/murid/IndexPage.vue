<template>
	<q-page class="q-pa-sm">
		<q-card class="">
			<CardHeader title="Data Murid" :show-reload="false">
				<template #right>
					<q-btn-dropdown flat dense dropdown-icon="more_vert" class="q-ml-sm" color="green-11">
						<q-list>
							<q-item v-close-popup to="/madrasah/kelas/kenaikan">
								<q-item-section>
									<q-item-label>Kenaikan Kelas</q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-icon name="trending_up" flat />
								</q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</template>
			</CardHeader>
			<q-card-section class="q-pa-sm">
				<filter-kelas
					:show-ujian-ke="false"
					start-url="/madrasah/murid"
					@data-filter="(v) => (textFilter = v)"
				/>
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
					</q-card-section>
				</q-card>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { notifyWarning } from 'src/utils/notify';
import apiGet from 'src/api/api-get';
import FilterKelas from 'src/components/filters/FilterKelas.vue';

const { params } = useRoute();
const loadingDownload = ref(false);
const textFilter = ref('');

async function downloadExcel() {
	if (!params.th_ajaran_h || !params.tingkat_id) {
		notifyWarning('Tentukan tahun ajaran dan tingkat pendidikan!');
		return;
	}

	const data = await apiGet({
		endPoint: 'export/kelas',
		loading: loadingDownload,
		params: {
			th_ajaran_h: params.th_ajaran_h,
			tingkat_id: params.tingkat_id,
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
