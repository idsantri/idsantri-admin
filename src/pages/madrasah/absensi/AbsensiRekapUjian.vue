<template lang="">
	<div>
		<filter-kelas
			:show-ujian-ke="false"
			:start-url="`/madrasah/absensi/rekap-ujian/${params.absensi}`"
			@data-filter="(v) => (textFilter = v)"
		/>
		<q-card class="q-mt-sm" flat bordered>
			<q-card-section class="bg-green-7 text-green-1 text-subtitle1 q-px-sm q-py-xs">
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

							<th colspan="4" class="bg-grey-1">Ujian-1</th>
							<th colspan="4" class="bg-green-1">Ujian-2</th>
							<th colspan="4" class="bg-grey-1">Ujian-3</th>
							<th colspan="4" class="bg-green-2">Setahun</th>
						</tr>
						<tr>
							<!-- ujian-1 -->
							<th class="bg-grey-1">S</th>
							<th class="bg-grey-1">I</th>
							<th class="bg-grey-1">A</th>
							<th class="bg-grey-1">T</th>

							<!-- ujian-2 -->
							<th class="bg-green-1">S</th>
							<th class="bg-green-1">I</th>
							<th class="bg-green-1">A</th>
							<th class="bg-green-1">T</th>

							<!-- ujian-3 -->
							<th class="bg-grey-1">S</th>
							<th class="bg-grey-1">I</th>
							<th class="bg-grey-1">A</th>
							<th class="bg-grey-1">T</th>

							<!-- setahun -->
							<th class="bg-green-2">S</th>
							<th class="bg-green-2">I</th>
							<th class="bg-green-2">A</th>
							<th class="bg-green-2">T</th>
						</tr>
					</thead>
					<tbody v-if="!params.th_ajaran_h || !params.tingkat_id || !params.kelas">
						<tr>
							<td colspan="50">
								<div class="text-center text-negative text-body1 text-italic bg-red-1 q-pa-md">
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
						<tr v-for="(abs, index) in absences" :key="index">
							<td class="text-center">
								{{ abs.no_absen ? abs.no_absen.toString().padStart(2, 0) : '' }}
							</td>
							<td class="text-center">
								<q-btn
									flat
									dense
									no-caps
									class="text-green-10 bg-green-11 q-px-sm"
									style="min-width: 50px"
									:to="`/santri/${abs.santri_id}`"
								>
									<small> {{ abs.santri_id }}</small>
								</q-btn>
							</td>
							<td class="text-center">
								<q-btn
									flat
									dense
									no-caps
									class="text-green-10 bg-green-11 q-px-sm"
									style="min-width: 50px"
									:to="`/madrasah/kelas/${abs.kelas_id}`"
								>
									<small> {{ abs.kelas_id }}</small>
								</q-btn>
							</td>
							<td class="text-left td-nama">{{ abs.nama }}</td>

							<!-- ujian 1 -->
							<td class="bg-grey-1">
								{{ abs.u1s }}
							</td>
							<td class="bg-grey-1">
								{{ abs.u1i }}
							</td>
							<td class="bg-grey-1">
								{{ abs.u1a }}
							</td>
							<td class="bg-grey-1">
								{{ abs.u1t }}
							</td>

							<!-- ujian 2 -->
							<td class="bg-green-1">
								{{ abs.u2s }}
							</td>
							<td class="bg-green-1">
								{{ abs.u2i }}
							</td>
							<td class="bg-green-1">
								{{ abs.u2a }}
							</td>
							<td class="bg-green-1">
								{{ abs.u2t }}
							</td>

							<!-- ujian 3 -->
							<td class="bg-grey-1">
								{{ abs.u3s }}
							</td>
							<td class="bg-grey-1">
								{{ abs.u3i }}
							</td>
							<td class="bg-grey-1">
								{{ abs.u3a }}
							</td>
							<td class="bg-grey-1">
								{{ abs.u3t }}
							</td>

							<!-- setahun -->
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
						</tr>
					</tbody>
					<tfoot></tfoot>
				</q-markup-table>
			</q-card-section>
			<q-card-section class="bg-green-6 text-green-11 text-subtitle1 q-pa-sm flex flex-center">
				<div class="text-caption text-italic text-center">S=Sakit; I=Izin; A=Alpa; T=Terlambat</div>
			</q-card-section>
		</q-card>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FilterKelas from 'src/components/filters/FilterKelas.vue';
import { titleCase } from 'src/utils/format-text';
import Absensi from 'src/models/Absensi';

const spinner = ref(false);
const route = useRoute();
const { params } = route;
const absences = ref([]);
const textFilter = ref('');
const model =
	params.absensi?.toLowerCase() === 'sekolah'
		? Absensi.Sekolah
		: params.absensi?.toLowerCase() === 'musyawarah'
			? Absensi.Musyawarah
			: null;

async function getAbsensi() {
	try {
		spinner.value = true;
		const data = await model.getRekapUjian({
			th_ajaran_h: params.th_ajaran_h,
			tingkat_id: params.tingkat_id,
			kelas: params.kelas,
		});
		absences.value = data['absensi_' + params.absensi];
	} catch (error) {
		console.error('🚀 ~ getAbsensi ~ error:', error);
	} finally {
		spinner.value = false;
	}
}

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id && params.kelas) {
		await getAbsensi();
	}
});
</script>

<style scoped lang="scss">
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
// others on app.scss
</style>
