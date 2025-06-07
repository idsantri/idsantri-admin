<template>
	<q-page class="q-pa-sm">
		<q-card>
			<CardHeader :show-reload="false" title="Releases" />
			<q-card-section>
				<div class="text-subtitle2 text-weight-bold">ID Santri</div>
				<div class="text-subtitle1">{{ config.INS_SHORT }}</div>
				<div class="text-caption">
					{{ config.INS_DESC }} {{ config.INS_NAME }}
				</div>
			</q-card-section>
			<q-card-section class="q-pt-none">
				<div
					v-for="(item, index) in releases"
					:key="index"
					class="q-mb-sm"
				>
					<q-list bordered separator>
						<q-item-label
							header
							class="bg-green-1 q-pa-sm text-italic"
						>
							ver. {{ item.ver }}
							<span class="text-caption">
								({{ item.date }})
							</span>
						</q-item-label>

						<q-item
							v-for="(item, index) in item.release"
							:key="index"
						>
							<q-item-section>
								<q-item-label> {{ index }} </q-item-label>
								<q-item-label caption>
									<ul
										class="no-margin"
										style="
											padding-inline-start: 16px;
											list-style-type: disc;
										"
									>
										<li v-for="(it, id) in item" :key="id">
											{{ it }}
										</li>
									</ul>
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</div>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import CardHeader from 'src/components/CardHeader.vue';
import config from 'src/config';

const releases = [
	{
		ver: '1.3.2',
		date: 'Juni 2025',
		release: {
			Baru: ['Virtual Account (VA) untuk pembayaran iuran'],
			Download: ['Detail status akhir santri'],
		},
	},
	{
		ver: '1.3.1',
		date: 'Mei 2025',
		release: {
			Baru: [
				'Upload stempel lembaga',
				'Setting Aplikasi Wali Santri',
				'Sertifikat GT',
			],
		},
	},
	{
		ver: '1.3.1',
		date: 'Mei 2025',
		release: {
			Baru: [
				'Upload stempel lembaga',
				'Setting Aplikasi Wali Santri',
				'Sertifikat GT',
			],
		},
	},
	{
		ver: '1.3.0',
		date: 'April 2025',
		release: {
			Iuran: ['Fitur Tagihan', 'Item iuran/tagihan harus unik'],
			Print: ['Cetak ID Card'],
			Baru: ['Add User Info to Main Layout'],
			Improve: [
				'Perbaikan dan peningkatan performa',
				'Perbaikan pada beberapa fitur',
			],
		},
	},
	{
		ver: '1.2.4',
		date: 'Desember 2024',
		release: {
			'Fitur Baru': ['Ekspor iuran pivot', 'Styling'],
		},
	},
	{
		ver: '1.2.3',
		date: 'Oktober 2024',
		release: {
			'Fitur Baru': ['Cetak Rapor (MS Access)'],
		},
	},
	{
		ver: '1.2.2',
		date: 'September 2024',
		release: {
			'Fitur Baru': ['Pembayaran paket iuran', 'Setting alamat'],
			Improve: [
				'Local storage pada input alamat',
				'Perbaikan dan peningkatan performa',
			],
		},
	},
	{
		ver: '1.2.1',
		date: 'Agustus 2024',
		release: {
			'Fitur Baru': ['Upload tanda tangan pengurus'],
			Improve: ['Beberapa perbaikan di sisi backend'],
		},
	},
	{
		ver: '1.2.0',
		date: 'Juli 2024',
		release: {
			'Izin Pesantren': [
				'Riwayat izin santri',
				'Filter by ID Santri',
				'Tambah field pengajuan (baru/perpanjangan)',
			],
			Indisipliner: [
				'Riwayat indisipliner santri',
				'Filter by ID Santri',
			],
			'Fitur Baru': ['Kenaikan Kelas', 'Mutasi Domisili'],
			Improve: ['Nilai default pada input Wali'],
		},
	},
	{
		ver: '1.1.0',
		date: 'Juni 2024',
		release: {
			'Fitur Baru': ['Nilai Mapel', 'Nilai Ahwal'],
			Improve: [
				'Filter Madrasah: session storage',
				'All Lists: local storage',
			],
		},
	},
	{
		ver: '1.0.1',
		date: 'April 2024',
		release: {
			PJGT: ['Perbaikan input alamat PJGT'],
			Absensi: [
				'Perbaikian dan penyempurnaan',
				'Print absensi di arahkan ke MS Access',
			],
			'Lists Auto Complete': ['Abaikan huruf besar kecil dalam sort'],
		},
	},
	{
		ver: '1.0.0',
		date: 'Maret 2024',
		release: {
			'New Release': ['Semua fitur basic'],
		},
	},
];
</script>

<style scoped></style>
