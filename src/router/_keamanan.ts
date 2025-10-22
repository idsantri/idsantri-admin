import type { Component } from 'vue';
import type { RouteLocation } from 'vue-router';

export default [
	{
		path: '',
		redirect: (to: RouteLocation): string => `${to.fullPath}/izin-pesantren`,
	},

	// izin-pesantren
	{
		path: 'izin-pesantren/:startDate?/:endDate?',
		component: (): Component => import('src/pages/keamanan/perizinan/IzinByDate.vue'),
	},
	{
		path: 'izin-pesantren/santri/:santri_id',
		component: (): Component => import('src/pages/keamanan/perizinan/IzinBySantri.vue'),
	},
	{
		// /:id -> matches only numbers
		path: 'izin-pesantren/:id(\\d+)',
		component: (): Component => import('src/pages/keamanan/perizinan/IzinById.vue'),
	},

	// indisipliner
	{
		path: 'indisipliner/:startDate?/:endDate?',
		component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerByDate.vue'),
	},
	{
		path: 'indisipliner/santri/:santri_id',
		component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerBySantri.vue'),
	},
	{
		// /:id -> matches only numbers
		path: 'indisipliner/:id(\\d+)',
		component: (): Component => import('src/pages/keamanan/indisipliner/IndisiplinerById.vue'),
	},
];
