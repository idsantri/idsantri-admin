import type { Component } from 'vue';
import type { RouteLocation } from 'vue-router';

export default [
	{
		path: '',
		redirect: (): string => '/madrasah/murid',
	},

	// madrasah/murid
	{
		path: 'murid',
		component: (): Component => import('src/pages/madrasah/murid/IndexPage.vue'),
		children: [
			{
				path: ':th_ajaran_h?/:tingkat_id?/:kelas?',
				component: (): Component => import('src/pages/madrasah/murid/ContentTable.vue'),
			},
		],
	},

	// madrasah/kenaikan-kelas
	{
		path: 'kenaikan-kelas',
		component: (): Component => import('src/pages/madrasah/kenaikan-kelas/KenaikanKelas.vue'),
	},

	// madrasah/kelas/:id
	{
		path: 'kelas/:id',
		component: (): Component => import('src/pages/madrasah/kelas/KelasIndex.vue'),
		redirect: (to: RouteLocation): string => `${to.fullPath}/riwayat`,
		children: [
			{
				path: 'riwayat',
				component: (): Component => import('src/pages/madrasah/kelas/KelasRiwayat.vue'),
			},
			{
				path: 'izin',
				component: (): Component => import('src/pages/madrasah/kelas/KelasIzin.vue'),
			},
			{
				path: 'nilai-mapel',
				component: (): Component => import('src/pages/madrasah/kelas/KelasNilai.vue'),
			},
		],
	},

	// madrasah/tingkat
	{
		path: 'tingkat',
		component: (): Component => import('src/pages/madrasah/tingkat/IndexTingkat.vue'),
		redirect: (): string => '/madrasah/tingkat/id-murid',
		children: [
			{
				path: 'id-murid',
				component: (): Component => import('src/pages/madrasah/tingkat/IDMurid.vue'),
				name: 'ID Murid',
			},
		],
	},

	// madrasah/aparatur
	{
		path: 'aparatur',
		component: (): Component => import('src/pages/madrasah/aparatur/AparaturIndex.vue'),
		children: [
			{
				path: ':th_ajaran_h?/:tingkat_id?',
				component: (): Component => import('src/pages/madrasah/aparatur/AparaturContent.vue'),
			},
		],
	},

	// madrasah/nilai-mapel
	{
		path: 'nilai-mapel',
		children: [
			{
				path: '',
				redirect: (path: RouteLocation): string => `${path.fullPath}/rerata`,
			},
			{
				path: 'rerata/:th_ajaran_h?/:tingkat_id?/:kelas?',
				component: (): Component => import('src/pages/madrasah/nilai-mapel/NilaiIndex.vue'),
			},
			{
				path: 'upload',
				component: (): Component => import('src/pages/madrasah/nilai-mapel/UploadPage.vue'),
			},
			{
				path: 'download',
				component: (): Component => import('src/pages/madrasah/nilai-mapel/DownloadPage.vue'),
			},
		],
	},

	// madrasah/nilai-ahwal
	{
		path: 'nilai-ahwal',
		children: [
			{
				path: ':th_ajaran_h?/:tingkat_id?/:kelas?/:ujian_ke?',
				component: (): Component => import('src/pages/madrasah/nilai-ahwal/IndexPage.vue'),
			},
		],
	},

	// madrasah/mapel
	{
		path: 'mapel',
		component: (): Component => import('src/pages/madrasah/mapel/MapelIndex.vue'),
	},

	// madrasah/absensi
	{
		path: 'absensi',
		component: (): Component => import('src/pages/madrasah/absensi/AbsensiIndex.vue'),
		children: [
			{
				path: 'setting',
				component: (): Component => import('src/pages/madrasah/absensi/AbsensiSetting.vue'),
				name: 'Pengaturan Jadwal Ujian',
			},
			{
				path: 'penomoran/:th_ajaran_h?/:tingkat_id?/:kelas?',
				component: (): Component => import('src/pages/madrasah/absensi/AbsensiPenomoran.vue'),
				name: 'Atur Nomor Absen',
			},
			{
				path: 'input/:absensi/:th_ajaran_h?/:tingkat_id?/:kelas?/:set_bulan_ujian?',
				component: (): Component => import('src/pages/madrasah/absensi/AbsensiInput.vue'),
				name: 'Input Data',
			},
			{
				path: 'rekap-ujian/:absensi/:th_ajaran_h?/:tingkat_id?/:kelas?',
				component: (): Component => import('src/pages/madrasah/absensi/AbsensiRekapUjian.vue'),
				name: 'Rekap Ujian',
			},
			{
				path: 'laporan/:absensi/:th_ajaran_h?/:tingkat_id?/:list_bulan_ujian?',
				component: (): Component => import('src/pages/madrasah/absensi/AbsensiLaporan.vue'),
				name: 'Laporan',
			},
		],
	},

	// madrasah/rapor-print
	{
		path: 'rapor-printed',
		component: (): Component => import('src/pages/madrasah/rapor-printed/IndexPage.vue'),
	},
];
