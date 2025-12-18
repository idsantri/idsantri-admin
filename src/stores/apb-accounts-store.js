import { defineStore } from 'pinia';
import ApbAccount from 'src/models/ApbAccount';

export default defineStore('accounts-store', {
	state: () => {
		return {
			loading: false,
			accounts: [],
			account: {},
		};
	},

	getters: {
		optionsSelect: (state) =>
			state.accounts
				.filter((account) => account.hidden == 0)
				.map((account) => {
					return { group_nama: account.group + ': ' + account.nama, ...account };
				})
				.sort((a, b) => a.group.localeCompare(b.group)),
	},

	actions: {
		async loadAccounts(notify = true) {
			try {
				this.loading = true;
				const data = await ApbAccount.getAll({ notifySuccess: notify });
				this.accounts = data.accounts;
			} catch (err) {
				console.error('🚀 ~ err:', err);
			} finally {
				this.loading = false;
			}
		},
	},
	storage: sessionStorage,
});
