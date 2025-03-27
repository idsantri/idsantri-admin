import { defineStore } from 'pinia';
export default defineStore('modal', {
	state: () => {
		return {
			searchSantri: false,
			crudSantri: false,

			searchWali: false,
			crudWali: false,

			searchOrtu: false,
			crudOrtu: false,
		};
	},
	actions: {
		toggleSearchSantri(v) {
			this.searchSantri = v;
		},
		toggleCrudSantri(v) {
			this.crudSantri = v;
		},

		toggleSearchWali(v) {
			this.searchWali = v;
		},
		toggleCrudWali(v) {
			this.crudWali = v;
		},

		toggleSearchOrtu(v) {
			this.searchOrtu = v;
		},
		toggleCrudOrtu(v) {
			this.crudOrtu = v;
		},
	},
});
