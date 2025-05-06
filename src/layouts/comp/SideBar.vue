<template>
	<q-list class="text-green-1">
		<q-item class="q-py-lg" to="/home">
			<q-item-section>
				<LogoCircle style="margin: auto" :size="75" :border="2" />
			</q-item-section>
		</q-item>

		<!-- SEKRETARIAT -->
		<ExpansionItem
			label="Sekretariat"
			caption="Kesantrian"
			:separator="false"
		>
			<MenuItem
				v-for="item in MenuSekretariat"
				:key="item.to"
				:item="item"
			/>
		</ExpansionItem>

		<!-- MAKHADIYAH -->
		<ExpansionItem label="Makhadiyah" caption="Kedaerahan">
			<MenuItem
				v-for="item in menuMakhadiyah"
				:key="item.to"
				:item="item"
			/>
		</ExpansionItem>

		<!-- MADRASAH -->
		<ExpansionItem label="Madrasah" caption="Kemuridan dan Keguruan">
			<MenuItem
				v-for="item in menuMadrasah"
				:key="item.to"
				:item="item"
			/>
		</ExpansionItem>

		<!-- KEAMANAN -->
		<ExpansionItem label="Keamanan" caption="Perizinan dan Pelanggaran">
			<MenuItem
				v-for="item in menuKeamanan"
				:key="item.to"
				:item="item"
			/>
		</ExpansionItem>

		<!-- UGT -->
		<ExpansionItem label="UGT" caption="Urusan Guru Tugas">
			<MenuItem v-for="item in menuUgt" :key="item.to" :item="item" />
		</ExpansionItem>

		<!-- SETTING -->
		<ExpansionItem label="Pengaturan" caption="Aplikasi dan Pengguna">
			<MenuItem v-for="item in menuSetting" :key="item.to" :item="item" />
		</ExpansionItem>

		<!-- INFO -->
		<ExpansionItem label="Info" caption="Tentang Aplikasi">
			<MenuItem v-for="item in menuInfo" :key="item.to" :item="item" />
		</ExpansionItem>
	</q-list>
</template>

<script setup>
import LogoCircle from 'src/components/LogoCircle.vue';
import ExpansionItem from './ExpansionItem.vue';
import MenuItem from './MenuItem.vue';

const MenuSekretariat = [
	{
		to: '/cari/santri',
		icon: 'search',
		label: 'Kesantrian',
		caption: 'Pencarian',
		disable: false,
	},
	{
		to: '/iuran',
		icon: 'payments',
		label: 'Iuran',
		caption: 'Iuran Santri dan Murid',
		disable: false,
	},
];

const menuMakhadiyah = [
	{
		to: '/makhadiyah/mutasi',
		icon: 'sym_o_follow_the_signs',
		label: 'Mutasi',
		caption: 'Mutasi dan Relokasi',
		disable: false,
	},
];

const menuMadrasah = [
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
];

const menuKeamanan = [
	{
		to: '/keamanan/izin-pesantren',
		icon: 'transfer_within_a_station',
		label: 'Perizinan',
		caption: 'Data Perizinan Pesantren',
		disable: false,
	},
	{
		to: '/keamanan/indisipliner',
		icon: 'directions_run',
		label: 'Pelanggaran',
		caption: 'Data Pelanggaran',
		disable: false,
	},
];

const menuUgt = [
	{
		to: '/ugt/pjgt',
		icon: 'person_2',
		label: 'PJGT',
		caption: 'Penanggung Jawab Guru Tugas',
		disable: false,
	},
	{
		to: '/ugt/gt',
		icon: 'school',
		label: 'GT',
		caption: 'Guru Tugas',
		disable: false,
	},
	{
		to: '/ugt/kas',
		icon: 'account_balance_wallet',
		label: 'Kas',
		caption: 'Keuangan',
		disable: false,
	},
];

const menuInfo = [
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
];

const menuSetting = [
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
	},
];
</script>
