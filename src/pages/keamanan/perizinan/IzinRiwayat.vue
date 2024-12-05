<template lang="">
	<q-card class="">
		<q-card-section class="bg-green-8 no-padding">
			<q-toolbar class="no-padding no-margin">
				<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11">
					Riwayat Perizinan
				</q-toolbar-title>
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
		<q-card-section v-if="loading" class="text-center">
			<q-spinner-cube color="green-12" size="8em" class="" />
		</q-card-section>
		<q-card-section
			v-else-if="!riwayatIzin?.length"
			class="text-italic text-center q-pa-lg"
		>
			Tidak ada untuk ditampilkan
		</q-card-section>
		<q-card-section v-else class="q-pa-sm">
			<q-list separator bordered>
				<q-item
					v-for="(izin, index) in riwayatIzin"
					:key="index"
					class="q-pa-sm"
				>
					<q-item-section>
						<table>
							<tbody>
								<tr>
									<td class="label">Tanggal:</td>
									<td class="flex">
										{{
											formatDateShort(izin.dari_tgl) +
											' | ' +
											m2hFormat(izin.dari_tgl)
										}}
										<q-space />
										{{
											hijriToThAjaranH(m2h(izin.dari_tgl))
										}}
									</td>
								</tr>

								<tr>
									<td class="label">Izin</td>
									<td>
										{{ izin.sifat }} |
										{{ izin.durasi }} hari |
										{{ izin.pengajuan }}
									</td>
								</tr>
								<tr>
									<td class="label">Keperluan</td>
									<td>
										{{ izin.keperluan }}
										{{
											izin.keterangan
												? ' (' + izin.keterangan + ')'
												: ''
										}}
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
		<!-- props {{ $props.santri_id }} -->
		<!-- {{ riwayatIzin }} -->

		<q-dialog v-model="crudShow">
			<izin-crud
				:data="santri"
				@success-delete="null"
				@success-submit="
					(v) => $router.push(`/keamanan/izin-pesantren/${v.id}`)
				"
			/>
		</q-dialog>
	</q-card>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { formatDateShort } from 'src/utils/format-date';
import { m2h, m2hFormat } from 'src/utils/hijri';
import { hijriToThAjaranH } from 'src/utils/tahun-ajaran';
import { onMounted, onUpdated, ref } from 'vue';
import IzinCrud from 'src/pages/keamanan/perizinan/IzinCrud.vue';

const props = defineProps({
	santri_id: {
		required: true,
	},
});

const riwayatIzin = ref([]);
const loading = ref(false);
const crudShow = ref(false);
const santri = ref({});

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

async function getRiwayat(id) {
	const data = await apiGet({
		endPoint: 'izin-pesantren',
		params: { santri_id: id },
		loading,
	});
	if (!data.izin_pesantren) return;
	riwayatIzin.value = data.izin_pesantren;
	santri.value = {
		santri_id: data.santri.id,
		nama: data.santri.nama,
		data_akhir: data.santri.data_akhir,
	};
}
</script>

<style lang="scss">
.label {
	width: 80px;
	font-style: italic;
}
</style>
