const data = [
	{
		url: 'domisili',
		label: 'Domisili',
		columns: ['Domisili/Asrama'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'hubungan-wali',
		label: 'Hubungan Wali',
		columns: ['Status Hubungan Wali'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'jabatan-madrasiyah',
		label: 'Jabatan Madrasiyah',
		columns: ['Jabatan'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'kelas',
		label: 'Kelas',
		columns: ['Kelas'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'satuan',
		label: 'Satuan',
		columns: ['Satuan'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'siklus',
		label: 'Siklus',
		columns: ['Siklus'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'keterangan-izin',
		label: 'Keterangan Izin',
		columns: ['Keterangan'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'metode-pembayaran',
		label: 'Metode Pembayaran',
		columns: ['Metode Pembayaran'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'pekerjaan',
		label: 'Pekerjaan',
		columns: ['Pekerjaan'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'jenis-lembaga-pendidikan',
		label: 'Jenis Lembaga Pendidikan',
		columns: ['Lembaga Pendidikan'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'wilayah-ugt',
		label: 'Wilayah UGT',
		columns: ['Wilayah'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'pendidikan-akhir-diniyah',
		label: 'Pendidikan Akhir Diniyah',
		columns: ['Pendidikan Akhir'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'pendidikan-akhir-formal',
		label: 'Pendidikan Akhir Formal',
		columns: ['Pendidikan Akhir'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'takzir-santri',
		label: 'Takzir Santri',
		columns: ['Takzir'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'status',
		label: 'Status',
		columns: ['Status'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'sifat-izin',
		label: 'Sifat Izin',
		columns: ['Sifat Izin'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'keperluan-izin',
		label: 'Keperluan Izin',
		columns: ['Keperluan'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'tatib-santri',
		label: 'Tatib Santri',
		columns: ['Pasal', 'Teks Tatib'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'tahun-ajaran',
		label: 'Tahun Ajaran',
		columns: ['Tahun Ajaran H', 'Tahun Ajaran M'],
		protected: false,
		sort: 'desc',
	},
	{
		url: 'iuran',
		label: 'Iuran',
		columns: ['Item', 'Nominal Default', 'ID (Kode)'],
		protected: false,
		sort: 'asc',
	},
	{
		url: 'tingkat-pendidikan',
		label: 'Tingkat Pendidikan',
		columns: ['Tingkat ID', 'Label Tingkat'],
		protected: true,
		sort: 'asc',
	},
	{
		url: 'faslah-quran',
		label: 'Faslah/Kelas Quran (Tajwid)',
		columns: ['Faslah/Kelas'],
		protected: false,
		sort: 'asc',
	},
];

// Menambahkan properti 'key' ke setiap objek
const dataWithKey = data.map((item) => ({
	...item,
	key: item.url.replace(/-/g, '_'),
}));

const listData = Object.values(dataWithKey).sort((a, b) => {
	return a.label > b.label ? 1 : -1;
});

export default listData;
