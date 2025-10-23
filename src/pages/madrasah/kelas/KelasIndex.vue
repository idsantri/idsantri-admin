<template lang="">
	<CardPage>
		<CardHeader title="Data Murid" @onReload="loadData" />

		<q-card-section class="no-padding">
			<div class="row" style="max-width: 1400px">
				<div class="col-12 col-md-6 q-pa-sm">
					<q-card bordered flat>
						<!-- santri -->
						<CardSantri :id="kelas.santri_id" @loaded="(res) => (santri = res)" />
					</q-card>
					<q-card class="q-mt-sm" bordered flat>
						<!-- kelas -->
						<q-card-section class="q-pa-sm">
							<q-toolbar class="bg-green-1">
								<q-toolbar-title class="text-subtitle1"> Data Kelas </q-toolbar-title>
								<q-btn class="q-px-sm q-mr-sm" outline dense @click="loadData" icon="sync" no-caps />
								<q-btn
									class="q-px-md"
									outline
									dense
									icon-right="edit"
									@click="crudShow = true"
									label="Edit"
									no-caps
								/>
							</q-toolbar>
							<q-markup-table flat>
								<tbody>
									<tr>
										<td class="text-italic">Tahun Ajaran</td>
										<td>
											{{ kelas.th_ajaran_h + ' | ' + kelas.th_ajaran_m }}
										</td>
									</tr>
									<tr>
										<td class="text-italic">Tingkat</td>
										<td>{{ kelas.tingkat }}</td>
									</tr>
									<tr>
										<td class="text-italic">Kelas</td>
										<td>{{ kelas.kelas }}</td>
									</tr>
									<tr>
										<td class="text-italic">Nomor Absen</td>
										<td>{{ kelas.no_absen }}</td>
									</tr>
									<tr>
										<td class="text-italic">Aktif</td>
										<td>
											<q-toggle
												v-model="kelas.aktif"
												color="green"
												@update:model-value="updateAktif"
												:true-value="1"
												:false-value="0"
											/>
										</td>
									</tr>
									<tr>
										<td class="text-italic">Keterangan</td>
										<td>{{ kelas.keterangan }}</td>
									</tr>
								</tbody>
							</q-markup-table>
							<CardLoading :showing="spinner" />
						</q-card-section>
					</q-card>
				</div>

				<!-- router view -->
				<div class="col-12 col-md-6 q-pa-sm">
					<q-card bordered flat>
						<q-tabs
							no-caps
							outside-arrows
							mobile-arrows
							class="bg-green-7 text-green-3"
							indicator-color="green-11"
							active-color="green-11"
						>
							<q-route-tab name="riwayat" label="Riwayat" :to="`/madrasah/kelas/${kelas.id}/riwayat`" />
							<q-route-tab name="izin" label="Izin" :to="`/madrasah/kelas/${kelas.id}/izin`" />
							<q-route-tab
								name="nilai"
								label="Nilai Mapel"
								:to="`/madrasah/kelas/${kelas.id}/nilai-mapel`"
							/>
						</q-tabs>
						<q-card-section class="q-pa-sm" :key="keyRoute">
							<router-view :key="$route.fullPath" :santri_id="kelas.santri_id" />
							<!-- <router-view v-slot="{ Component }">
									<transition name="fade" mode="out-in">
										<component
											:is="Component"
											:santri_id="kelas.santri_id"
											:key="$route.fullPath"
										/>
									</transition>
								</router-view> -->
						</q-card-section>
					</q-card>
				</div>
			</div>
		</q-card-section>
		<q-dialog v-model="crudShow">
			<KelasForm
				:data="kelas"
				@success-update="
					(res) => {
						kelas = res;
						keyRoute++;
					}
				"
				@success-delete="$router.go(-1)"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import apiUpdate from 'src/api/api-update';
import CardSantri from 'src/components/santri/CardSantri.vue';
import KelasForm from 'src/components/forms/KelasForm.vue';

const keyRoute = ref(0);
const route = useRoute();
const id = route.params.id;
const kelas = ref({});
const spinner = ref(false);
const crudShow = ref(false);
const santri = ref({});

async function updateAktif(val) {
	// console.log(val);
	// return;
	const aktif = val == 1 ? true : false;
	const before = val == 1 ? 0 : 1;
	const updated = await apiUpdate({
		endPoint: `kelas/${id}/set-active`,
		data: { aktif: aktif },
		confirm: false,
	});
	if (!updated) {
		kelas.value.aktif = before;
	}
}

async function loadData() {
	// kelas.value = {};
	const data = await apiGet({
		endPoint: `kelas/${id}`,
		loading: spinner,
	});
	if (data.kelas) {
		kelas.value = data.kelas;
		// keyRoute.value++;
	}
}

onMounted(async () => {
	await loadData();
	// console.log('🚀 ~ fetchData ~ kelas.value:', kelas.value);
});
</script>
<style lang=""></style>
