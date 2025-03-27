import type { Component } from 'vue';
import type { RouteLocation } from 'vue-router';

export default [
	{
		path: 'mutasi',
		redirect: (to: RouteLocation): string => `${to.fullPath}/result`,
		meta: { title: 'Makhadiyah: Mutasi Domisili' },
		children: [
			{
				path: 'result',
				component: (): Component =>
					import(
						'src/pages/makhadiyah/mutasi/result/ResultMutasi.vue'
					),
			},
			{
				path: 'start',
				component: (): Component =>
					import(
						'src/pages/makhadiyah/mutasi/proses/ProsesiIndex.vue'
					),
			},
		],
	},
];
