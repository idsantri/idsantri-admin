import type { Component } from 'vue';

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
];
