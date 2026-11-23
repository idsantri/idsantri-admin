import type { Component } from 'vue';
import type { RouteLocation } from 'vue-router';

export default [
	{
		path: '',
		redirect: (): string => '/ugt/pjgt',
	},
	{
		path: 'pjgt',
		component: (): Component => import('src/pages/ugt/pjgt/PjgtIndex.vue'),
	},
	{
		path: 'pjgt/:id',
		component: (): Component => import('src/pages/ugt/pjgt/PjgtDetail.vue'),
	},
	{
		path: 'gt',
		component: (): Component => import('src/pages/ugt/gt/GtIndex.vue'),
	},
	{
		path: 'gt/:id',
		component: (): Component => import('src/pages/ugt/gt/GtDetail.vue'),
	},
	{
		path: 'kas',
		component: (): Component => import('src/pages/ugt/kas/KasIndex.vue'),
	},
	{
		path: 'laporan',
		component: (): Component => import('src/pages/ugt/laporan/IndexPage.vue'),
		redirect: (to: RouteLocation): string => to.fullPath + '/config',
		children: [
			{
				path: 'gt',
				component: (): Component => import('src/pages/ugt/laporan/gt/LaporanPage.vue'),
			},
			{
				path: 'config',
				component: (): Component => import('src/pages/ugt/laporan/config/ConfigPage.vue'),
			},
		],
	},
	{
		path: 'laporan/gt/:id',
		component: (): Component => import('src/pages/ugt/laporan/gt/LaporanById..vue'),
	},
];
