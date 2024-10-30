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
			<!-- APP -->
			<q-item clickable v-ripple to="/madrasah/murid">
				<q-item-section avatar>
					<q-icon color="green-1" name="school" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Murid</q-item-label>
					<q-item-label caption>Data Murid</q-item-label>
				</q-item-section>
			</q-item>

			<q-item clickable v-ripple to="/madrasah/absensi/input/sekolah">
				<q-item-section avatar>
					<q-icon color="green-1" name="checklist" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Absensi</q-item-label>
					<q-item-label caption>Sekolah dan Musyawarah</q-item-label>
				</q-item-section>
			</q-item>
			<!-- <q-item clickable v-ripple to="/madrasah/tingkat">
				<q-item-section avatar>
					<q-icon color="green-1" name="history_edu" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Tingkat Pendidikan</q-item-label>
					<q-item-label caption
						>Data Murid Pertingkat Pendidikan</q-item-label
					>
				</q-item-section>
			</q-item> -->
			<q-item clickable v-ripple to="/madrasah/nilai-mapel/rerata">
				<q-item-section avatar>
					<q-icon color="green-1" name="show_chart" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Nilai</q-item-label>
					<q-item-label caption>Mata Pelajaran & Ahwal</q-item-label>
				</q-item-section>
			</q-item>
			<q-item clickable v-ripple to="/madrasah/aparatur">
				<q-item-section avatar>
					<q-icon color="green-1" name="contact_emergency" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Aparatur Madrasah</q-item-label>
					<q-item-label caption>Data Aparatur Madrasah</q-item-label>
				</q-item-section>
			</q-item>

			<q-item clickable v-ripple to="/madrasah/rapor-printed">
				<q-item-section avatar>
					<q-icon color="green-1" name="sym_o_print_lock" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Rapor</q-item-label>
					<q-item-label caption>Rapor Tercetak</q-item-label>
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
			<q-item clickable v-ripple to="/keamanan/izin-pesantren">
				<q-item-section avatar>
					<q-icon color="green-1" name="transfer_within_a_station" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Perizinan</q-item-label>
					<q-item-label caption
						>Data Perizinan Pesantren</q-item-label
					>
				</q-item-section>
			</q-item>

			<q-item clickable v-ripple to="/keamanan/indisipliner">
				<q-item-section avatar>
					<q-icon color="green-1" name="directions_run" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Pelanggaran</q-item-label>
					<q-item-label caption>Data Pelanggaran</q-item-label>
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
			<q-item clickable v-ripple to="/ugt/pjgt">
				<q-item-section avatar>
					<q-icon color="green-1" name="person_2" />
				</q-item-section>
				<q-item-section>
					<q-item-label>PJGT</q-item-label>
					<q-item-label caption
						>Penanggung Jawab Guru Tugas</q-item-label
					>
				</q-item-section>
			</q-item>
			<q-item clickable v-ripple to="/ugt/gt">
				<q-item-section avatar>
					<q-icon color="green-1" name="school" />
				</q-item-section>
				<q-item-section>
					<q-item-label>GT</q-item-label>
					<q-item-label caption>Guru Tugas</q-item-label>
				</q-item-section>
			</q-item>
			<q-item clickable v-ripple to="/ugt/kas">
				<q-item-section avatar>
					<q-icon color="green-1" name="account_balance_wallet" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Kas</q-item-label>
					<q-item-label caption>Keuangan</q-item-label>
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
			<!-- APP -->
			<q-item clickable v-ripple to="/settings/lists">
				<q-item-section avatar>
					<q-icon color="green-1" name="list" />
				</q-item-section>
				<q-item-section>
					<q-item-label>List</q-item-label>
					<q-item-label caption>
						Auto Complete (Form Isian)
					</q-item-label>
				</q-item-section>
			</q-item>

			<!-- USER -->
			<q-item clickable v-ripple to="/settings/users">
				<q-item-section avatar>
					<q-icon color="green-1" name="manage_accounts" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Users</q-item-label>
					<q-item-label caption>Akses Pengguna</q-item-label>
				</q-item-section>
			</q-item>

			<q-item clickable v-ripple to="/settings/profile">
				<q-item-section avatar>
					<q-icon color="green-1" name="room_preferences" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Profil</q-item-label>
					<q-item-label caption>Profil Lembaga</q-item-label>
				</q-item-section>
			</q-item>

			<q-item clickable v-ripple to="/settings/reports">
				<q-item-section avatar>
					<q-icon color="green-1" name="print" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Report</q-item-label>
					<q-item-label caption>Print Out</q-item-label>
				</q-item-section>
			</q-item>

			<q-item clickable v-ripple to="/settings/alamat">
				<q-item-section avatar>
					<q-icon color="green-1" name="location_on" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Alamat</q-item-label>
					<q-item-label caption>Daftar Alamat</q-item-label>
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
			<!-- USER -->
			<q-item clickable v-ripple to="/info/download">
				<q-item-section avatar>
					<q-icon color="green-1" name="download" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Download</q-item-label>
					<q-item-label caption>Unduh Aplikasi</q-item-label>
				</q-item-section>
			</q-item>

			<q-item clickable v-ripple to="/info/release">
				<q-item-section avatar>
					<q-icon color="green-1" name="new_releases" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Release</q-item-label>
					<q-item-label caption>App Version</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>
	</q-list>
</template>

<script setup></script>
