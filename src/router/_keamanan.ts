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
				path: ':startDate?/:endDate?',
				component: (): Component => import('src/pages/keamanan/perizinan/IzinByDate.vue'),
			},
			{
				path: 'santri/:santri_id',
				component: (): Component => import('src/pages/keamanan/perizinan/IzinBySantri.vue'),
			},
			{
				path: 'statistik',
				component: (): Component => import('src/pages/keamanan/perizinan/IzinStatistik.vue'),
			},
			{
				// /:id -> matches only numbers
				path: ':id(\\d+)',
				component: (): Component => import('src/pages/keamanan/perizinan/IzinById.vue'),
			},
		],
	},

	// indisipliner
	{
		path: 'indisipliner',
		children: [
			{
				path: ':startDate?/:endDate?',
				component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerByDate.vue'),
			},
			{
				path: 'santri/:santri_id',
				component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerBySantri.vue'),
			},
			{
				path: 'statistik',
				component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerStatistik.vue'),
			},
			{
				// /:id -> matches only numbers
				path: ':id(\\d+)',
				component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerById.vue'),
			},
		],
	},
];
