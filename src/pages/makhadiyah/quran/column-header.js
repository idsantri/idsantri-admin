const optionsColumns = [
	{
		name: 'nama',
		label: 'Nama',
		align: 'left',
		field: 'nama',
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
		name: 'domisili',
		label: 'Domisili',
		align: 'left',
		field: 'domisili',
		sortable: true,
	},
	{
		name: 'marhalah',
		label: 'Marhalah',
		align: 'left',
		field: 'marhalah',
		sortable: true,
	},
	{
		name: 'faslah',
		label: 'Faslah/Kelas',
		align: 'left',
		field: 'faslah',
		sortable: true,
	},
];
export const columnSantri = [
	{
		name: 'id',
		label: 'ID Santri',
		align: 'center',
		field: 'id',
		sortable: true,
	},
	...optionsColumns,
];

export const columnMutaallim = [
	{
		name: 'santri_id',
		label: 'ID Santri',
		align: 'center',
		field: 'santri_id',
		sortable: true,
	},
	...optionsColumns,
];
