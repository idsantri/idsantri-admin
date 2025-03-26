export default [
	{
		path: '',
		component: () =>
			import('src/pages/personalia/PersonaliaIndexTable.vue'),
	},
	{
		path: ':id',
		component: () => import('src/pages/personalia/PersonaliaDetail.vue'),
		meta: { title: 'Personalia Detail' },
	},
];
