import type { Component } from 'vue';
import type { RouteLocation } from 'vue-router';

export default [
	{
		path: '',
		redirect: (to: RouteLocation): string => `${to.fullPath}/izin-pesantren`,
	},

	// izin-pesantren
	{
		path: 'izin-pesantren',
		children: [
			{
				path: '',
				redirect: (to: RouteLocation): string => `${to.fullPath}/th-ajaran`,
				component: (): Component => import('src/pages/keamanan/perizinan/IzinIndex.vue'),
				children: [
					{
						path: 'th-ajaran/:thAjaranH?',
						component: (): Component => import('src/pages/keamanan/perizinan/IzByTahun.vue'),
					},
					{
						path: 'tanggal/:startDate?/:endDate?',
						component: (): Component => import('src/pages/keamanan/perizinan/IzByDate.vue'),
					},
					{
						path: 'santri/:id?',
						component: (): Component => import('src/pages/keamanan/perizinan/IzBySantri.vue'),
					},
				],
			},
			{
				path: 'statistik',
				component: (): Component => import('src/pages/keamanan/perizinan/IzinStatistik.vue'),
			},
			{
				// /:id -> matches only numbers
				path: ':id(\\d+)',
				component: (): Component => import('src/pages/keamanan/perizinan/IzinDetail.vue'),
			},
		],
	},

	// indisipliner
	{
		path: 'indisipliner',
		children: [
			{
				path: '',
				redirect: (to: RouteLocation): string => `${to.fullPath}/th-ajaran`,
				component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerIndex.vue'),
				children: [
					{
						path: 'th-ajaran/:thAjaranH?',
						component: (): Component => import('src/pages/keamanan/indisipliner/InByTahun.vue'),
					},
					{
						path: 'tanggal/:startDate?/:endDate?',
						component: (): Component => import('src/pages/keamanan/indisipliner/InByDate.vue'),
					},
					{
						path: 'santri/:id?',
						component: (): Component => import('src/pages/keamanan/indisipliner/InBySantri.vue'),
					},
				],
			},
			{
				path: 'statistik',
				component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerStatistik.vue'),
			},
			{
				// /:id -> matches only numbers
				path: ':id(\\d+)',
				component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerDetail.vue'),
			},
		],
	},
];
