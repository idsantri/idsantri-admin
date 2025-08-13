<template lang="">
	<q-page class="q-pa-sm">
		<filter-tanggal
			:showBulanUjian="true"
			start-url="/keamanan/izin-pesantren"
			@dataFilter="dataEmit"
		>
			<DropDownMenu />
		</filter-tanggal>
		<q-card class="q-mt-sm">
			<q-card-section
				class="bg-green-8 text-green-1 text-subtitle1 q-pa-sm flex flex-center"
			>
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
				:rows="izin"
				:columns="columns"
				:loading="loading"
				:filter="filter"
				:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
				no-data-label="Silakan tentukan filter tanggal!"
				no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
				row-key="name"
				flat
				@row-click="
					(evt, row, index) =>
						$router.push(`/keamanan/izin-pesantren/${row.id}`)
				"
			>
				<template v-slot:top-left>
					<div class="text-subtitle1 text-green-10">
						Data Perizinan
					</div>
				</template>
				<template v-slot:top-right>
					<q-input
						outlined
						dense
						debounce="300"
						v-model="filter"
						placeholder="Cari"
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>
			</q-table>
		</q-card>

		<q-dialog v-model="crudShow">
			<IzinPesantrenForm
				:data="{}"
				@success-delete="null"
				@success-submit="
					(v) => $router.push(`/keamanan/izin-pesantren/${v.id}`)
				"
			/>
		</q-dialog>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import { isDate } from 'src/utils/format-date';
import FilterTanggal from 'src/components/filters/FilterTanggal.vue';
import DropDownMenu from './DropDownMenu.vue';
import IzinPesantrenForm from 'src/components/forms/IzinPesantrenForm.vue';

const izin = ref([{}]);
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
			endPoint: 'izin-pesantren',
			loading,
			params: { start_date: startDate.value, end_date: endDate.value },
		});
		izin.value = data.izin_pesantren;
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
		name: 'data_akhir',
		label: 'Data Akhir',
		align: 'left',
		field: 'data_akhir',
		sortable: true,
	},
	// {
	// 	name: 'sifat',
	// 	label: 'Sifat Izin',
	// 	align: 'left',
	// 	field: 'sifat',
	// 	sortable: true,
	// },
	{
		name: 'pengajuan',
		label: 'Sifat | Durasi | Pengajuan',
		align: 'left',
		field: (val) =>
			`${val.sifat ?? ''} ${val.durasi ? ' | ' + val.durasi + ' hari' : ''} ${val.pengajuan ? ' | ' + val.pengajuan : ''} `,
		sortable: true,
	},
	{
		name: 'dari_tgl',
		label: 'Dari',
		align: 'left',
		field: 'dari_tgl',
		sortable: true,
	},
	{
		name: 'sampai_tgl',
		label: 'Sampai',
		align: 'left',
		field: 'sampai_tgl',
		sortable: true,
	},
	{
		name: 'status',
		label: 'Status',
		align: 'left',
		field: 'status',
		sortable: true,
	},

	// {
	// 	name: 'tgl_h',
	// 	label: 'Dari (H)',
	// 	align: 'left',
	// 	field: (row) => formatHijri(row.tgl_h),
	// 	sortable: true,
	// },
	// {
	// 	name: 'durasi',
	// 	label: 'Durasi',
	// 	align: 'left',
	// 	field: (row) => {
	// 		const obj = JSON.parse(JSON.stringify(row));
	// 		const isObj =
	// 			obj !== null &&
	// 			typeof obj === 'object' &&
	// 			typeof obj.durasi !== 'undefined';
	// 		if (!isObj) return null;
	// 		else return `${row.durasi} hari`;
	// 	},
	// 	sortable: true,
	// },

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
