// TODO: untuk iuran-old. belum diterapkan yang baru
// DELETE

import { defineStore } from 'pinia';
export default defineStore('lists-iuran', {
	state: () => {
		return {
			thAjaran: [],
		};
	},

	getters: {
		// getThAjaran: (state) => state.thAjaran,
	},

	actions: {
		getThAjaran() {
			return this.thAjaran;
		},

		setThAjaran(payload) {
			this.thAjaran = payload;
		},

		addItemToTahun(payloadItem, item, tahun) {
			this.thAjaran.forEach((th) => {
				if (th.th_ajaran_h == tahun) {
					th[item] = payloadItem;
				}
			});
		},

		getItemByTahun(item, tahun) {
			const filterTahun = this.thAjaran.find((th) => {
				return th.th_ajaran_h == tahun;
			});
			if (filterTahun) {
				return filterTahun[item] || [];
			} else {
				return [];
			}
		},
	},

	persist: {
		storage: sessionStorage,
	},
});
