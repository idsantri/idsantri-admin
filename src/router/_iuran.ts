import type { Component } from 'vue';
import type { RouteLocation } from 'vue-router';

export default [
	{
		path: '',
		component: (): Component => import('src/pages/iuran/PageIndex.vue'),
		redirect: (to: RouteLocation): string => to.fullPath + '/santri',
		children: [
			{
				path: 'santri/:id?/:thAjaranH?',
				component: (): Component =>
					import('src/pages/iuran/santri/PageIuranSantri.vue'),
			},
			{
				path: 'th-ajaran/:thAjaranH?',
				component: (): Component =>
					import('src/pages/iuran/th-ajaran/PageIndex.vue'),
			},
			// {
			// 	path: 'tanggal',
			// 	component: (): Component =>
			// 		import('src/pages/iuran/tanggal/PageIndex.vue'),
			// },
		],
	},
	{
		path: 'paket',
		component: (): Component =>
			import('src/pages/iuran/paket/PageIndex.vue'),
	},
	{
		path: 'download',
		component: (): Component =>
			import('src/pages/iuran/tagihan/DownloadData.vue'),
	},
	{
		path: 'tagihan/:th_ajaran_h?/:tingkat_id?/:kelas?',
		component: (): Component =>
			import('src/pages/iuran/tagihan/PageTagihan.vue'),
	},
];
