import { defineStore } from 'pinia';
const loadingStore = defineStore('loading', {
	state: () => {
		return {
			loadingMain: false,
		};
	},
	actions: {
		setLoadingMain(v) {
			this.loadingMain = v;
		},
	},
});

export default loadingStore;
