import type { Component } from 'vue';
import type { RouteLocation } from 'vue-router';

export default [
	{
		path: '',
		redirect: (to: RouteLocation): string => to.fullPath + '/santri',
	},
	{
		path: 'santri',
		component: (): Component => import('src/pages/search/SantriSearch.vue'),
	},
	{
		path: 'wali',
		component: (): Component => import('src/pages/search/WaliSearch.vue'),
	},
	{
		path: 'ortu',
		component: (): Component => import('src/pages/search/OrtuSearch.vue'),
	},
];
