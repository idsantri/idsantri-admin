<template lang="">
	<CardPage>
		<CardHeader title="Detail Santri Indisipliner" :show-reload="false" />
		<div class="row" style="max-width: 1200px">
			<div class="col-xs-12 col-sm-6">
				<q-card class="q-ma-sm" flat bordered>
					<q-card-section class="bg-green-7 no-padding">
						<q-toolbar class="no-padding no-margin">
							<q-btn
								icon="sync"
								no-caps
								@click="loadData"
								flat
								dense
								class="q-pl-sm"
								color="green-11"
								title="Muat ulang"
							/>
							<q-toolbar-title class="text-subtitle1 text-green-11 q-px-none">
								Data Santri Indisipliner
							</q-toolbar-title>
							<q-btn
								dense
								class="q-px-md q-mr-sm text-green-10"
								label="Cetak"
								no-caps=""
								icon="print"
								color="green-11"
								disable
							/>
							<q-btn
								dense
								class="q-px-md q-mr-sm text-green-10"
								label="Edit"
								no-caps=""
								icon="edit"
								color="green-2"
								@click="crudShow = true"
							/>
						</q-toolbar>
					</q-card-section>
					<q-card-section class="q-pa-sm">
						<CardSantriSimple :id="indisipliner.santri_id" />
						<q-card bordered flat class="q-mt-sm">
							<q-card-section class="q-pa-sm text-subtitle1 bg-green-11 flex">
								Data Pelanggaran
								<q-space />
							</q-card-section>
							<q-card-section class="q-pa-sm">
								<table>
									<tbody>
										<tr>
											<td class="text-italic">Kategori:</td>
											<td>
												{{ indisipliner.kategori_text }}
												&mdash;
												<q-rating
													name="kategori"
													:model-value="indisipliner.kategori || 0"
													max="5"
													color="red"
													icon="thumb_down"
													icon-selected="thumb_down"
													readonly
												/>
											</td>
										</tr>
										<tr>
											<td class="text-italic">Kasus</td>
											<td>
												{{
													formatDateFull(indisipliner.tgl_kasus) +
													' | ' +
													m2hBacaHijri(indisipliner.tgl_kasus)
												}}
											</td>
										</tr>
										<tr>
											<td class="text-italic">Sidang:</td>
											<td>
												{{
													formatDateFull(indisipliner.tgl_sidang) +
													' | ' +
													m2hBacaHijri(indisipliner.tgl_sidang)
												}}
											</td>
										</tr>
										<tr>
											<td class="text-italic">Pasal:</td>
											<td>
												{{ indisipliner.pasal }}
											</td>
										</tr>
										<tr>
											<td class="text-italic">Deskripsi:</td>
											<td>
												{{ indisipliner.deskripsi }}
											</td>
										</tr>
										<tr>
											<td class="text-italic">Eksekutor:</td>
											<td>
												{{ indisipliner.eksekutor }}
											</td>
										</tr>
										<tr>
											<td class="text-italic">Saksi:</td>
											<td>
												{{ indisipliner.saksi }}
											</td>
										</tr>
										<tr>
											<td class="text-italic">Takzir:</td>
											<td>
												{{ indisipliner.takzir }}
											</td>
										</tr>
										<tr>
											<td class="text-italic">Keterangan:</td>
											<td>
												{{ indisipliner.keterangan }}
											</td>
										</tr>
									</tbody>
								</table>
								<CardLoading :showing="loading" />
							</q-card-section>
						</q-card>
					</q-card-section>
				</q-card>
			</div>
			<div class="col-xs-12 col-sm-6">
				<div class="q-ma-sm">
					<IndisiplinerRiwayat class="" :santri_id="indisipliner.santri_id" />
				</div>
			</div>
		</div>

		<q-dialog v-model="crudShow">
			<IndisiplinerForm :data="indisipliner" @success-delete="$router.go(-1)" @success-submit="loadData" />
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateFull } from 'src/utils/format-date';
import { m2hBacaHijri } from 'src/utils/hijri';
import IndisiplinerRiwayat from './part/IndisiplinerRiwayat.vue';
import CardSantriSimple from 'src/components/santri/CardSantriSimple.vue';
import IndisiplinerForm from 'src/components/forms/IndisiplinerForm.vue';
import Indisipliner from 'src/models/Indisipliner';

const route = useRoute();
const indisipliner = ref({});
const loading = ref(false);
const crudShow = ref(false);

async function loadData() {
	try {
		loading.value = true;
		const data = await Indisipliner.getById({ id: route.params.id });
		indisipliner.value = data.indisipliner;
	} catch (error) {
		console.log('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	if (route.params.id) await loadData();
});
</script>
<style scoped>
td {
	vertical-align: top;
}
</style>
