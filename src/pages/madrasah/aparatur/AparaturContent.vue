<template lang="">
	<q-table
		flat
		:rows="aparatur"
		:columns="columns"
		:filter="filter"
		@row-click="(evt, row, index) => $router.push(`/personalia/${row.aparatur_id}`)"
		:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
		no-data-label="Silakan tentukan filter!"
		no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
		row-key="name"
		:loading="loading"
	>
		<template v-slot:top-left>
			<q-input outlined dense debounce="300" v-model="filter" placeholder="Cari">
				<template v-slot:append>
					<q-icon name="search" />
				</template>
			</q-input>
		</template>
		<template v-slot:top-right>
			<q-btn :disable="loadingDownload" dense class="bg-green-8 text-green-1 q-px-sm" no-caps @click="download">
				<q-spinner v-if="loadingDownload" size="20px" color="white" />
				<q-icon v-else name="download" size="20px" color="white" />
				<label class="q-ml-sm">Download</label>
			</q-btn>
		</template>
	</q-table>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AparaturMadrasah from 'src/models/AparaturMadrasah';
import { notifyError } from 'src/utils/notify';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const { params } = useRoute();
const filter = ref('');
const aparatur = ref([]);
const loading = ref(false);
const loadingDownload = ref(false);

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id) {
		try {
			loading.value = true;
			const data = await AparaturMadrasah.getAll({
				params: {
					th_ajaran_h: params.th_ajaran_h,
					tingkat_id: params.tingkat_id,
				},
			});

			aparatur.value = data.aparatur_madrasah;
		} catch (error) {
			console.error('🚀 ~ error:', error);
		} finally {
			loading.value = false;
		}
	} else {
		aparatur.value = [];
	}
});

function excelDateOnly(str) {
	const [y, m, d] = String(str).slice(0, 10).split('-').map(Number);
	return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(1899, 11, 30)) / 86400000);
}

const download = async () => {
	if (!aparatur.value?.length) {
		notifyError('Tidak ada data untuk diekspor!');
		return;
	}

	const title =
		'Aparatur Madrasah — Tingkat ' +
		aparatur.value[0]?.tingkat +
		' — Tahun Ajaran ' +
		aparatur.value[0]?.th_ajaran_h +
		' | ' +
		aparatur.value[0]?.th_ajaran_m;
	const filename =
		'aparatur-madrasah' + '-' + aparatur.value[0]?.th_ajaran_h + '-' + aparatur.value[0]?.tingkat_id + '.xlsx';

	// Buat worksheet BARU (kosong dulu)
	const worksheet = XLSX.utils.aoa_to_sheet([]);

	XLSX.utils.sheet_add_aoa(worksheet, [[title]], {
		origin: 'A1',
	});

	// 2. Tambahkan data mulai dari baris 3 (baris 2 untuk header kolom otomatis)
	//    Map data dulu ke bentuk yang diperlukan

	let No = 1;
	const mappedData = aparatur.value.map((item) => ({
		No: No++,
		aparatur_id: item.aparatur_id,
		nama: item.nama,
		tmp_lahir: item.tmp_lahir,
		tgl_lahir: item.tgl_lahir ? excelDateOnly(item.tgl_lahir) : null,
		nik: item.nik,
		lp: item.sex,
		jl: item.jl,
		rt: item.rt,
		rw: item.rw,
		desa: item.desa,
		kecamatan: item.kecamatan,
		kabupaten: item.kabupaten,
		provinsi: item.provinsi,
		kode_pos: item.kode_pos,
		email: item.email,
		telepon: item.telepon,
		p_diniyah: item.pa_diniyah,
		p_formal: item.pa_formal,
		th_ajaran_h: item.th_ajaran_h,
		th_ajaran_m: item.th_ajaran_m,
		jabatan: item.jabatan,
		tingkat: item.tingkat,
		kelas: item.kelas,
		ruang: item.ruang,
		// ...item,
	}));

	// json_to_sheet dengan opsi header dan mulai dari baris 2 (origin A2)
	XLSX.utils.sheet_add_json(worksheet, mappedData, {
		origin: 'A2',
		// header: ['No', ... ],
	});

	for (const cell in worksheet) {
		if (cell.startsWith('E') && worksheet[cell].t === 'n') {
			// type == number
			worksheet[cell].z = 'dd mmmm yyyy'; // format tampilan Excel
		}
	}

	// Bagian ke-2 agar data di baris 2 tapi dengan jarak 1 baris dari judul:
	// (opsional) gabungkan judul di baris 1 melintasi kolom
	// worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }];

	// Buat workbook dan lampirkan
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, 'AparaturMadrasah');

	// Konversi ke binary dan simpan
	const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
	saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
};

const columns = [
	{
		name: 'nama',
		label: 'Nama',
		align: 'left',
		field: (row) => `${row.nama} (${row.sex})`,
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
	{
		name: 'jabatan',
		label: 'Jabatan',
		align: 'left',
		field: 'jabatan',
		sortable: true,
	},
	{
		name: 'tingkat',
		label: 'Tingkat',
		align: 'left',
		field: 'tingkat',
		sortable: true,
	},
	{
		name: 'kelas',
		label: 'Kelas',
		align: 'left',
		field: 'kelas',
		sortable: true,
	},
	{
		name: 'ruang',
		label: 'Ruang',
		align: 'left',
		field: 'ruang',
		sortable: true,
	},
];
</script>
<style lang=""></style>
