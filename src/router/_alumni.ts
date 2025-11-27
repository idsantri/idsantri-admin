import type { Component } from 'vue';

export default [
	{
		path: '',
		component: (): Component => import('src/pages/alumni/IndexPage.vue'),
	},
];
