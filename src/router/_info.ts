import type { Component } from 'vue';

export default [
	{
		path: 'release',
		component: (): Component => import('src/pages/info/ReleasePage.vue'),
		meta: { title: 'Info: Release' },
	},
	{
		path: 'download',
		component: (): Component => import('src/pages/info/DownloadPage.vue'),
		meta: { title: 'Info: Download' },
	},
];
