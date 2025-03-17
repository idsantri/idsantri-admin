<template lang="">
	<filter-kelas
		:show-list-bulan-ujian="true"
		:showKelas="false"
		:start-url="`/madrasah/absensi/laporan/${params.absensi}`"
		@data-filter="(v) => (textFilter = v)"
	/>
	<q-card class="q-mt-sm">
		<q-card-section
			class="bg-green-7 text-green-1 text-subtitle1 q-px-sm q-py-xs"
		>
			<div class="text-subtitle1">
				➡️ <strong> Absensi {{ titleCase(params.absensi) }} </strong>
			</div>
		</q-card-section>
		<q-card-section class="bg-green-3 text-green-10 text-subtitle1 q-pa-sm">
			<div>
				<span v-html="textFilter || 'Tentukan filter!'"></span>
			</div>
		</q-card-section>
		<q-card-section class="no-padding">
			<q-markup-table flat>
				<thead>
					<tr>
						<th rowspan="2" class="text-center">No.</th>
						<th rowspan="2" class="text-center">ID Santri</th>
						<th rowspan="2" class="text-center">ID Kelas</th>
						<th rowspan="2" class="text-left">Nama</th>
						<th rowspan="2" class="text-left">Kelas</th>
						<th rowspan="2" class="text-left">Domisili</th>

						<th colspan="4" class="bg-grey-1">Pekan-1</th>
						<th colspan="4" class="bg-green-1">Pekan-2</th>
						<th colspan="4" class="bg-grey-1">Pekan-3</th>
						<th colspan="4" class="bg-green-1">Pekan-4</th>
						<th colspan="4" class="bg-grey-1">Pekan-5</th>
						<th colspan="4" class="bg-green-2">Sebulan</th>
						<th colspan="4" class="bg-green-11">Setahun</th>
					</tr>
					<tr>
						<!-- pekan-1 -->
						<th class="bg-grey-1">S</th>
						<th class="bg-grey-1">I</th>
						<th class="bg-grey-1">A</th>
						<th class="bg-grey-1">T</th>

						<!-- pekan-2 -->
						<th class="bg-green-1">S</th>
						<th class="bg-green-1">I</th>
						<th class="bg-green-1">A</th>
						<th class="bg-green-1">T</th>

						<!-- pekan-3 -->
						<th class="bg-grey-1">S</th>
						<th class="bg-grey-1">I</th>
						<th class="bg-grey-1">A</th>
						<th class="bg-grey-1">T</th>

						<!-- pekan-4 -->
						<th class="bg-green-1">S</th>
						<th class="bg-green-1">I</th>
						<th class="bg-green-1">A</th>
						<th class="bg-green-1">T</th>

						<!-- pekan-5 -->
						<th class="bg-grey-1">S</th>
						<th class="bg-grey-1">I</th>
						<th class="bg-grey-1">A</th>
						<th class="bg-grey-1">T</th>

						<!-- sebulan -->
						<th class="bg-green-2">S</th>
						<th class="bg-green-2">I</th>
						<th class="bg-green-2">A</th>
						<th class="bg-green-2">T</th>
						<!-- setahun -->
						<th class="bg-green-11">S</th>
						<th class="bg-green-11">I</th>
						<th class="bg-green-11">A</th>
						<th class="bg-green-11">T</th>
					</tr>
				</thead>
				<tbody
					v-if="
						!params.th_ajaran_h ||
						!params.tingkat_id ||
						!params.list_bulan_ujian
					"
				>
					<tr>
						<td colspan="50">
							<div
								class="text-center text-negative text-body1 text-italic bg-red-1 q-pa-md"
							>
								Tentukan filter!
							</div>
						</td>
					</tr>
				</tbody>
				<tbody v-if="spinner">
					<tr>
						<td colspan="50">
							<q-skeleton height="50px" />
						</td>
					</tr>
				</tbody>

				<tbody v-else>
					<tr v-for="(abs, index) in absensi" :key="index">
						<td class="text-center">
							{{
								abs.no_absen
									? abs.no_absen.toString().padStart(2, 0)
									: ''
							}}
						</td>
						<td class="text-center">{{ abs.santri_id }}</td>
						<td class="text-center">
							<q-btn
								flat
								dense
								no-caps
								class="text-green-10 bg-green-11 q-px-sm"
								style="min-width: 50px"
								@click="
									$router.push(
										`/madrasah/kelas/${abs.kelas_id}/riwayat`,
									)
								"
								><small> {{ abs.kelas_id }}</small></q-btn
							>
						</td>
						<td class="text-left">{{ abs.nama }}</td>
						<td class="text-left">
							{{ abs.kelas }}
						</td>
						<td class="text-left">
							{{ abs.domisili }}
						</td>

						<!-- pekan 1 -->
						<td class="bg-grey-1">
							{{ abs.p1s }}
						</td>
						<td class="bg-grey-1">
							{{ abs.p1i }}
						</td>
						<td class="bg-grey-1">
							{{ abs.p1a }}
						</td>
						<td class="bg-grey-1">
							{{ abs.p1t }}
						</td>

						<!-- pekan 2 -->
						<td class="bg-green-1">
							{{ abs.p2s }}
						</td>
						<td class="bg-green-1">
							{{ abs.p2i }}
						</td>
						<td class="bg-green-1">
							{{ abs.p2a }}
						</td>
						<td class="bg-green-1">
							{{ abs.p2t }}
						</td>

						<!-- pekan 3 -->
						<td class="bg-grey-1">
							{{ abs.p3s }}
						</td>
						<td class="bg-grey-1">
							{{ abs.p3i }}
						</td>
						<td class="bg-grey-1">
							{{ abs.p3a }}
						</td>
						<td class="bg-grey-1">
							{{ abs.p3t }}
						</td>

						<!-- pekan 4 -->
						<td class="bg-green-1">
							{{ abs.p4s }}
						</td>
						<td class="bg-green-1">
							{{ abs.p4i }}
						</td>
						<td class="bg-green-1">
							{{ abs.p4a }}
						</td>
						<td class="bg-green-1">
							{{ abs.p4t }}
						</td>

						<!-- pekan 5 -->
						<td class="bg-grey-1">
							{{ abs.p5s }}
						</td>
						<td class="bg-grey-1">
							{{ abs.p5i }}
						</td>
						<td class="bg-grey-1">
							{{ abs.p5a }}
						</td>
						<td class="bg-grey-1">
							{{ abs.p5t }}
						</td>

						<!-- sebulan -->
						<td class="bg-green-2">
							{{ abs.sum_s }}
						</td>
						<td class="bg-green-2">
							{{ abs.sum_i }}
						</td>
						<td class="bg-green-2">
							{{ abs.sum_a }}
						</td>
						<td class="bg-green-2">
							{{ abs.sum_t }}
						</td>

						<!-- setahun -->
						<td class="bg-green-11">
							{{ abs.all_s }}
						</td>
						<td class="bg-green-11">
							{{ abs.all_i }}
						</td>
						<td class="bg-green-11">
							{{ abs.all_a }}
						</td>
						<td class="bg-green-11">
							{{ abs.all_t }}
						</td>
					</tr>
				</tbody>
				<tfoot></tfoot>
			</q-markup-table>
		</q-card-section>
		<q-card-section
			class="bg-green-6 text-green-11 text-subtitle1 q-pa-sm full-width flex flex-center"
		>
			<div class="text-caption text-italic text-center">
				S=Sakit; I=Izin; A=Alpa; T=Terlambat
			</div>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import FilterKelas from 'src/components/filters/FilterKelas.vue';
import apiGet from 'src/api/api-get';
import { titleCase } from 'src/utils/format-text';
import { notifySuccess } from 'src/utils/notify';

const spinner = ref(false);
const { params } = useRoute();
const textFilter = ref('');

const absensi = ref([]);

async function fetchAbsensi() {
	if (params.th_ajaran_h && params.tingkat_id && params.list_bulan_ujian) {
		const data = await apiGet({
			endPoint: 'absensi/' + params.absensi + '/not-null',
			params: {
				th_ajaran_h: params.th_ajaran_h,
				tingkat_id: params.tingkat_id,
				bulan_ujian: params.list_bulan_ujian,
			},
			notify: false,
			loading: spinner,
		});
		absensi.value = data['absensi_' + params.absensi];
		// console.log(absensi.value);
		if (!absensi.value.length) {
			notifySuccess('Tidak ada murid absen pada filter yang dipilih!');
		}
	}
}

onMounted(async () => {
	await fetchAbsensi();
});
</script>
<style lang="scss">
td {
	padding: 4px;
	min-width: 44px;
	text-align: center;
}
th {
	padding: 4px;
	min-width: 44px;
}
.td-nama {
	text-align: left;
}
</style>
