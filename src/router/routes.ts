import type { RouteRecordRaw } from 'vue-router';
import _auth from './_auth';
import _cari from './_cari';
import _keamanan from './_keamanan';
import _ortu from './_ortu';
import _personalia from './_personalia';
import _santri from './_santri';
import _sekretariat from './_sekretariat';
import _settings from './_settings';
import _ugt from './_ugt';
import _wali from './_wali';
import _madrasah from './_madrasah';
import _info from './_info';
import _makhadiyah from './_makhadiyah';
import _iuran from './_iuran';

const routes: RouteRecordRaw[] = [
	// layout auth
	{
		path: '/',
		name: 'Auth',
		component: () => import('layouts/AuthLayout.vue'),
		children: _auth,
	},

	// layout main
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: 'cari',
				component: () => import('src/pages/search/IndexSearch.vue'),
				meta: { title: 'Cari' },
				children: _cari,
			},
			{
				path: 'santri',
				meta: { title: 'Detail Santri' },
				children: _santri,
			},
			{
				path: 'wali',
				meta: { title: 'Detail Wali' },
				children: _wali,
			},
			{
				path: 'ortu',
				meta: { title: 'Detail Orang Tua' },
				children: _ortu,
			},
			{
				path: 'home',
				component: () => import('src/pages/home/HomeIndex.vue'),
				meta: { title: 'Home' },
			},
			{
				path: 'sekretariat',
				meta: { title: 'Sekretariat' },
				children: _sekretariat,
			},
			{
				path: 'iuran',
				meta: { title: 'Iuran dan Tagihan' },
				children: _iuran,
			},
			{
				path: 'madrasah',
				meta: { title: 'Madrasah' },
				children: _madrasah,
			},
			{
				path: 'makhadiyah',
				meta: { title: 'Makhadiyah' },
				children: _makhadiyah,
			},
			{
				path: 'keamanan',
				meta: { title: 'Keamanan' },
				children: _keamanan,
			},
			{
				path: 'personalia',
				meta: { title: 'Personalia' },
				children: _personalia,
			},
			{
				path: 'ugt',
				meta: { title: 'UGT' },
				children: _ugt,
			},
			{
				path: 'settings',
				meta: { title: 'Setting' },
				children: _settings,
			},
			{
				path: 'info',
				meta: { title: 'Info' },
				children: _info,
			},
			{
				path: 'profile',
				component: () => import('src/pages/profile/ProfileIndex.vue'),
				meta: { title: 'User Profile' },
			},
			{
				path: 'test',
				component: () => import('src/pages/testPage.vue'),
			},
			{
				path: 'test-pdf',
				component: () => import('src/pages/testPDF.vue'),
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('src/pages/errors/ErrorNotFound.vue'),
	},
];

export default routes;
