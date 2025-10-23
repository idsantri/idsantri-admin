<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="">
			<CardHeader title="Kas UGT" @on-reload="loadData">
				<template #buttons>
					<q-btn
						dense
						class="q-px-md text-green-10"
						label="Tambah"
						no-caps=""
						icon="add"
						color="green-2"
						@click="addKas"
					/>
				</template>
			</CardHeader>

			<q-card-section class="no-padding">
				<q-table
					:rows="kas"
					:loading="loading"
					:rows-per-page-options="[10, 25, 50, 100, 0]"
					:pagination="{ page: 999 }"
					class="dt q-px-sm"
					:columns="columns"
					:filter="filter"
					no-data-label="Tidak ada data untuk ditampilkan!"
					no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
					row-key="name"
					@row-click="(evt, row, index) => editKas(evt, row, index)"
				>
					<template v-slot:top-right>
						<q-input outlined dense debounce="300" v-model="filter" placeholder="Cari">
							<template v-slot:append>
								<q-icon name="search" />
							</template>
						</q-input>
					</template>
					<template v-slot:body="props">
						<q-tr :props="props">
							<q-td key="id" :props="props">
								{{ props.row.id }}
							</q-td>
							<q-td key="tgl_m" :props="props" title="format tanggal dd/mm/yyyy">
								{{ formatDate(props.row.tgl_m, 'dd/MM/yyyy') }}
							</q-td>
							<q-td key="keperluan" :props="props">
								{{
									props.row.gt_id
										? `${props.row.keperluan} (${props.row.gt_id})`
										: props.row.keperluan
								}}
							</q-td>
							<q-td key="keterangan" :props="props">
								{{ props.row.keterangan }}
							</q-td>
							<q-td key="masuk" :props="props">
								{{ digitSeparator(props.row.masuk) }}
							</q-td>
							<q-td key="keluar" :props="props">
								{{ digitSeparator(props.row.keluar) }}
							</q-td>
							<q-td key="saldo" :props="props">
								{{ digitSeparator(props.row.saldo) }}
							</q-td>
							<q-td key="cr_by" :props="props">
								{{ props.row.cr_by }}
							</q-td>
							<q-td key="edit" :props="props">
								<div class="q-gutter-sm">
									<q-btn
										icon="edit"
										no-caps
										color="green-10"
										outline
										dense
										class="q-px-md"
										@click="editKas(props.row)"
									/>
									<q-btn
										icon="print"
										no-caps
										color="green-10"
										outline
										dense
										class="q-px-md"
										@click="print(props.row)"
										:disable="props.row.gt_id ? false : true"
									/>
								</div>
							</q-td>
						</q-tr>
					</template>
				</q-table>
			</q-card-section>
		</q-card>
		<q-dialog persistent="" v-model="crudShow">
			<UgtKasForm :data="kasObj" @success-submit="loadData()" @success-delete="loadData()" />
		</q-dialog>
		<q-dialog v-model="showViewer">
			<ReportViewer :url="urlReport" />
		</q-dialog>
	</q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { digitSeparator } from 'src/utils/format-number';
import UgtKasForm from 'src/components/forms/UgtKasForm.vue';
import ReportViewer from 'src/components/ReportViewer.vue';
import UgtKas from 'src/models/UgtKas';
import { formatDate } from 'src/utils/format-date';

const kas = ref([]);
const loading = ref(false);
const filter = ref('');
const crudShow = ref(false);
const kasObj = ref({});
const urlReport = ref('');

async function loadData() {
	try {
		loading.value = true;
		const response = await UgtKas.getAll();
		kas.value = response.kas;
	} catch (_err) {
		// console.error(_err);
		console.log('error get kas ugt');
	} finally {
		loading.value = false;
	}
}

function addKas() {
	kasObj.value = {};
	crudShow.value = true;
}

const showViewer = ref(false);
async function print(val) {
	urlReport.value = `reports/ugt/kuitansi/view?id=${val.id}`;
	showViewer.value = true;
}

function editKas(row) {
	const flag = row.masuk ? '+' : '-';
	const nominal = row.masuk || row.keluar;

	const data = {
		id: row.id,
		gt_id: row.gt_id,
		keperluan: row.keperluan,
		keterangan: row.keterangan,
		flag: flag,
		nominal: nominal,
	};
	kasObj.value = data;
	crudShow.value = true;
}

onMounted(async () => {
	await loadData();
});

const columns = [
	{
		name: 'id',
		label: 'ID',
		align: 'left',
		field: 'id',
		sortable: true,
	},
	{
		name: 'tgl_m',
		label: 'Tanggal',
		align: 'left',
		field: 'tgl_m',
		sortable: true,
	},
	{
		name: 'keperluan',
		label: 'Keperluan',
		align: 'left',
		field: 'keperluan',
		sortable: true,
	},
	{
		name: 'keterangan',
		label: 'Keterangan',
		align: 'left',
		field: 'keterangan',
		sortable: true,
	},
	{
		name: 'masuk',
		label: 'Masuk',
		align: 'right',
		field: 'masuk',
		sortable: true,
	},
	{
		name: 'keluar',
		label: 'Keluar',
		align: 'right',
		field: 'keluar',
		sortable: true,
	},
	{
		name: 'saldo',
		label: 'Saldo',
		align: 'right',
		field: 'saldo',
		sortable: true,
	},
	{
		name: 'cr_by',
		label: 'By',
		align: 'left',
		field: 'cr_by',
		sortable: true,
	},
	{
		name: 'edit',
		label: '!',
		align: 'center',
		field: '',
		sortable: false,
	},
];
</script>
<style scoped>
td {
	white-space: normal;
	word-wrap: break-word;
}
</style>
