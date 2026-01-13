<template lang="">
	<div>
		<filter-kelas
			:show-set-bulan-ujian="true"
			:start-url="`/madrasah/absensi/input/${params.absensi}`"
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

							<th colspan="4" class="bg-grey-1">Pekan-1</th>
							<th colspan="4" class="bg-green-1">Pekan-2</th>
							<th colspan="4" class="bg-grey-1">Pekan-3</th>
							<th colspan="4" class="bg-green-1">Pekan-4</th>
							<th colspan="4" class="bg-grey-1">Pekan-5</th>
							<th colspan="4" class="bg-green-2">Sebulan</th>
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
						</tr>
					</thead>
					<tbody v-if="!params.th_ajaran_h || !params.tingkat_id || !params.kelas || !params.bulan_ujian">
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
							<td class="text-center">{{ abs.santri_id }}</td>
							<td class="text-center">
								<q-btn
									flat
									dense
									no-caps
									class="text-green-10 bg-green-11 q-px-sm"
									style="min-width: 50px"
									@click="$router.push(`/madrasah/kelas/${abs.kelas_id}/riwayat`)"
									><small> {{ abs.kelas_id }}</small></q-btn
								>
							</td>
							<td class="text-left">{{ abs.nama }}</td>

							<!-- pekan 1 -->
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p1s" input-class="text-center" mask="##" />
							</td>
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p1i" input-class="text-center" mask="##" />
							</td>
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p1a" input-class="text-center" mask="##" />
							</td>
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p1t" input-class="text-center" mask="##" />
							</td>

							<!-- pekan 2 -->
							<td class="bg-green-1">
								<q-input outlined dense v-model="abs.p2s" input-class="text-center" mask="##" />
							</td>
							<td class="bg-green-1">
								<q-input outlined dense v-model="abs.p2i" input-class="text-center" mask="##" />
							</td>
							<td class="bg-green-1">
								<q-input outlined dense v-model="abs.p2a" input-class="text-center" mask="##" />
							</td>
							<td class="bg-green-1">
								<q-input outlined dense v-model="abs.p2t" input-class="text-center" mask="##" />
							</td>

							<!-- pekan 3 -->
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p3s" input-class="text-center" mask="##" />
							</td>
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p3i" input-class="text-center" mask="##" />
							</td>
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p3a" input-class="text-center" mask="##" />
							</td>
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p3t" input-class="text-center" mask="##" />
							</td>

							<!-- pekan 4 -->
							<td class="bg-green-1">
								<q-input outlined dense v-model="abs.p4s" input-class="text-center" mask="##" />
							</td>
							<td class="bg-green-1">
								<q-input outlined dense v-model="abs.p4i" input-class="text-center" mask="##" />
							</td>
							<td class="bg-green-1">
								<q-input outlined dense v-model="abs.p4a" input-class="text-center" mask="##" />
							</td>
							<td class="bg-green-1">
								<q-input outlined dense v-model="abs.p4t" input-class="text-center" mask="##" />
							</td>

							<!-- pekan 5 -->
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p5s" input-class="text-center" mask="##" />
							</td>
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p5i" input-class="text-center" mask="##" />
							</td>
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p5a" input-class="text-center" mask="##" />
							</td>
							<td class="bg-grey-1">
								<q-input outlined dense v-model="abs.p5t" input-class="text-center" mask="##" />
							</td>

							<!-- sebulan -->
							<td class="bg-green-2">
								<q-input
									outlined
									dense
									:model-value="
										Number(abs.p1s) +
										Number(abs.p2s) +
										Number(abs.p3s) +
										Number(abs.p4s) +
										Number(abs.p5s)
									"
									readonly
									input-class="text-center"
									mask="##"
								/>
							</td>
							<td class="bg-green-2">
								<q-input
									outlined
									dense
									:model-value="
										Number(abs.p1i) +
										Number(abs.p2i) +
										Number(abs.p3i) +
										Number(abs.p4i) +
										Number(abs.p5i)
									"
									readonly
									input-class="text-center"
									mask="##"
								/>
							</td>
							<td class="bg-green-2">
								<q-input
									outlined
									dense
									:model-value="
										Number(abs.p1a) +
										Number(abs.p2a) +
										Number(abs.p3a) +
										Number(abs.p4a) +
										Number(abs.p5a)
									"
									readonly
									input-class="text-center"
									mask="##"
								/>
							</td>
							<td class="bg-green-2">
								<q-input
									outlined
									dense
									:model-value="
										Number(abs.p1t) +
										Number(abs.p2t) +
										Number(abs.p3t) +
										Number(abs.p4t) +
										Number(abs.p5t)
									"
									class="text-center"
									readonly
									input-class="text-center"
									mask="##"
								/>
							</td>
						</tr>
					</tbody>
					<tfoot></tfoot>
				</q-markup-table>
			</q-card-section>
			<q-card-section
				class="bg-green-6 text-green-11 text-subtitle1 q-pa-sm full-width row no-wrap justify-between items-center content-center"
			>
				<q-btn dense class="q-px-md" no-caps label="Hapus" color="negative" @click="deleteAbsensi" />
				<div class="text-caption text-italic text-center">S=Sakit; I=Izin; A=Alpa; T=Terlambat</div>
				<q-btn dense class="q-px-md" no-caps @click="submitAbsensi" label="Kirim" color="green-10" />
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FilterKelas from 'src/components/filters/FilterKelas.vue';
import { titleCase } from 'src/utils/format-text';
import Absensi from 'src/models/Absensi';

const spinner = ref(false);
const route = useRoute();
const router = useRouter();
const textFilter = ref('');

const absences = ref([]);

const { params } = route;
const model =
	params.absensi?.toLowerCase() === 'sekolah'
		? Absensi.Sekolah
		: params.absensi?.toLowerCase() === 'musyawarah'
			? Absensi.Musyawarah
			: null;

async function deleteAbsensi() {
	const kelas_id = absences.value.map((abs) => abs.kelas_id);
	const bulan_ujian = params.bulan_ujian;

	try {
		spinner.value = true;
		await model.removeAbsensi({ bulan_ujian, kelas_id });
		absences.value = [];
		const url = `/madrasah/absensi/input/${params.absensi}/${params.th_ajaran_h}/${params.tingkat_id}/${params.kelas}`;
		router.push(url);
	} catch (error) {
		console.error('🚀 ~ deleteAbsensi ~ error:', error);
	} finally {
		spinner.value = false;
	}
}

async function submitAbsensi() {
	const data = {
		absensi: JSON.parse(JSON.stringify(absences.value)),
	};
	try {
		spinner.value = true;
		const post = await model.create({ data, message: '<span style="color:blue">Kirim data absensi?</span>' });
		absences.value = post['absensi_' + params.absensi];
	} catch (error) {
		console.error('🚀 ~ submitAbsensi ~ error:', error);
	} finally {
		await fetchAbsensi();
		spinner.value = false;
	}
}

async function fetchAbsensi() {
	const config = {
		th_ajaran_h: params.th_ajaran_h,
		tingkat_id: params.tingkat_id,
		kelas: params.kelas,
		bulan_ujian: params.bulan_ujian,
	};
	try {
		spinner.value = true;
		const data = await model.getAll({ params: config });
		absences.value = data['absensi_' + params.absensi];
	} catch (error) {
		console.error('🚀 ~ fetchAbsensi ~ error:', error);
	} finally {
		spinner.value = false;
	}
}

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id && params.kelas && params.bulan_ujian) {
		await fetchAbsensi();
	}
});
</script>

<style scoped lang="scss">
td {
	padding: 4px;
	min-width: 44px;
}
th {
	padding: 4px;
	min-width: 44px;
}
// others on app.scss
</style>
