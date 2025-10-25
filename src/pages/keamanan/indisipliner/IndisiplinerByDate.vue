<template lang="">
	<CardPage>
		<CardHeader title="Data Santri Indisipliner" :show-reload="false" />
		<q-card-section class="q-pa-sm">
			<filter-tanggal :showBulanUjian="true" start-url="/keamanan/indisipliner" @dataFilter="dataEmit">
				<DropDownMenu />
			</filter-tanggal>

			<q-card class="q-mt-sm" flat bordered>
				<q-card-section class="bg-green-7 text-green-1 text-subtitle1 q-pa-sm flex flex-center">
					<span v-html="dataFilter.display || ''"></span>
					<q-space />
					<q-btn
						dense=""
						icon="add"
						label="Baru"
						no-caps
						color="green-11 q-px-md"
						class="text-green-10"
						@click="crudShow = true"
					/>
				</q-card-section>
				<q-table
					class="dt q-pa-sm"
					:rows="indisipliner"
					:columns="columns"
					:loading="loading"
					:filter="filter"
					:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
					no-data-label="Silakan tentukan filter tanggal!"
					no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
					row-key="name"
					flat
					@row-click="(evt, row, index) => $router.push(`/keamanan/indisipliner/${row.id}`)"
				>
					<template v-slot:top-left>
						<div class="text-subtitle1 text-green-10">Data Perizinan</div>
					</template>
					<template v-slot:top-right>
						<q-input outlined dense debounce="300" v-model="filter" placeholder="Cari">
							<template v-slot:append>
								<q-icon name="search" />
							</template>
						</q-input>
					</template>
				</q-table>
			</q-card>
		</q-card-section>

		<q-dialog v-model="crudShow">
			<IndisiplinerForm
				:data="{}"
				@success-delete="null"
				@success-submit="(v) => $router.push(`/keamanan/indisipliner/${v.id}`)"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import { formatDateShort, isDate } from 'src/utils/format-date';
import FilterTanggal from 'src/components/filters/FilterTanggal.vue';
import DropDownMenu from './part/DropDownMenu.vue';
import IndisiplinerForm from 'src/components/forms/IndisiplinerForm.vue';

const indisipliner = ref([{}]);
const loading = ref(false);
const route = useRoute();
const dataFilter = ref({});
const filter = ref('');
const params = {
	startDate: route.params.startDate || 0,
	endDate: route.params.endDate || 0,
};
const startDate = ref(params.startDate);
const endDate = ref(params.endDate);
const crudShow = ref(false);

function dataEmit(val) {
	dataFilter.value = val;
}

onMounted(async () => {
	if (isDate(startDate.value) && isDate(endDate.value)) {
		const data = await apiGet({
			endPoint: 'indisipliner',
			loading,
			params: { start_date: startDate.value, end_date: endDate.value },
		});
		if (data) {
			indisipliner.value = data.indisipliner;
		}
		// console.log(izin.value);
	}
});

const columns = [
	{
		name: 'santri_id',
		label: 'ID Santri',
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
	},
	{
		name: 'kategori',
		label: 'Kategori',
		align: 'left',
		field: 'kategori_text',
		sortable: true,
	},
	{
		name: 'tgl_sidang',
		label: 'Sidang',
		align: 'left',
		field: (row) => formatDateShort(row.tgl_sidang),
		sortable: true,
	},
	{
		name: 'no_pasal',
		label: 'Pasal',
		align: 'left',
		field: 'no_pasal',
		sortable: true,
	},
	{
		name: 'data_akhir',
		label: 'Data Akhir',
		align: 'left',
		field: 'data_akhir',
		sortable: true,
	},
	{
		name: 'alamat',
		label: 'Alamat',
		align: 'left',
		field: 'alamat_pendek',
		sortable: true,
		classes: 'alamat',
	},
];
</script>
<style lang=""></style>
