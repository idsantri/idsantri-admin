import type { Component } from 'vue';

export default [
	{
		path: '',
		redirect: (): string => '/iuran',
	},
	/**
	 * @deprecated
	 */
	{
		path: 'iuran-old/export',
		component: (): Component =>
			import('src/pages/bendahara/iuran-old/export/ExportIndex.vue'),
	},
	{
		path: 'iuran-old/santri/:id/:thAjaranH?',
		component: (): Component =>
			import('src/pages/bendahara/iuran-old/santri/IuranSantri.vue'),
	},

	{
		path: 'iuran-old',
		redirect: (): string => '/bendahara/iuran-old/q',
	},
	{
		path: 'iuran-old/q',
		redirect: (): string => '/bendahara/iuran-old/q/th-ajaran',
		children: [
			{
				path: 'th-ajaran/:thAjaranH?',
				component: (): Component =>
					import(
						'src/pages/bendahara/iuran-old/filter/IuranByThAjaran.vue'
					),
			},
			{
				path: 'santri/:id?',
				component: (): Component =>
					import(
						'src/pages/bendahara/iuran-old/filter/IuranBySantri.vue'
					),
			},
			{
				path: 'tanggal/:startDate?/:endDate?',
				component: (): Component =>
					import(
						'src/pages/bendahara/iuran-old/filter/IuranByTanggal.vue'
					),
			},
		],
	},
	{
		path: 'iuran-old/atur-paket',
		component: (): Component =>
			import('src/pages/bendahara/iuran-old/paket/SettingPaket.vue'),
	},
];
