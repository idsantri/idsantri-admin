export default [
	{
		path: 'lists',
		component: () => import('src/pages/settings/lists/ListsIndex.vue'),
		meta: { title: 'Setting: List' },
		children: [
			{
				path: ':listKey',
				component: () =>
					import('src/pages/settings/lists/ListsByKey.vue'),
			},
		],
	},
	{
		path: 'users',
		meta: { title: 'Setting: User' },
		children: [
			{
				path: '',
				component: () =>
					import('src/pages/settings/users/UserPage.vue'),
			},
			{
				path: ':id',
				component: () => import('src/pages/settings/users/UserId.vue'),
			},
		],
	},
	{
		path: 'profile',
		meta: { title: 'Setting: Profile' },
		children: [
			{
				path: '',
				component: () =>
					import('src/pages/settings/profile/IndexProfile.vue'),
			},
			{
				path: 'sign',
				component: () =>
					import('src/pages/settings/profile/TandaTangan.vue'),
			},
		],
	},
	{
		path: 'reports',
		component: () => import('src/pages/settings/reports/IndexReport.vue'),
		meta: { title: 'Setting: Reports' },
	},
	{
		path: 'alamat',
		component: () => import('src/pages/settings/alamat/IndexAlamat.vue'),
		meta: { title: 'Setting: Alamat' },
	},
	{
		path: 'app-wali',
		component: () => import('src/pages/settings/app-wali/IndexPage.vue'),
		meta: { title: 'Setting: App Wali' },
	},
];
