<template>
	<q-card flat bordered class="bg-green-11">
		<CardLoading :showing="loading" />
		<q-card-section class="q-pa-sm">
			<q-markup-table flat dense class="bg-transparent">
				<tbody class="">
					<tr>
						<td class="text-italic text-caption">ID</td>
						<td>{{ config.id }}</td>
						<td class="text-italic text-caption">Laporan</td>
						<td>ke-{{ config.laporan_ke }} ({{ config.bulan_hijri }})</td>
					</tr>
					<tr>
						<td class="text-italic text-caption">Melapor</td>
						<td>{{ config.count_gt_lapor }}/{{ config.count_gt }}</td>
						<td class="text-italic text-caption">Status</td>
						<td>
							{{ config.locked ? 'Terkunci' : 'Terbuka' }}
							<q-icon
								:name="config.locked ? 'sym_o_lock' : 'sym_o_lock_open'"
								class="q-ml-sm"
								:color="config.locked ? 'negative' : 'positive'"
							/>
						</td>
					</tr>
				</tbody>
			</q-markup-table>
		</q-card-section>
	</q-card>
	<q-table
		:rows="laporan"
		:columns="columns"
		:loading="loading"
		class="q-mt-sm"
		flat
		bordered
		row-key="gt_id"
		:rows-per-page-options="[10, 25, 50, 100, 0]"
	>
		<template #body-cell-gt_id="props">
			<td class="text-center">
				<q-btn
					:label="props.row.gt_id"
					no-caps
					dense
					outline
					size="sm"
					class="q-px-sm"
					icon="sym_o_info"
					color="positive"
					:to="`/ugt/gt/${props.row.gt_id}`"
				/>
			</td>
		</template>
		<template #body-cell-laporan_id="props">
			<td class="text-center">
				<q-btn
					no-caps
					dense
					outline
					round
					:glossy="!!props.row.laporan_id"
					:disable="!props.row.laporan_id"
					class="q-px-sm"
					:icon="props.row.laporan_id ? 'info' : 'clear'"
					:color="props.row.laporan_id ? 'info' : 'negative'"
					:to="`/ugt/laporan/gt/${props.row.laporan_id}`"
				/>
			</td>
		</template>
	</q-table>
</template>
<script setup>
import UgtLaporanGt from 'src/models/UgtLaporanGt';
import { formatDate } from 'src/utils/format-date';
import { masehiToHijriFormat } from 'src/utils/hijri';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const laporan = ref([]);
const config = ref({});
const { query } = useRoute();
const refQuery = ref(query?.config_id ?? '');
const loading = ref(false);

async function getLaporan(config_id) {
	try {
		loading.value = true;
		const response = await UgtLaporanGt.getAllByConfig(config_id);
		// console.log(response);
		if (response) {
			laporan.value = response.laporan;
			config.value = response.config;
		}
	} finally {
		loading.value = false;
	}
}

watch(
	refQuery,
	(val) => {
		getLaporan(val);
	},
	{ immediate: true },
);

const columns = [
	{ name: 'gt_id', label: 'ID GT', align: 'center', field: 'gt_id', sortable: false },
	{
		name: 'nama',
		label: 'Nama GT',
		align: 'left',
		field: (row) => `${row.nama} (${row.santri_id})`,
		sortable: false,
	},
	{
		name: 'pjgt_nama',
		label: 'Nama PJGT',
		align: 'left',
		field: (row) => `${row.pjgt_nama} (${row.pjgt_id})`,
		sortable: false,
	},
	{ name: 'wilayah', label: 'Wilayah', align: 'left', field: 'pjgt_wilayah', sortable: false },
	{
		name: 'tgl_lapor',
		label: 'Tanggal Lapor',
		align: 'left',
		sortable: false,
		// field: 'tgl_lapor',
		field: (row) =>
			row.tgl_lapor ? formatDate(row.tgl_lapor, 'dd-MM-yyyy') + '|' + masehiToHijriFormat(row.tgl_lapor) : '-',
	},
	{ name: 'laporan_id', label: 'Lapor', align: 'center', field: 'laporan_id', sortable: false },
];
</script>
<style lang=""></style>
