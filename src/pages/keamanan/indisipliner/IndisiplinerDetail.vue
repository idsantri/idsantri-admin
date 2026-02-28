<template lang="">
	<CardPage>
		<CardHeader title="Detail Santri Indisipliner" :show-reload="false" />

		<q-card-section
			class="tw:flex tw:flex-col tw:sm:flex-row tw:sm:justify-between tw:gap-2 q-pa-sm"
			style="max-width: 1200px"
		>
			<q-card class="tw:w-full" flat bordered>
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
										<td class="">Kategori:</td>
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
										<td class="">Kasus</td>
										<td>
											{{
												formatDateFull(indisipliner.tgl_kasus) +
												' | ' +
												bacaHijri(masehiToHijri(indisipliner.tgl_kasus))
											}}
										</td>
									</tr>
									<tr>
										<td class="">Sidang:</td>
										<td>
											{{
												formatDateFull(indisipliner.tgl_sidang) +
												' | ' +
												bacaHijri(masehiToHijri(indisipliner.tgl_sidang))
											}}
										</td>
									</tr>
									<tr>
										<td class="">Pasal:</td>
										<td>
											{{ indisipliner.pasal }}
										</td>
									</tr>
									<tr>
										<td class="">Deskripsi:</td>
										<td>
											{{ indisipliner.deskripsi }}
										</td>
									</tr>
									<tr>
										<td class="">Eksekutor:</td>
										<td>
											{{ indisipliner.eksekutor }}
										</td>
									</tr>
									<tr>
										<td class="">Saksi:</td>
										<td>
											{{ indisipliner.saksi }}
										</td>
									</tr>
									<tr>
										<td class="">Takzir:</td>
										<td>
											{{ indisipliner.takzir }}
										</td>
									</tr>
									<tr>
										<td class="">Keterangan:</td>
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

			<div class="tw:w-full">
				<IndisiplinerRiwayat :santri_id="indisipliner.santri_id" />
			</div>
		</q-card-section>

		<q-dialog v-model="crudShow">
			<IndisiplinerForm :data="indisipliner" @success-delete="$router.go(-1)" @success-submit="loadData" />
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateFull } from 'src/utils/format-date';
import { masehiToHijri, bacaHijri } from 'src/utils/hijri';
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
tr td:first-child {
	width: 120px;
	font-style: italic;
}
</style>
