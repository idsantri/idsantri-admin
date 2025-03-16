export default [
	{
		path: '',
		component: () => import('src/pages/iuran/PageIndex.vue'),
		redirect: '/iuran/santri',
		children: [
			{
				path: 'santri/:id?/:thAjaranH?',
				// component: () => import('src/pages/iuran/PageIndex.vue'),
				component: () =>
					import('src/pages/iuran/santri/PageIuranSantri.vue'),
				// children: [
				// 	{
				// 		path: ':id(\\d+)/:thAjaranH?',
				// 		component: () =>
				// 			import(
				// 				'src/pages/iuran/santri/PageIuranSantri.vue'
				// 			),
				// 	},
				// ],
			},
			{
				path: 'th-ajaran/:thAjaranH?',
				component: () =>
					import('src/pages/iuran/th-ajaran/PageIndex.vue'),
			},
			{
				path: 'tanggal',
				component: () =>
					import('src/pages/iuran/tanggal/PageIndex.vue'),
			},
		],
	},
	// {
	// 	path: 'santri/:id(\\d+)/:thAjaranH?',
	// 	component: () => import('src/pages/iuran/santri/PageIuranSantri.vue'),
	// },
];
