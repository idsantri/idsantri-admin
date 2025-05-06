import type { Component } from 'vue';

export default [
	{
		path: 'lists',
		component: (): Component =>
			import('src/pages/settings/lists/ListsIndex.vue'),
		meta: { title: 'Setting: List' },
		children: [
			{
				path: ':listKey',
				component: (): Component =>
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
				component: (): Component =>
					import('src/pages/settings/users/UserPage.vue'),
			},
			{
				path: ':id',
				component: (): Component =>
					import('src/pages/settings/users/UserId.vue'),
			},
		],
	},
	{
		path: 'profile',
		meta: { title: 'Setting: Profile' },
		children: [
			{
				path: '',
				component: (): Component =>
					import('src/pages/settings/profile/IndexProfile.vue'),
			},
			{
				path: 'upload/:image',
				component: (): Component =>
					import('src/pages/settings/profile/UploadImage.vue'),
			},
		],
	},
	{
		path: 'reports',
		component: (): Component =>
			import('src/pages/settings/reports/IndexReport.vue'),
		meta: { title: 'Setting: Reports' },
	},
	{
		path: 'alamat',
		component: (): Component =>
			import('src/pages/settings/alamat/IndexAlamat.vue'),
		meta: { title: 'Setting: Alamat' },
	},
	{
		path: 'app-wali',
		component: (): Component =>
			import('src/pages/settings/app-wali/IndexPage.vue'),
		meta: { title: 'Setting: App Wali' },
	},
];
