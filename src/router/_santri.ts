import { RouteLocation } from 'vue-router';

export default [
	{
		path: '',
		redirect: 'cari/santri',
	},
	{
		path: ':id(\\d+)',
		component: () => import('src/pages/santri/SantriDetail.vue'),
		children: [
			{
				path: '',
				redirect: (to: RouteLocation) => to.fullPath + '/status',
			},
			{
				path: 'status',
				component: () =>
					import(
						'src/pages/santri/relations/status/SantriStatus.vue'
					),
			},

			{
				path: 'kelas',
				component: () =>
					import('src/pages/santri/relations/kelas/SantriKelas.vue'),
			},
			{
				path: 'domisili',
				component: () =>
					import(
						'src/pages/santri/relations/domisili/SantriDomisili.vue'
					),
			},
			{
				path: 'wali',
				component: () =>
					import('src/pages/santri/relations/wali/SantriWali.vue'),
			},
			{
				path: 'ortu',
				component: () =>
					import('src/pages/santri/relations/ortu/SantriOrtu.vue'),
			},
			// {
			// 	path: 'iuran-total',
			// 	component: () =>
			// 		import(
			// 			'src/pages/santri/relations/iuran-total/SantriIuranTotal.vue'
			// 		),
			// },
			// {
			// 	path: 'iuran',
			// 	meta: { title: 'Detail Santri — Iuran' },
			// 	component: () =>
			// 		import('src/pages/santri/iuran/SantriIuran.vue'),
			// 	children: [
			// 		{
			// 			path: ':th_ajaran_h',
			// 			component: () =>
			// 				import(
			// 					'src/pages/santri/iuran/SantriIuranTh.vue'
			// 				),
			// 		},
			// 	],
			// },
		],
	},
	{
		path: 'export',
		component: () => import('src/pages/santri/ExportPage.vue'),
	},
];
