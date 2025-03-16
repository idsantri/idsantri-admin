export default [
	{
		path: '',
		redirect: () => '/bendahara/iuran-old/q/th-ajaran',
	},
	/**
	 * @deprecated
	 */
	{
		path: 'iuran-old/export',
		component: () =>
			import('src/pages/bendahara/iuran-old/export/ExportIndex.vue'),
	},
	{
		path: 'iuran-old/santri/:id/:thAjaranH?',
		component: () =>
			import('src/pages/bendahara/iuran-old/santri/IuranSantri.vue'),
	},

	{
		path: 'iuran-old',
		redirect: () => '/bendahara/iuran-old/q',
	},
	{
		path: 'iuran-old/q',
		redirect: () => '/bendahara/iuran-old/q/th-ajaran',
		children: [
			{
				path: 'th-ajaran/:thAjaranH?',
				component: () =>
					import(
						'src/pages/bendahara/iuran-old/filter/IuranByThAjaran.vue'
					),
			},
			{
				path: 'santri/:id?',
				component: () =>
					import(
						'src/pages/bendahara/iuran-old/filter/IuranBySantri.vue'
					),
			},
			{
				path: 'tanggal/:startDate?/:endDate?',
				component: () =>
					import(
						'src/pages/bendahara/iuran-old/filter/IuranByTanggal.vue'
					),
			},
		],
	},
	{
		path: 'iuran-old/atur-paket',
		component: () =>
			import('src/pages/bendahara/iuran-old/paket/SettingPaket.vue'),
	},
];
