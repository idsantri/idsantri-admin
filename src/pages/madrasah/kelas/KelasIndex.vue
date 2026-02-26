<template lang="">
	<CardPage>
		<CardHeader title="Data Murid" @onReload="loadData" />

		<q-card-section class="tw:grid tw:sm:flex tw:sm:justify-between tw:gap-2 q-pa-sm" style="max-width: 1400px">
			<div class="tw:w-full">
				<q-card bordered flat>
					<!-- santri -->
					<CardSantri :id="kelas.santri_id" @loaded="(res) => (santri = res)" />
				</q-card>
				<q-card class="q-mt-sm" bordered flat>
					<CardLoading :showing="spinner" />
					<!-- kelas -->
					<q-card-section class="q-pa-sm bg-green-1 flex items-center justify-between">
						<div class="text-subtitle2">Data Kelas</div>
						<q-space />
						<q-btn
							class="q-px-md"
							outline
							dense
							icon-right="edit"
							@click="crudShow = true"
							label="Edit"
							no-caps
						/>
					</q-card-section>

					<q-markup-table flat class="q-pa-sm">
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
				</q-card>
			</div>

			<!-- router view -->
			<div class="tw:w-full">
				<q-card bordered flat>
					<q-tabs
						no-caps
						outside-arrows
						mobile-arrows
						class="bg-green-7 text-green-3"
						indicator-color="green-11"
						active-color="green-11"
					>
						<q-route-tab
							name="riwayat"
							label="Riwayat"
							:to="`/madrasah/kelas/${kelas.id}/riwayat`"
							replace
						/>
						<q-route-tab name="izin" label="Izin" :to="`/madrasah/kelas/${kelas.id}/izin`" replace />
						<q-route-tab
							name="nilai"
							label="Nilai Mapel"
							:to="`/madrasah/kelas/${kelas.id}/nilai-mapel`"
							replace
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
import CardSantri from 'src/components/santri/CardSantri.vue';
import KelasForm from 'src/components/forms/KelasForm.vue';
import Kelas from 'src/models/Kelas';

const keyRoute = ref(0);
const route = useRoute();
const id = route.params.id;
const kelas = ref({});
const spinner = ref(false);
const crudShow = ref(false);
const santri = ref({});

async function updateAktif(val) {
	const aktif = val == 1 ? true : false;
	const before = val == 1 ? 0 : 1;
	try {
		await Kelas.updateAktif(id, aktif);
	} catch (error) {
		kelas.value.aktif = before;
		console.error('🚀 ~ updateAktif ~ error:', error);
	}
}

async function loadData() {
	try {
		spinner.value = true;
		const data = await Kelas.getById({ id });
		kelas.value = data.kelas;
	} catch (error) {
		console.error('🚀 ~ loadData ~ error:', error);
	} finally {
		spinner.value = false;
	}
}

onMounted(async () => {
	await loadData();
});
</script>
<style lang=""></style>
