import type { Component } from 'vue';

export default [
	{
		path: '',
		redirect: 'cari/ortu',
	},
	{
		path: ':id',
		component: (): Component => import('src/pages/ortu/OrtuDetail.vue'),
	},
];
