<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="">
			<CardHeader title="Data Guru Tugas" @on-reload="loadData">
				<template #right>
					<q-btn
						dense
						class="q-px-md q-ml-sm text-green-10"
						label="Tambah"
						no-caps=""
						icon="add"
						color="green-2"
						@click="crudShow = true"
					/>
				</template>
			</CardHeader>

			<q-card-section class="no-padding">
				<q-table
					:rows="gtFiltered"
					:loading="loading"
					:rows-per-page-options="[10, 25, 50, 100, 0]"
					class="dt q-px-sm"
					:columns="columns"
					:filter="filter"
					no-data-label="Tidak ada data untuk ditampilkan!"
					no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
					row-key="name"
					@row-click="(evt, row, index) => $router.push(`/ugt/gt/${row.id}`)"
				>
					<template v-slot:top-left>
						<div style="width: 250px">
							<q-select
								dense
								class="q-my-xs"
								outlined
								label="Tahun Ajaran"
								emit-value
								map-options
								v-model="thAjaranH"
								:options="optionsThAjaran"
								:loading="loadingThAjaran"
								clearable
								@update:model-value="(v) => filterThAjaranH(v)"
								behavior="menu"
							/>
						</div>
					</template>
					<template v-slot:top-right>
						<q-input
							outlined
							dense
							debounce="300"
							v-model="filter"
							placeholder="Cari"
							style="width: 250px"
							class="q-my-xs"
						>
							<template v-slot:append>
								<q-icon name="search" />
							</template>
						</q-input>
					</template>
				</q-table>
			</q-card-section>
		</q-card>
		<q-dialog persistent="" v-model="crudShow">
			<UgtGtForm
				:data="{}"
				@success-submit="(v) => $router.push(`/ugt/gt/${v.id}`)"
				@success-delete="$router.go(-1)"
			/>
		</q-dialog>
	</q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import UgtGtForm from 'src/components/forms/UgtGtForm.vue';
import UgtGt from 'src/models/UgtGt';

const gt = ref([]);
const gtFiltered = ref([]);
const loading = ref(false);
const filter = ref('');
const thAjaranH = ref('');
const crudShow = ref(false);
const loadingThAjaran = ref(false);
const optionsThAjaran = ref([]);

async function loadData() {
	try {
		loading.value = true;
		const response = await UgtGt.getAll();
		gt.value = response.gt;
		gtFiltered.value = gt.value;
	} catch (_err) {
		// console.error(_err);
		console.log('error get gt');
	} finally {
		loading.value = false;
	}
}

function filterThAjaranH(v) {
	if (v) {
		gtFiltered.value = gt.value.filter((obj) => obj.th_ajaran_h == v);
	} else {
		gtFiltered.value = gt.value;
	}
}

async function getListsThAjaran() {
	try {
		loadingThAjaran.value = true;
		const response = await UgtGt.listTahunAjaran();
		optionsThAjaran.value = response.th_ajaran_h;
	} catch (_err) {
		// console.error(_err);
		console.log('error get th ajaran gt');
	} finally {
		loadingThAjaran.value = false;
	}
}

onMounted(async () => {
	await loadData();
	await getListsThAjaran();
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
		name: 'th_ajaran_h',
		label: 'Th Ajaran H',
		align: 'left',
		field: 'th_ajaran_h',
		sortable: true,
	},
	{
		name: 'santri_id',
		label: 'Santri ID',
		align: 'left',
		field: 'santri_id',
		sortable: true,
	},
	{
		name: 'nama',
		label: 'Nama',
		align: 'left',
		field: 'nama',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'data_akhir',
		label: 'Data Akhir',
		align: 'left',
		field: 'data_akhir',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'pjgt_nama',
		label: 'Nama PJGT',
		align: 'left',
		field: 'pjgt_nama',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'pjgt_lembaga',
		label: 'Lembaga',
		align: 'left',
		field: 'pjgt_lembaga',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'pjgt_wilayah',
		label: 'Wilayah Tugas',
		align: 'left',
		field: 'pjgt_wilayah',
		sortable: true,
		style: (_row) => {
			return 'white-space: normal; word-wrap: break-word;';
		},
	},
];
</script>
<style scoped></style>
