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
				<q-toolbar-title class="text-subtitle1 text-green-11 q-px-none"> Riwayat Perizinan </q-toolbar-title>
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
			<q-card-section v-if="!riwayatIzin?.length" class="text-italic text-center q-pa-lg">
				Tidak ada untuk ditampilkan
			</q-card-section>
			<q-card-section v-else class="q-pa-sm">
				<q-list separator bordered>
					<q-item
						v-for="(izin, index) in riwayatIzin"
						:key="index"
						:class="[izin.id == params.id ? 'bg-green-1' : '', 'q-pa-sm']"
					>
						<q-item-section>
							<table>
								<tbody>
									<tr>
										<td class="label">Tanggal:</td>
										<td class="flex">
											{{ formatDateShort(izin.dari_tgl) + ' | ' + m2hFormat(izin.dari_tgl) }}
											<q-space />
											{{ izin.th_ajaran_h }}
										</td>
									</tr>

									<tr>
										<td class="label">Izin</td>
										<td>
											{{ izin.sifat }} | {{ izin.durasi }} hari |
											{{ izin.pengajuan }}
										</td>
									</tr>
									<tr>
										<td class="label">Keperluan</td>
										<td>
											{{ izin.keperluan }}
											{{ izin.keterangan ? ' (' + izin.keterangan + ')' : '' }}
										</td>
									</tr>
									<tr>
										<td class="label">Status</td>
										<td>
											{{ izin.status }}
										</td>
									</tr>
								</tbody>
							</table>
						</q-item-section>
						<q-item-section side class="no-padding">
							<q-btn
								:disable="izin.id == params.id"
								icon="info"
								glossy
								dense
								round
								outline
								color="green"
								:to="`/keamanan/izin-pesantren/${izin.id}`"
							/>
						</q-item-section>
					</q-item>
				</q-list>
			</q-card-section>
			<CardLoading :showing="loading" />
		</div>
		<q-dialog v-model="crudShow">
			<IzinPesantrenForm
				:data="{
					santri_id: santri_id,
					nama: riwayatIzin[0]?.nama,
					data_akhir: riwayatIzin[0]?.data_akhir,
				}"
				@success-delete="null"
				@success-submit="(v) => $router.push(`/keamanan/izin-pesantren/${v.id}`)"
			/>
		</q-dialog>
	</q-card>
</template>
<script setup>
import { formatDateShort } from 'src/utils/format-date';
import { m2hFormat } from 'src/utils/hijri';
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import IzinPesantrenForm from 'src/components/forms/IzinPesantrenForm.vue';
import IzinPesantren from 'src/models/IzinPesantren';

const props = defineProps({
	santri_id: {
		required: true,
	},
});

const riwayatIzin = ref([]);
const loading = ref(false);
const crudShow = ref(false);
const { params } = useRoute();

onMounted(async () => {
	if (props.santri_id) {
		await getRiwayat(props.santri_id);
	} else {
		riwayatIzin.value = [];
	}
});

onUpdated(async () => {
	if (props.santri_id) {
		await getRiwayat(props.santri_id);
	} else {
		riwayatIzin.value = [];
	}
});

async function getRiwayat(santri_id) {
	try {
		loading.value = true;
		const data = await IzinPesantren.getAll({ params: { santri_id: santri_id } });
		riwayatIzin.value = data.izin_pesantren;
	} catch (error) {
		console.log('🚀 ~ getRiwayat ~ error:', error);
	} finally {
		loading.value = false;
	}
}
</script>

<style lang="scss">
.label {
	width: 80px;
	font-style: italic;
}
</style>
