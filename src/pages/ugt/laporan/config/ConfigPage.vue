<template>
	<q-card flat bordered class="bg-green-1">
		<q-card-actions class="flex justify-between items-center">
			<InputSelectTahunAjaran
				label="Pilih Tahun Ajaran"
				v-model="thAjaranH"
				:bottom-slots="false"
				class="tw:w-full tw:sm:max-w-sm"
			/>
			<q-btn label="Tambah" no-caps outline icon="add" @click="handleAdd" />
		</q-card-actions>
	</q-card>
	<q-table
		flat
		bordered
		:rows="configs"
		:columns="columns"
		row-key="id"
		:rows-per-page-options="[10, 25, 50, 100, 0]"
		:loading="loading"
		class="q-mt-sm"
	>
		<template #body-cell-locked="props">
			<td class="text-center">
				<q-icon
					:name="props.row.locked ? 'lock' : 'lock_open'"
					size="xs"
					:color="props.row.locked ? 'negative' : 'positive'"
				/>
			</td>
		</template>
		<template #body-cell-id="props">
			<td class="text-center tw:flex tw:gap-x-2 tw:items-center tw:justify-center">
				<q-btn no-caps dense flat icon="edit" color="primary" @click="handleEdit(props.row.id)" />
				<q-btn
					no-caps
					dense
					icon="sym_o_info"
					round
					color="info"
					glossy
					:to="`/ugt/laporan/gt?config_id=${props.row.id}`"
				/>
			</td>
		</template>
	</q-table>
	<q-dialog persistent="" v-model="showForm">
		<UgtConfigLaporanForm
			:data="{ th_ajaran_h: thAjaranH, ...config }"
			@success-submit="
				(res) => {
					thAjaranH = res.th_ajaran_h;
					loadData(res.th_ajaran_h);
				}
			"
			@success-delete="loadData(thAjaranH)"
		/>
	</q-dialog>
</template>
<script setup>
import InputSelectTahunAjaran from 'src/components/inputs/InputSelectTahunAjaran.vue';
import UgtConfig from 'src/models/UgtLaporanConfig';
import { formatDate } from 'src/utils/format-date';
import { formatHijri } from 'src/utils/hijri';
import { useRouteQuery } from '@vueuse/router';
import { ref, watch } from 'vue';
import UgtConfigLaporanForm from 'src/components/forms/UgtConfigLaporanForm.vue';

const configs = ref([]);
const config = ref({});
const loading = ref(false);
const thAjaranH = useRouteQuery('th_ajaran_h', '');
const showForm = ref(false);

async function loadData(th_ajaran_h) {
	try {
		loading.value = true;
		const response = await UgtConfig.getAll({ params: { th_ajaran_h } });
		if (response) configs.value = response.configs;
	} finally {
		loading.value = false;
	}
}

watch(
	thAjaranH,
	(value) => {
		if (value) {
			loadData(value);
		} else {
			configs.value = [];
		}
	},
	{ immediate: true },
);

const getById = async (id) => {
	try {
		config.value = {};
		loading.value = true;
		const response = await UgtConfig.getById({ id });
		if (response) config.value = response.config;
	} finally {
		loading.value = false;
	}
};

const handleEdit = async (id) => {
	config.value = {};
	await getById(id);
	if (config.value.id) {
		showForm.value = true;
	}
};
const handleAdd = async () => {
	config.value = {};
	config.value.th_ajaran_h = thAjaranH.value;
	showForm.value = true;
};

const columns = [
	{ name: 'urut', label: '#', align: 'center', field: 'urut', sortable: false },
	{ name: 'bulan_hijri', label: 'Bulan', align: 'left', field: 'bulan_hijri', sortable: false },
	{
		name: 'from',
		label: 'Dari',
		align: 'center',
		field: (row) => `${formatDate(row.start, 'dd-MM-yyyy')} | ${formatHijri(row.start_h)}`,
		sortable: false,
	},
	{
		name: 'to',
		label: 'Sampai',
		align: 'center',
		field: (row) => `${formatDate(row.end, 'dd-MM-yyyy')} | ${formatHijri(row.end_h)}`,
		sortable: false,
	},
	{
		name: 'lapor',
		label: 'Lapor',
		align: 'center',
		field: (row) => `${row.count_gt_lapor}/${row.count_gt}`,
		sortable: false,
	},
	{ name: 'locked', label: 'Terkunci', align: 'center', field: 'locked', sortable: false },
	{ name: 'id', label: '!', align: 'center', field: 'id', sortable: false },
];
</script>
<style lang=""></style>
