<template>
	<q-list class="text-green-1">
		<!-- HOME -->
		<q-item clickable v-ripple to="/home">
			<q-item-section avatar>
				<q-icon color="green-1" name="home" />
			</q-item-section>
			<q-item-section>
				<q-item-label>Beranda</q-item-label>
				<q-item-label caption>Halaman Awal</q-item-label>
			</q-item-section>
		</q-item>
		<q-separator dark />

		<!-- SEKRETARIAT -->
		<q-separator dark />
		<q-expansion-item
			expand-separator
			label="Sekretariat"
			caption="Kesantrian"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<q-item clickable v-ripple to="/cari/santri">
				<q-item-section avatar>
					<q-icon color="green-1" name="home_work" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Beranda</q-item-label>
					<q-item-label caption>Beranda Sekretariat</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>

		<!-- MAKHADIYAH -->
		<q-separator dark />
		<q-expansion-item
			expand-separator
			label="Makhadiyah"
			caption="Kedaerahan"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<q-item clickable v-ripple to="/makhadiyah/mutasi">
				<q-item-section avatar>
					<q-icon color="green-1" name="sym_o_follow_the_signs" />
					<!-- <q-icon color="green-1" name="digital_out_of_home" /> -->
				</q-item-section>
				<q-item-section>
					<q-item-label> Mutasi </q-item-label>
					<q-item-label caption>Mutasi dan Relokasi</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>

		<!-- BENDAHARA -->
		<q-separator dark />
		<q-expansion-item
			expand-separator
			label="Bendahara"
			caption="Iuran"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<q-item clickable v-ripple to="/bendahara">
				<q-item-section avatar>
					<q-icon color="green-1" name="payments" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Iuran</q-item-label>
					<q-item-label caption>Iuran Santri dan Murid</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>

		<!-- MADRASARAH -->
		<q-separator dark />
		<q-expansion-item
			expand-separator
			label="Madrasah"
			caption="Kemuridan dan Keguruan"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<q-item
				v-for="item in menuMadrasah"
				:key="item.to"
				:clickable="!item.disable"
				v-ripple
				:to="item.to"
				:disable="item.disable"
			>
				<q-item-section avatar>
					<q-icon color="green-1" :name="item.icon" />
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ item.label }}</q-item-label>
					<q-item-label caption>{{ item.caption }}</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>

		<!-- KEAMANAN -->
		<q-separator dark />
		<q-expansion-item
			expand-separator
			label="Keamanan"
			caption="Perizinan dan Pelanggaran"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<q-item
				v-for="item in menuKeamanan"
				:key="item.to"
				:clickable="!item.disable"
				v-ripple
				:to="item.to"
				:disable="item.disable"
			>
				<q-item-section avatar>
					<q-icon color="green-1" :name="item.icon" />
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ item.label }}</q-item-label>
					<q-item-label caption>{{ item.caption }}</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>

		<!-- UGT -->
		<q-separator dark />
		<q-expansion-item
			expand-separator
			label="UGT"
			caption="Urusan Guru Tugas"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<q-item
				v-for="item in menuUgt"
				:key="item.to"
				:clickable="!item.disable"
				v-ripple
				:to="item.to"
				:disable="item.disable"
			>
				<q-item-section avatar>
					<q-icon color="green-1" :name="item.icon" />
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ item.label }}</q-item-label>
					<q-item-label caption>{{ item.caption }}</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>

		<!-- SETTING -->
		<q-separator dark />
		<q-expansion-item
			expand-separator
			label="Pengaturan"
			caption="Aplikasi dan Pengguna"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<q-item
				v-for="item in menuSetting"
				:key="item.to"
				:clickable="!item.disable"
				v-ripple
				:to="item.to"
				:disable="item.disable"
			>
				<q-item-section avatar>
					<q-icon color="green-1" :name="item.icon" />
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ item.label }}</q-item-label>
					<q-item-label caption>{{ item.caption }}</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>

		<!-- INFO -->
		<q-separator dark />
		<q-expansion-item
			expand-separator
			label="Info"
			caption="Tentang Aplikasi"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<q-item
				v-for="item in menuInfo"
				:key="item.to"
				:clickable="!item.disable"
				v-ripple
				:to="item.to"
				:disable="item.disable"
			>
				<q-item-section avatar>
					<q-icon color="green-1" :name="item.icon" />
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ item.label }}</q-item-label>
					<q-item-label caption>{{ item.caption }}</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>
	</q-list>
</template>

<script setup>
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
