<template>
	<q-table
		:rows="murid"
		:columns="columns"
		:loading="spinner"
		:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
		class="dt"
		:filter="filter"
		no-data-label="Silakan tentukan Tahun ajaran dan tingkat pendidikan!"
		no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
		row-key="id"
		flat
	>
		<template v-slot:top-left>
			<div class="text-subtitle1 text-green-10">Data Murid</div>
		</template>
		<template v-slot:top-right>
			<q-input outlined dense debounce="300" v-model="filter" placeholder="Cari">
				<template v-slot:append>
					<q-icon name="search" />
				</template>
			</q-input>
		</template>
		<template v-slot:body="props">
			<q-tr :props="props" @click="rowClick(props.row)" style="cursor: pointer">
				<q-td key="id" :props="props">
					{{ props.row.id }}
				</q-td>
				<q-td key="id" :props="props">
					{{ props.row.santri_id }}
				</q-td>
				<q-td key="nama" :props="props"> {{ props.row.nama }} ({{ props.row.sex }}) </q-td>
				<q-td key="alamat" :props="props" :title="props.row.alamat_lengkap">
					{{ props.row.alamat.length > 30 ? props.row.alamat.substr(0, 30) + '&mldr;' : props.row.alamat }}
				</q-td>
				<q-td key="pendidikan" :props="props">
					{{ props.row.kelas }}
					{{ props.row.tingkat_id }}
					{{ props.row.no_absen ? ' (' + String('0' + props.row.no_absen).slice(-2) + ')' : '' }}
				</q-td>
				<q-td key="wali" :props="props">
					{{ props.row.wali_nama }} ({{ props.row.wali_status }}; {{ props.row.wali_sex }})
				</q-td>
				<q-td key="ortu" :props="props"> {{ props.row.ayah }} | {{ props.row.ibu }} </q-td>
			</q-tr>
		</template>
	</q-table>
</template>
<script setup>
import Kelas from 'src/models/Kelas';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const spinner = ref(false);
const { params } = useRoute();
const router = useRouter();
const murid = ref([]);
const filter = ref('');

function rowClick(row) {
	router.push(`/madrasah/kelas/${row.id}/riwayat`);
}
async function loadData(params = {}) {
	try {
		murid.value = [];
		spinner.value = true;
		const data = await Kelas.getAll({ params });
		const map = data.murid.map((m) => {
			return {
				...m,
				alamat: `${m.desa} ${m.kecamatan} ${m.kabupaten}`,
				alamat_lengkap: `${m.jl} ${m.desa} ${m.kecamatan} ${m.kabupaten} ${m.provinsi}`,
			};
		});
		murid.value = map;
	} catch (error) {
		console.error('Error loading data:', error);
	} finally {
		spinner.value = false;
	}
}
onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id) {
		if (!params.kelas) delete params.kelas;
		await loadData(params);
	} else {
		murid.value = [];
	}
});

const columns = [
	{
		name: 'id',
		label: 'ID Kelas',
		align: 'left',
		field: 'id',
		sortable: true,
	},
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
		name: 'alamat',
		label: 'Alamat',
		align: 'left',
		field: (row) => `${row.desa} ${row.kecamatan} ${row.kabupaten}`,
		sortable: true,
		classes: 'alamat',
	},
	{
		name: 'pendidikan',
		label: 'Kelas - Tingkat - Absen',
		align: 'left',
		field: (row) => `${row.kelas} ${row.tingkat_id}
			${row.no_absen ? ' (' + String('0' + row.no_absen).slice(-2) + ')' : ''}`,
		sortable: true,
	},
	{
		name: 'wali',
		label: 'Wali',
		align: 'left',
		field: 'wali_nama',
		sortable: true,
	},
	{
		name: 'ortu',
		label: 'Orang Tua',
		align: 'left',
		field: (row) => `${row.ayah} | ${row.ibu}`,
		sortable: true,
	},
];
</script>
<style lang=""></style>
