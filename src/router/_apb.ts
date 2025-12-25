import type { Component } from 'vue';

export default [
	{
		path: 'transactions',
		children: [
			{
				path: '',
				component: (): Component => import('src/pages/apb/transactions/PageIndex.vue'),
			},
			{
				path: ':id',
				component: (): Component => import('src/pages/apb/transactions/PageDetail.vue'),
			},
		],
	},

	{
		path: 'accounts',
		children: [
			{
				path: '',
				component: (): Component => import('src/pages/apb/accounts/PageIndex.vue'),
			},
			{
				path: ':id',
				component: (): Component => import('src/pages/apb/accounts/PageDetail.vue'),
			},
		],
	},

	{
		path: 'budgets',
		children: [
			{
				path: '',
				component: (): Component => import('src/pages/apb/budgets/PageIndex.vue'),
			},
			{
				path: ':id',
				component: (): Component => import('src/pages/apb/budgets/PageDetail.vue'),
			},
		],
	},
];
