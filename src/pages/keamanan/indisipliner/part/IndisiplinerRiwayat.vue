<template lang="">
	<q-card flat bordered class="">
		<q-card-section class="bg-green-7 no-padding">
			<q-toolbar class="no-padding no-margin">
				<q-btn
					icon="sync"
					no-caps
					@click="getRiwayat(santri_id)"
					flat
					dense
					class="q-pl-sm"
					color="green-11"
					title="Muat ulang"
				/>
				<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11"> Riwayat Indisipliner </q-toolbar-title>
				<q-btn
					color="green-11"
					outline
					dense
					no-caps
					icon="add"
					label="Tambah"
					class="q-mr-sm q-px-md"
					@click="crudShow = true"
				/>
			</q-toolbar>
		</q-card-section>
		<div class="relative-position">
			<q-card-section v-if="!riwayatIndisipliner?.length" class="text-italic text-center q-pa-lg">
				Tidak ada untuk ditampilkan
			</q-card-section>
			<q-card-section v-else class="q-pa-sm">
				<q-list separator bordered>
					<q-item
						v-for="(indisipliner, index) in riwayatIndisipliner"
						:key="index"
						:class="[indisipliner.id == params.id ? 'bg-green-1' : '', 'q-pa-sm']"
					>
						<q-item-section>
							<table>
								<tbody>
									<tr>
										<td class="label">Tanggal Sidang:</td>
										<td class="flex">
											{{
												formatDateShort(indisipliner.tgl_sidang) +
												' | ' +
												formatHijri(masehiToHijri(indisipliner.tgl_sidang))
											}}
											<q-space />
											{{ indisipliner.th_ajaran_h }}
										</td>
									</tr>

									<tr>
										<td class="label">Pasal</td>
										<td>{{ indisipliner.no_pasal }}</td>
									</tr>
									<tr>
										<td class="label">Kategori</td>
										<td>{{ indisipliner.kategori_text }}</td>
									</tr>
									<tr>
										<td class="label">Sanksi</td>
										<td>{{ indisipliner.takzir }}</td>
									</tr>
								</tbody>
							</table>
						</q-item-section>
						<q-item-section side class="no-padding">
							<q-btn
								:disable="indisipliner.id == params.id"
								icon="info"
								glossy
								dense
								round
								outline
								color="green"
								:to="`/keamanan/indisipliner/${indisipliner.id}`"
							/>
						</q-item-section>
					</q-item>
				</q-list>
			</q-card-section>
			<CardLoading :showing="loading" />
		</div>
		<q-dialog v-model="crudShow">
			<IndisiplinerForm
				:data="{
					santri_id: santri_id,
					nama: riwayatIndisipliner[0]?.nama,
					data_akhir: riwayatIndisipliner[0]?.data_akhir,
				}"
				@success-delete="null"
				@success-submit="(v) => $router.push(`/keamanan/indisipliner/${v.id}`)"
			/>
		</q-dialog>
	</q-card>
</template>
<script setup>
import { formatDateShort } from 'src/utils/format-date';
import { masehiToHijri, formatHijri } from 'src/utils/hijri';
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import IndisiplinerForm from 'src/components/forms/IndisiplinerForm.vue';
import Indisipliner from 'src/models/Indisipliner';

const props = defineProps({
	santri_id: {
		required: true,
	},
});

const riwayatIndisipliner = ref([]);
const loading = ref(false);
const crudShow = ref(false);
const { params } = useRoute();

onMounted(async () => {
	if (props.santri_id) {
		await getRiwayat(props.santri_id);
	} else {
		riwayatIndisipliner.value = [];
	}
});

onUpdated(async () => {
	if (props.santri_id) {
		await getRiwayat(props.santri_id);
	} else {
		riwayatIndisipliner.value = [];
	}
});

async function getRiwayat(santri_id) {
	try {
		loading.value = true;
		const data = await Indisipliner.getAll({ params: { santri_id: santri_id } });
		riwayatIndisipliner.value = data.indisipliner;
	} catch (error) {
		console.log('🚀 ~ getRiwayat ~ error:', error);
	} finally {
		loading.value = false;
	}
}
</script>

<style lang="scss">
.label {
	width: 110px;
	font-style: italic;
}
</style>
