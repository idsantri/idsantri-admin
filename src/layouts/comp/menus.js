import { menu } from 'src/config';
console.log('🚀 ~ menu:', menu);
const menus = {
	sekretariat: [
		{
			to: '/cari/santri',
			icon: 'search',
			label: 'Kesantrian',
			caption: 'Pencarian',
			disable: false,
			display: true,
		},
		{
			to: '/iuran',
			icon: 'payments',
			label: 'Iuran',
			caption: 'Iuran Santri dan Murid',
			disable: false,
			display: true,
		},
		{
			to: '/alumni',
			icon: 'sym_o_school',
			label: 'Alumni',
			caption: 'Data Alumni',
			disable: false,
			display: menu.sekretariat.alumni,
		},
	],
	makhadiyah: [
		{
			to: '/mutasi',
			icon: 'sym_o_follow_the_signs',
			label: 'Mutasi',
			caption: 'Mutasi dan Relokasi',
			disable: false,
			display: menu.makhadiyah.mutasi,
		},
		{
			to: '/quran',
			icon: 'sym_o_book_6',
			label: 'Quran',
			caption: 'Pendidikan Tajwid al-Quran',
			disable: false,
			display: menu.makhadiyah.quran,
		},
	],
	madrasah: [
		{
			to: '/madrasah/murid',
			icon: 'school',
			label: 'Murid',
			caption: 'Data Murid',
			disable: false,
		},
		{
			to: '/madrasah/absensi/input/sekolah',
			icon: 'checklist',
			label: 'Absensi',
			caption: 'Sekolah dan Musyawarah',
			disable: false,
		},
		{
			to: '/madrasah/nilai-mapel/rerata',
			icon: 'show_chart',
			label: 'Nilai',
			caption: 'Mata Pelajaran & Ahwal',
			disable: false,
		},
		{
			to: '/madrasah/aparatur',
			icon: 'contact_emergency',
			label: 'Aparatur Madrasah',
			caption: 'Data Aparatur Madrasah',
			disable: false,
		},
		{
			to: '/madrasah/rapor-printed',
			icon: 'sym_o_print_lock',
			label: 'Rapor',
			caption: 'Rapor Tercetak',
			disable: false,
		},
	],
	keamanan: [
		{
			to: '/keamanan/izin-pesantren',
			icon: 'transfer_within_a_station',
			label: 'Perizinan',
			caption: 'Data Perizinan Pesantren',
			disable: false,
			display: menu.keamanan.izin_pesantren,
		},
		{
			to: '/keamanan/indisipliner',
			icon: 'directions_run',
			label: 'Pelanggaran',
			caption: 'Data Pelanggaran',
			disable: false,
			display: menu.keamanan.indisipliner,
		},
	],
	ugt: [
		{
			to: '/ugt/pjgt',
			icon: 'person_2',
			label: 'PJGT',
			caption: 'Penanggung Jawab Guru Tugas',
			disable: false,
			display: menu.ugt,
		},
		{
			to: '/ugt/gt',
			icon: 'school',
			label: 'GT',
			caption: 'Guru Tugas',
			disable: false,
			display: menu.ugt,
		},
		{
			to: '/ugt/kas',
			icon: 'account_balance_wallet',
			label: 'Kas',
			caption: 'Keuangan',
			disable: false,
			display: menu.ugt,
		},
	],
	setting: [
		{
			to: '/settings/lists',
			icon: 'list',
			label: 'List',
			caption: 'Auto Complete (Form Isian)',
			disable: false,
		},
		{
			to: '/settings/users',
			icon: 'manage_accounts',
			label: 'Users',
			caption: 'Akses Pengguna',
			disable: false,
		},
		{
			to: '/settings/profile',
			icon: 'room_preferences',
			label: 'Profil',
			caption: 'Profil Lembaga',
			disable: false,
		},
		{
			to: '/settings/reports',
			icon: 'print',
			label: 'Report',
			caption: 'Print Out',
			disable: false,
		},
		{
			to: '/settings/alamat',
			icon: 'location_on',
			label: 'Alamat',
			caption: 'Daftar Alamat',
			disable: false,
		},
		{
			to: '/settings/app-wali',
			icon: 'sym_o_settings_applications',
			label: 'App Wali',
			caption: 'Aplikasi Wali Santri',
			disable: false,
			display: menu.setting.appWali,
		},
		{
			to: '/settings/va',
			icon: 'account_balance_wallet',
			label: 'Virtual Account',
			caption: 'Virtual Account Iuran',
			disable: false,
			display: menu.setting.virtualAccount,
		},
	],
	info: [
		{
			to: '/info/download',
			icon: 'download',
			label: 'Download',
			caption: 'Unduh Aplikasi',
			disable: false,
		},
		{
			to: '/info/release',
			icon: 'new_releases',
			label: 'Release',
			caption: 'App Version',
			disable: false,
		},
		{
			to: '/info/tutorial',
			icon: 'sym_o_help_clinic',
			label: 'Tutorial',
			caption: 'Panduan Pengguna',
			disable: true,
		},
	],
};

const sekretariat = menus.sekretariat.filter((item) => item.display != false);
const makhadiyah = menus.makhadiyah.filter((item) => item.display != false);
const madrasah = menus.madrasah.filter((item) => item.display != false);
const keamanan = menus.keamanan.filter((item) => item.display != false);
const ugt = menus.ugt.filter((item) => item.display != false);
const setting = menus.setting.filter((item) => item.display != false);
const info = menus.info.filter((item) => item.display != false);

export { sekretariat, makhadiyah, madrasah, keamanan, ugt, setting, info };
