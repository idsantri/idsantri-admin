<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="">
			<CardHeader title="Data Penanggung Jawab Guru Tugas" @on-reload="loadData">
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
					:rows="pjgtFiltered"
					:loading="loading"
					:rows-per-page-options="[10, 25, 50, 100, 0]"
					class="dt q-px-sm"
					:columns="columns"
					:filter="filter"
					no-data-label="Tidak ada data untuk ditampilkan!"
					no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
					row-key="name"
					@row-click="(evt, row, index) => $router.push(`/ugt/pjgt/${row.id}`)"
				>
					<template v-slot:top-left>
						<div style="width: 250px">
							<q-select
								dense
								class="q-my-xs"
								outlined
								label="Wilayah"
								emit-value
								map-options
								v-model="wilayah"
								:options="optionsWilayah"
								:loading="loadingWilayah"
								clearable
								@update:model-value="(v) => filterWilayah(v)"
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
			<UgtPjgtForm
				:data="{}"
				@success-submit="(v) => $router.push(`/ugt/pjgt/${v.id}`)"
				@success-delete="$router.go(-1)"
			/>
		</q-dialog>
	</q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import UgtPjgtForm from 'src/components/forms/UgtPjgtForm.vue';
import UgtPjgt from 'src/models/UgtPjgt';

const pjgt = ref([]);
const loading = ref(false);
const filter = ref('');
const wilayah = ref('');
const pjgtFiltered = ref([]);
const crudShow = ref(false);
const loadingWilayah = ref(false);
const optionsWilayah = ref([]);

async function loadData() {
	try {
		loading.value = true;
		const response = await UgtPjgt.getAll();
		pjgt.value = response.pjgt;
		pjgtFiltered.value = pjgt.value;
	} catch (_err) {
		// console.error(_err);
		console.log('error get pjgt');
	} finally {
		loading.value = false;
	}
}

function filterWilayah(v) {
	if (v) {
		pjgtFiltered.value = pjgt.value.filter((obj) => obj.wilayah == v);
	} else {
		pjgtFiltered.value = pjgt.value;
	}
}

async function loadWilayah() {
	try {
		loadingWilayah.value = true;
		const response = await UgtPjgt.listWilayah();
		optionsWilayah.value = response.wilayah;
	} catch (_err) {
		// console.error(_err);
		console.log('error get wilayah pjgt');
	} finally {
		loadingWilayah.value = false;
	}
}

onMounted(async () => {
	await loadData();
	await loadWilayah();
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
		name: 'nama',
		label: 'Nama',
		align: 'left',
		field: 'nama',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'alamat',
		label: 'Alamat',
		align: 'left',
		field: (row) => `${row.desa || ''} ${row.kecamatan || ''} ${row.kabupaten || ''}`,
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'wilayah',
		label: 'Wilayah',
		align: 'left',
		field: 'wilayah',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'lembaga',
		label: 'Lembaga',
		align: 'left',
		field: (row) => `${row.jenis_lembaga} ${row.nama_lembaga}`,
		sortable: true,
		style: (_row) => {
			return 'white-space: normal; word-wrap: break-word;';
		},
	},
];
</script>
<style lang=""></style>
