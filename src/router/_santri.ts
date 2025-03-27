import type { Component } from 'vue';
import type { RouteLocation } from 'vue-router';

export default [
	{
		path: '',
		redirect: 'cari/santri',
	},
	{
		path: ':id(\\d+)',
		component: (): Component => import('src/pages/santri/SantriDetail.vue'),
		children: [
			{
				path: '',
				redirect: (to: RouteLocation): string =>
					to.fullPath + '/status',
			},
			{
				path: 'status',
				component: (): Component =>
					import(
						'src/pages/santri/relations/status/SantriStatus.vue'
					),
			},

			{
				path: 'kelas',
				component: (): Component =>
					import('src/pages/santri/relations/kelas/SantriKelas.vue'),
			},
			{
				path: 'domisili',
				component: (): Component =>
					import(
						'src/pages/santri/relations/domisili/SantriDomisili.vue'
					),
			},
			{
				path: 'wali',
				component: (): Component =>
					import('src/pages/santri/relations/wali/SantriWali.vue'),
			},
			{
				path: 'ortu',
				component: (): Component =>
					import('src/pages/santri/relations/ortu/SantriOrtu.vue'),
			},
			// {
			// 	path: 'iuran-total',
			// 	component: (): Component =>
			// 		import(
			// 			'src/pages/santri/relations/iuran-total/SantriIuranTotal.vue'
			// 		),
			// },
			// {
			// 	path: 'iuran',
			// 	meta: { title: 'Detail Santri — Iuran' },
			// 	component: (): Component =>
			// 		import('src/pages/santri/iuran/SantriIuran.vue'),
			// 	children: [
			// 		{
			// 			path: ':th_ajaran_h',
			// 			component: (): Component =>
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
		component: (): Component => import('src/pages/santri/ExportPage.vue'),
	},
];
