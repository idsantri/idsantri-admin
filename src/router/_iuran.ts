import { RouteLocation } from 'vue-router';

export default [
	{
		path: '',
		component: () => import('src/pages/iuran/PageIndex.vue'),
		redirect: (to: RouteLocation) => to.fullPath + '/santri',
		children: [
			{
				path: 'santri/:id?/:thAjaranH?',
				component: () =>
					import('src/pages/iuran/santri/PageIuranSantri.vue'),
			},
			{
				path: 'th-ajaran/:thAjaranH?',
				component: () =>
					import('src/pages/iuran/th-ajaran/PageIndex.vue'),
			},
			// {
			// 	path: 'tanggal',
			// 	component: () =>
			// 		import('src/pages/iuran/tanggal/PageIndex.vue'),
			// },
		],
	},
	{
		path: 'paket',
		component: () => import('src/pages/iuran/paket/PageIndex.vue'),
	},
	{
		path: 'tagihan/:th_ajaran_h?/:tingkat_id?/:kelas?',
		component: () => import('src/pages/iuran/tagihan/PageTagihan.vue'),
	},
];
