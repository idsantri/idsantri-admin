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
				redirect: (to: RouteLocation): string => to.fullPath + '/status',
			},
			{
				path: 'status',
				component: (): Component => import('src/pages/santri/relations/SantriStatus.vue'),
			},

			{
				path: 'kelas',
				component: (): Component => import('src/pages/santri/relations/SantriKelas.vue'),
			},
			{
				path: 'domisili',
				component: (): Component => import('src/pages/santri/relations/SantriDomisili.vue'),
			},
			{
				path: 'wali',
				component: (): Component => import('src/pages/santri/relations/SantriWali.vue'),
			},
			{
				path: 'ortu',
				component: (): Component => import('src/pages/santri/relations/SantriOrtu.vue'),
			},
		],
	},
	{
		path: 'export',
		component: (): Component => import('src/pages/santri/ExportPage.vue'),
	},
];
