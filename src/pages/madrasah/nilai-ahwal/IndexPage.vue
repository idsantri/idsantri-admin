<template>
	<CardPage>
		<CardHeader title="Data Nilai Ahwal (Kepribadian)" :show-reload="false">
			<template #buttons>
				<q-btn
					icon="show_chart"
					label="Nilai Mapel"
					to="/madrasah/nilai-mapel"
					outline=""
					dense
					no-caps=""
					class="q-px-sm"
				/>
			</template>
		</CardHeader>
		<q-card-section class="q-pa-sm">
			<filter-kelas
				start-url="/madrasah/nilai-ahwal"
				@data-filter="(v) => (textFilter = v)"
				title="Filter Data: <span class='text-weight-medium'>Nilai Ahwal (Kepribadian)</span>"
				:show-ujian-ke="true"
			>
				<!-- <template #more>
						<q-btn outline no-caps class="q-px-md" dense icon="more_vert" disable />
					</template> -->
			</filter-kelas>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-card class="" bordered flat>
				<q-card-section class="bg-green-8 text-green-1 text-subtitle1 q-pa-sm flex flex-center">
					<span v-html="textFilter"></span>
					<q-space />
				</q-card-section>
				<q-card-section
					v-if="!params.th_ajaran_h || !params.tingkat_id || !params.kelas || !params.ujian_ke"
					class="q-pa-sm"
				>
					<div class="text-center q-pa-lg text-negative text-italic">
						Tentukan Tahun Ajaran, Tingkat Pendidikan, Kelas, dan Ujian!
					</div>
				</q-card-section>
				<q-card-section v-else class="q-pa-sm">
					<div v-if="loading">
						<q-skeleton type="text" height="4rem" />
					</div>
					<div v-else>
						<q-table
							flat
							:rows="ahwal"
							:columns="columns"
							row-key="kelas_id"
							:rows-per-page-options="[10, 25, 50, 100, 0]"
						>
							<template v-slot:body="props">
								<q-tr :props="props">
									<q-td key="no_absen" :props="props">
										{{ props.row.no_absen }}
									</q-td>
									<q-td key="kelas_id" :props="props">
										<q-btn
											outline
											:label="props.row.kelas_id"
											color="green-10"
											dense
											class="q-px-md"
											:to="`/madrasah/kelas/${props.row.kelas_id}`"
										/>
									</q-td>
									<q-td key="santri_id" :props="props">
										<q-btn
											outline
											:label="props.row.santri_id"
											color="green-10"
											dense
											class="q-px-md"
											:to="`/santri/${props.row.santri_id}`"
										/>
									</q-td>
									<q-td key="nama" :props="props">
										{{ props.row.nama }}
									</q-td>
									<q-td key="sopan" :props="props">
										<q-rating
											v-model="props.row.sopan"
											max="5"
											size="1.7em"
											color="green-14"
											@update:model-value="updateRating('sopan', props.row)"
										>
											<template v-slot:tip-1>
												<q-tooltip>Buruk</q-tooltip>
											</template>
											<template v-slot:tip-2>
												<q-tooltip>Lumayan</q-tooltip>
											</template>
											<template v-slot:tip-3>
												<q-tooltip>Sedang</q-tooltip>
											</template>
											<template v-slot:tip-4>
												<q-tooltip>Baik</q-tooltip>
											</template>
											<template v-slot:tip-5>
												<q-tooltip>Istimewa</q-tooltip>
											</template>
										</q-rating>
									</q-td>
									<q-td key="disiplin" :props="props">
										<q-rating
											v-model="props.row.disiplin"
											max="5"
											size="1.7em"
											color="green-14"
											@update:model-value="updateRating('disiplin', props.row)"
										>
											<template v-slot:tip-1>
												<q-tooltip>Buruk</q-tooltip>
											</template>
											<template v-slot:tip-2>
												<q-tooltip>Lumayan</q-tooltip>
											</template>
											<template v-slot:tip-3>
												<q-tooltip>Sedang</q-tooltip>
											</template>
											<template v-slot:tip-4>
												<q-tooltip>Baik</q-tooltip>
											</template>
											<template v-slot:tip-5>
												<q-tooltip>Istimewa</q-tooltip>
											</template>
										</q-rating>
									</q-td>
									<q-td key="rapi" :props="props">
										<q-rating
											v-model="props.row.rapi"
											max="5"
											size="1.7em"
											color="green-14"
											@update:model-value="updateRating('rapi', props.row)"
										>
											<template v-slot:tip-1>
												<q-tooltip>Buruk</q-tooltip>
											</template>
											<template v-slot:tip-2>
												<q-tooltip>Lumayan</q-tooltip>
											</template>
											<template v-slot:tip-3>
												<q-tooltip>Sedang</q-tooltip>
											</template>
											<template v-slot:tip-4>
												<q-tooltip>Baik</q-tooltip>
											</template>
											<template v-slot:tip-5>
												<q-tooltip>Istimewa</q-tooltip>
											</template>
										</q-rating>
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
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';
import FilterKelas from 'components/filters/FilterKelas.vue';

const textFilter = ref('');
const { params } = useRoute();
const loading = ref(false);
const ahwal = ref([{ sopan: 0, disiplin: 0, rapi: 0 }]);
const clone = reactive([{}]);

async function fetchData() {
	const data = await apiGet({
		endPoint: 'nilai-ahwal',
		params: {
			th_ajaran_h: params.th_ajaran_h,
			tingkat_id: params.tingkat_id,
			kelas: params.kelas,
			ujian_ke: params.ujian_ke,
		},
		loading,
	});
	ahwal.value = data.ahwal;
	Object.assign(clone, JSON.parse(JSON.stringify(data.ahwal)));
}

async function updateRating(hal, row) {
	// console.log(hal, row);
	const post = await apiPost({
		endPoint: 'nilai-ahwal',
		data: {
			kelas_id: row.kelas_id,
			hal: hal,
			ujian_ke: params.ujian_ke,
			skor: row[hal],
		},
	});
	// console.log(clone);
	if (post) {
		Object.assign(clone, JSON.parse(JSON.stringify(ahwal.value)));
	} else {
		ahwal.value = JSON.parse(JSON.stringify(clone));
	}
}

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id && params.kelas && params.ujian_ke) {
		await fetchData();
	}

	// console.log('a', ahwal.value);
});

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
		name: 'sopan',
		label: 'Kesopanan',
		align: 'center',
		field: (row) => row.sopan,
		sortable: true,
	},
	{
		name: 'disiplin',
		label: 'Kedisiplinan',
		align: 'center',
		field: 'disiplin',
		// format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: 'rapi',
		label: 'Kerapian',
		align: 'center',
		field: 'rapi',
		// format: (val) => `${val}`,
		sortable: true,
	},
];
</script>
<style lang="scss" scoped></style>
