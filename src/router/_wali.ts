import type { Component } from 'vue';

export default [
	{
		path: '',
		redirect: 'cari/wali',
	},
	{
		path: ':id',
		component: (): Component => import('src/pages/wali/WaliDetail.vue'),
	},
];
