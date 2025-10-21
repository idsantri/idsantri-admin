<template>
	<q-page class="q-pa-sm">
		<q-card>
			<q-card-section class="bg-green-8 text-green-11 q-px-sm q-py-none">
				<q-toolbar class="no-padding no-margin">
					<q-toolbar-title class="text-subtitle1"> Absensi: {{ $route.name }} </q-toolbar-title>

					<q-btn
						dense
						class="q-px-md q-mr-sm text-green-10"
						label="Cetak"
						no-caps=""
						icon="print"
						color="green-2"
						to="/info/download"
					/>
					<q-btn-dropdown flat round dense dropdown-icon="more_vert" class="q-pl-sm" color="green-11">
						<q-list>
							<!-- input -->
							<q-item
								:disable="!showButton(`madrasah/absensi/input/sekolah`)"
								clickable
								v-close-popup
								to="/madrasah/absensi/input/sekolah"
							>
								<q-item-section avatar>
									<q-icon color="green" name="edit_square" />
								</q-item-section>
								<q-item-section> Input Sekolah </q-item-section>
							</q-item>
							<q-item
								:disable="!showButton(`madrasah/absensi/input/musyawarah`)"
								clickable
								v-close-popup
								to="/madrasah/absensi/input/musyawarah"
							>
								<q-item-section avatar>
									<q-icon color="green" name="edit_square" />
								</q-item-section>
								<q-item-section> Input Musyawarah </q-item-section>
							</q-item>
							<q-separator />
							<!-- rekap bulanan -->
							<q-item
								:disable="!showButton(`madrasah/absensi/laporan/sekolah`)"
								clickable
								v-close-popup
								to="/madrasah/absensi/laporan/sekolah"
							>
								<q-item-section avatar>
									<q-icon color="green" name="summarize" />
								</q-item-section>
								<q-item-section> Laporan Sekolah </q-item-section>
							</q-item>
							<q-item
								:disable="!showButton(`madrasah/absensi/laporan/musyawarah`)"
								clickable
								v-close-popup
								to="/madrasah/absensi/laporan/musyawarah"
							>
								<q-item-section avatar>
									<q-icon color="green" name="summarize" />
								</q-item-section>
								<q-item-section> Laporan Musyawarah </q-item-section>
							</q-item>
							<q-separator />
							<!-- rekap ujian -->
							<q-item
								:disable="!showButton(`madrasah/absensi/rekap-ujian/sekolah`)"
								clickable
								v-close-popup
								to="/madrasah/absensi/rekap-ujian/sekolah"
							>
								<q-item-section avatar>
									<q-icon color="green" name="summarize" />
								</q-item-section>
								<q-item-section> Rekap Ujian Sekolah </q-item-section>
							</q-item>
							<q-item
								:disable="!showButton(`madrasah/absensi/rekap-ujian/musyawarah`)"
								clickable
								v-close-popup
								to="/madrasah/absensi/rekap-ujian/musyawarah"
							>
								<q-item-section avatar>
									<q-icon color="green" name="summarize" />
								</q-item-section>
								<q-item-section> Rekap Ujian Musyawarah </q-item-section>
							</q-item>
							<q-separator />

							<!-- nomor absen -->
							<q-item
								:disable="!showButton(`madrasah/absensi/penomoran`)"
								clickable
								v-close-popup
								to="/madrasah/absensi/penomoran"
							>
								<q-item-section avatar>
									<q-icon color="green" name="format_list_numbered" />
								</q-item-section>
								<q-item-section> Atur Nomor Absen </q-item-section>
							</q-item>

							<!-- setting -->
							<q-item
								:disable="!showButton(`madrasah/absensi/setting`)"
								clickable
								v-close-popup
								to="/madrasah/absensi/setting"
							>
								<q-item-section avatar>
									<q-icon color="green" name="settings" />
								</q-item-section>
								<q-item-section> Pengaturan Absensi </q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</q-toolbar>
			</q-card-section>

			<q-card-section class="q-pa-sm">
				<router-view :key="$route.fullPath" />
				<!-- <router-view v-slot="{ Component }">
					<transition name="fade" mode="out-in">
						<component :is="Component" :key="$route.fullPath" />
					</transition>
				</router-view> -->
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
function showButton(param) {
	return route.fullPath.search(param) > 0 ? false : true;
}
</script>

<style lang="scss" scoped></style>
