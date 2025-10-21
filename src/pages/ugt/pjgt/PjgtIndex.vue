<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="">
			<q-card-section class="bg-green-8 no-padding">
				<q-toolbar class="no-padding no-margin">
					<q-toolbar-title
						class="text-subtitle1 q-ml-sm text-green-11"
					>
						Data Penanggung Jawab Guru Tugas
					</q-toolbar-title>

					<q-btn
						dense
						class="q-px-md q-mr-sm text-green-10"
						label="Tambah"
						no-caps=""
						icon="add"
						color="green-2"
						@click="crudShow = true"
					/>
				</q-toolbar>
			</q-card-section>

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
					@row-click="
						(evt, row, index) => $router.push(`/ugt/pjgt/${row.id}`)
					"
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
		<!-- <pre>{{ pjgt }}</pre> -->
		<!-- <pre>{{ wilayah }}</pre> -->
	</q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import apiGet from 'src/api/api-get';
import { getListsCustom } from 'src/api/api-get-lists';
import UgtPjgtForm from 'src/components/forms/UgtPjgtForm.vue';

const pjgt = ref([]);
const loading = ref(false);
const filter = ref('');
const wilayah = ref('');
const pjgtFiltered = ref([]);
const crudShow = ref(false);
const loadingWilayah = ref(false);
const optionsWilayah = ref([]);

async function loadData() {
	const data = await apiGet({ endPoint: 'ugt/pjgt', loading });
	if (data) {
		pjgt.value = data.pjgt;
		pjgtFiltered.value = pjgt.value;
	}
}

function filterWilayah(v) {
	if (v) {
		pjgtFiltered.value = pjgt.value.filter((obj) => obj.wilayah == v);
	} else {
		pjgtFiltered.value = pjgt.value;
	}
}

onMounted(async () => {
	await loadData();
	const data = await getListsCustom({
		url: 'ugt/pjgt/lists/wilayah',
		key: 'wilayah',
		loading: loadingWilayah,
	});
	if (data) {
		optionsWilayah.value = data;
	}
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
	},
	{
		name: 'alamat',
		label: 'Alamat',
		align: 'left',
		field: (row) =>
			`${row.desa || ''} ${row.kecamatan || ''} ${row.kabupaten || ''}`,
		sortable: true,
	},
	{
		name: 'wilayah',
		label: 'Wilayah',
		align: 'left',
		field: 'wilayah',
		sortable: true,
	},
	{
		name: 'lembaga',
		label: 'Lembaga',
		align: 'left',
		field: (row) => `${row.jenis_lembaga} ${row.nama_lembaga}`,
		sortable: true,
	},
];
</script>
<style lang=""></style>
