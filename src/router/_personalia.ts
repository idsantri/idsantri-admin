import type { Component } from 'vue';

export default [
	{
		path: '',
		component: (): Component =>
			import('src/pages/personalia/PersonaliaIndexTable.vue'),
	},
	{
		path: ':id',
		component: (): Component =>
			import('src/pages/personalia/PersonaliaDetail.vue'),
		meta: { title: 'Personalia Detail' },
	},
];
