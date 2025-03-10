<template lang="">
	<q-card class="q-mt-sm">
		<q-card-section
			class="bg-green-8 text-green-1 text-subtitle1 q-pa-sm flex flex-center"
		>
			<span v-html="$props.heading || ''"></span>
			<q-space />
			<q-btn
				dense=""
				icon="print"
				label="Cetak"
				no-caps
				color="green-11 q-px-md"
				class="text-green-10 q-mr-sm"
				to="/info/download"
			/>
			<q-btn
				dense=""
				icon="add"
				label="Baru"
				no-caps
				color="green-11 q-px-md"
				class="text-green-10"
				@click="crudShow = true"
				disable
			/>
		</q-card-section>
		<q-table
			class="dt q-pa-sm"
			:rows="$props.data"
			:columns="columns"
			:loading="$props.loading"
			:filter="filter"
			:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
			no-data-label="Silakan tentukan filter tanggal!"
			no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
			row-key="name"
			flat
			@row-click="
				(evt, row, index) =>
					$router.push(
						`/bendahara/iuran-old/santri/${row.santri_id}/${row.th_ajaran_h}`,
					)
			"
		>
			<template v-slot:top-left>
				<div class="text-subtitle1 text-green-10">Data Iuran</div>
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
		<q-card-section
			class="bg-green-7 text-green-1 text-subtitle1 q-px-sm q-py-xs"
		>
			<div class="text-right">
				<em>Total: </em>
				<strong>{{ calculateTotal().toRupiah() }}</strong>
			</div>
		</q-card-section>
	</q-card>
	<q-dialog v-model="crudShow">
		<iuran-santri-crud
			:is-new="true"
			title="Input Iuran"
			:data="{}"
			@success-delete="null"
			@success-submit="
				(val) =>
					$router.push(
						`/bendahara/iuran-old/santri/${val.santri_id}/${val.th_ajaran_h}`,
					)
			"
		/>
	</q-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { formatDateShort } from 'src/utils/format-date';
import IuranSantriCrud from 'src/pages/bendahara/iuran-old/santri/IuranSantriCrud.vue';
import 'src/utils/rupiah';
import { digitSeparator } from 'src/utils/format-number';

const props = defineProps({
	data: Array,
	loading: Boolean,
	heading: String,
});
const crudShow = ref(false);
const filter = ref();

function calculateTotal() {
	if (props.data) {
		return props.data.reduce(function (acc, obj) {
			return acc + obj.sub_total;
		}, 0);
	} else {
		return 0;
	}
}

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
	{
		name: 'th_ajaran_h',
		label: 'Tahun Ajaran',
		align: 'left',
		field: 'th_ajaran_h',
		sortable: true,
	},
	{
		name: 'tgl_m',
		label: 'Tanggal',
		align: 'left',
		field: (row) => formatDateShort(row.tgl_m),
		sortable: true,
	},
	{
		name: 'iuran',
		label: 'Iuran',
		align: 'left',
		field: 'iuran',
		sortable: true,
	},
	{
		name: 'sub_total',
		label: 'Nominal',
		align: 'right',
		field: (row) => row.sub_total,
		format: (val) => `${digitSeparator(val)}`,
		sortable: true,
	},
	{
		name: 'kasir',
		label: 'Penerima',
		align: 'left',
		field: 'kasir',
		sortable: true,
	},
];
</script>
<style lang=""></style>
