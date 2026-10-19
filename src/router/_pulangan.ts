import type { Component } from 'vue';

export default [
	{
		path: '',
		component: (): Component => import('src/pages/pulangan/IndexPage.vue'),
	},
	{
		path: ':id',
		component: (): Component => import('src/pages/pulangan/DetailPage.vue'),
	},
	{
		path: ':id/detail/edit',
		component: (): Component => import('src/pages/pulangan/DetailEdit.vue'),
	},
	{
		path: ':id/santri',
		component: (): Component => import('src/pages/pulangan/SantriPage.vue'),
	},
];
