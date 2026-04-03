<template>
	<CardPage>
		<CardHeader title="Data Nilai Mata Pelajaran" :show-reload="false">
			<template #buttons>
				<q-btn
					icon="settings_accessibility"
					label="Nilai Ahwal"
					to="/madrasah/nilai-ahwal"
					outline=""
					dense
					no-caps=""
					class="q-px-sm"
				/>
			</template>
			<template #more>
				<q-list>
					<q-item v-close-popup to="/madrasah/mapel">
						<q-item-section>
							<q-item-label> Mata Pelajaran </q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="settings" />
						</q-item-section>
					</q-item>
				</q-list>
			</template>
		</CardHeader>
		<q-card-section class="q-pa-sm">
			<filter-kelas
				:show-ujian-ke="false"
				start-url="/madrasah/nilai-mapel/rerata"
				@data-filter="(v) => (textFilter = v)"
				title="Filter Data: <span class='text-weight-medium'>Nilai Mapel (Rerata)</span>"
			/>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-card class="" bordered flat>
				<q-card-section class="bg-green-8 text-green-1 text-subtitle1 q-pa-sm flex flex-center">
					<span
						v-html="
							textFilter +
								' ➡️ <em class=\'text-weight-light\'>Kategori: </em> <strong>Nilai Rapor</strong>' || ''
						"
					></span>
					<q-space />
					<q-btn
						dense=""
						icon="download"
						label="Excel"
						no-caps=""
						class="bg-green-11 text-green-10 q-px-md q-mr-sm"
						to="/madrasah/nilai-mapel/download"
					/>
					<q-btn
						dense=""
						icon="upload"
						label="Excel"
						no-caps=""
						class="bg-green-11 text-green-10 q-px-md"
						to="/madrasah/nilai-mapel/upload"
					/>
				</q-card-section>
				<q-card-section v-if="!params.th_ajaran_h || !params.tingkat_id || !params.kelas" class="q-pa-sm">
					<div class="text-center q-pa-lg text-negative text-italic">
						Tentukan Tahun Ajaran, Tingkat Pendidikan, dan Kelas!
					</div>
				</q-card-section>
				<q-card-section v-else class="q-pa-sm">
					<div v-if="loading">
						<q-skeleton type="text" height="4rem" />
					</div>
					<div v-else>
						<q-table
							flat
							:rows="nilai"
							:columns="columns"
							row-key="kelas_id"
							:rows-per-page-options="[10, 25, 50, 100, 0]"
							class="my-sticky-header-table"
						>
							<template v-slot:header="props">
								<q-tr :props="props" class="">
									<q-th> </q-th>
									<q-th> </q-th>
									<q-th> </q-th>
									<q-th> </q-th>
									<q-th class="text-left">Retata Kelas</q-th>
									<q-th class="text-right">
										{{ hitungRataRata(nilai, 'rerata_1') }}
									</q-th>
									<q-th class="text-right">
										{{ hitungRataRata(nilai, 'rerata_2') }}
									</q-th>
									<q-th class="text-right">
										{{ hitungRataRata(nilai, 'rerata_3') }}
									</q-th>
									<q-th class="text-right">
										{{ hitungRataRata(nilai, 'rerata_4') }}
									</q-th>
									<q-th class="text-right">
										{{ hitungRataRata(nilai, 'rerata_akhir') }}
									</q-th>
								</q-tr>
								<q-tr :props="props">
									<q-th auto-width>!</q-th>
									<q-th v-for="col in props.cols" :key="col.name" :props="props">
										{{ col.label }}
									</q-th>
								</q-tr>
							</template>
							<template v-slot:body="props">
								<q-tr :props="props">
									<q-td auto-width>
										<q-btn
											size="sm"
											color="green"
											round
											dense
											@click="expand(props)"
											:icon="props.expand ? 'remove' : 'add'"
										/>
									</q-td>
									<q-td v-for="col in props.cols" :key="col.name" :props="props">
										<span v-if="col.name == 'kelas_id'">
											<q-btn
												:label="col.value"
												dense
												outline
												class="q-px-md text-green-10"
												:to="`/madrasah/kelas/${col.value}/nilai-mapel`"
											/>
										</span>
										<span v-else-if="col.name == 'santri_id'">
											<q-btn
												:label="col.value"
												dense
												outline
												class="q-px-md text-green-10"
												:to="`/santri/${col.value}`"
											/>
										</span>
										<span v-else>
											{{ col.value }}
										</span>
									</q-td>
								</q-tr>
								<q-tr v-show="props.expand" :props="props">
									<q-td colspan="100%">
										<div v-if="loadingDetail[props.row.kelas_id]">
											<q-skeleton height="100px" />
										</div>
										<div v-else>
											<div
												v-if="nilaiDetail[props.row.kelas_id]?.length == 0"
												class="text-italic text-negative"
											>
												Tidak ada data untuk ditampilkan!
											</div>
											<div v-else>
												<q-markup-table flat dense class="bg-green-1" separator="cell">
													<thead class="bg-green-2 text-weight-medium text-right">
														<tr>
															<td class="text-left" style="width: 80px">ID (Kode)</td>
															<td class="text-left">Mata Pelajaran</td>
															<td style="width: 50px">N-1</td>
															<td style="width: 50px">N-2</td>
															<td style="width: 50px">N-3</td>
															<td style="width: 50px">N-4</td>
															<td style="width: 65px">Rerata</td>
														</tr>
													</thead>
													<tbody>
														<tr
															v-for="(item, index) in nilaiDetail[props.row.kelas_id]"
															:key="index"
														>
															<td class="text-left">
																{{ item.id }}
															</td>
															<td class="text-left">
																{{ item.name }}
															</td>
															<td class="text-right">
																{{ item.nilai_1 }}
															</td>
															<td class="text-right">
																{{ item.nilai_2 }}
															</td>
															<td class="text-right">
																{{ item.nilai_3 }}
															</td>
															<td class="text-right">
																{{ item.nilai_4 }}
															</td>
															<td class="text-right">
																{{
																	item.rerata
																		? parseFloat(item.rerata).toFixed(1)
																		: null
																}}
															</td>
														</tr>
													</tbody>
													<tfoot class="bg-green-2 text-weight-bold text-right text-green-10">
														<tr>
															<td colspan="2" class="text-left">Rerata</td>
															<td>
																{{
																	hitungRataRata(
																		nilaiDetail[props.row.kelas_id],
																		'nilai_1',
																	)
																}}
															</td>
															<td>
																{{
																	hitungRataRata(
																		nilaiDetail[props.row.kelas_id],
																		'nilai_2',
																	)
																}}
															</td>
															<td>
																{{
																	hitungRataRata(
																		nilaiDetail[props.row.kelas_id],
																		'nilai_3',
																	)
																}}
															</td>
															<td>
																{{
																	hitungRataRata(
																		nilaiDetail[props.row.kelas_id],
																		'nilai_4',
																	)
																}}
															</td>
															<td>
																{{
																	hitungRataRata(
																		nilaiDetail[props.row.kelas_id],
																		'rerata',
																	)
																}}
															</td>
														</tr>
													</tfoot>
												</q-markup-table>
											</div>
										</div>
									</q-td>
								</q-tr>
							</template>
						</q-table>
					</div>
				</q-card-section>
			</q-card>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import FilterKelas from 'components/filters/FilterKelas.vue';
import NilaiMapel from 'src/models/NilaiMapel';

const { params } = useRoute();
const nilai = ref([{}]);
const loading = ref(false);
const textFilter = ref('');
const nilaiDetail = ref([{}]);
const loadingDetail = ref([]);

const columns = [
	{
		name: 'no_absen',
		label: 'No',
		align: 'center',
		field: (row) => row.no_absen,
		format: (val) => `${val || ''}`,
		sortable: true,
	},
	{
		name: 'kelas_id',
		label: 'ID Kelas',
		align: 'center',
		field: (row) => row.kelas_id,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: 'santri_id',
		label: 'ID Santri',
		align: 'center',
		field: (row) => row.santri_id,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: 'nama',
		label: 'Nama',
		align: 'left',
		field: (row) => row.nama,
		sortable: true,
	},
	{
		name: 'rerata_1',
		label: 'Rerata-1',
		align: 'right',
		field: (row) => (row.rerata_1 ? parseFloat(row.rerata_1).toFixed(1) : null),
		// format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: 'rerata_2',
		label: 'Rerata-2',
		align: 'right',
		field: (row) => (row.rerata_2 ? parseFloat(row.rerata_2).toFixed(1) : null),
		// format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: 'rerata_3',
		label: 'Rerata-3',
		align: 'right',
		field: (row) => (row.rerata_3 ? parseFloat(row.rerata_3).toFixed(1) : null),
		// format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: 'rerata_4',
		label: 'Rerata-4',
		align: 'right',
		field: (row) => (row.rerata_4 ? parseFloat(row.rerata_4).toFixed(1) : null),
		// format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: 'rerata_akhir',
		label: 'R. Akhir',
		align: 'right',
		field: (row) => (row.rerata_akhir ? parseFloat(row.rerata_akhir).toFixed(1) : null),
		// format: (val) => `${val.toFixed(1)}`,
		sortable: true,
	},
];

async function expand(props) {
	props.expand = !props.expand;
	if (props.expand) {
		try {
			loadingDetail.value[props.key] = true;
			nilaiDetail.value[props.key] = null;
			const data = await NilaiMapel.pivotByKelas(props.key, 'rapor');
			nilaiDetail.value[props.key] = data.nilai_mapel;
		} catch (error) {
			console.error('🚀 ~ expand ~ error:', error);
		} finally {
			loadingDetail.value[props.key] = false;
		}
	}
}

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id && params.kelas) {
		try {
			loading.value = true;
			const data = await NilaiMapel.rerata({
				th_ajaran_h: params.th_ajaran_h,
				tingkat_id: params.tingkat_id,
				kelas: params.kelas,
				category: 'rapor',
			});
			nilai.value = data.nilai_mapel;
		} catch (error) {
			console.error('🚀 ~ error:', error);
		} finally {
			loading.value = false;
		}
	}
});

function hitungRataRata(data, n) {
	let totalNilai = 0;
	let jumlahData = 0;
	if (!data?.length) {
		return null;
	} else {
		data.forEach((item) => {
			if (item[n] !== null) {
				totalNilai += parseFloat(item[n]);
				jumlahData++;
			}
		});
		const rerata = totalNilai / jumlahData;
		return !isNaN(rerata) ? rerata.toFixed(1) : null;
	}
}
</script>
<style lang="scss" scoped>
thead tr th {
	/*	font-weight: bold; */
	background-color: #e8f5e9;
	color: #1b5e20;
}

.my-sticky-header-table-xxx {
	/* height or max-height is important */
	max-height: 650px;

	.q-table__top,
	.q-table__bottom,
	thead tr th {
		/* bg color is important for th; just specify one */
		background-color: #69f0ae;
		color: #1b5e20;
	}

	thead tr th {
		position: sticky;
		z-index: 1;
		top: 0;
		font-weight: bold;
	}

	/* this is when the loading indicator appears */
	&.q-table--loading thead tr:last-child th {
		/* height of all previous header rows */
		top: 48px;
	}

	/* prevent scrolling behind sticky top row on focus */
	tbody {
		/* height of all previous header rows */
		scroll-margin-top: 48px;
	}
}
</style>
