import { defineStore } from 'pinia';
import ApbTransaction from 'src/models/ApbTransaction';
import ArrayCrud from 'src/models/ArrayCrud';

export const useTransactionStore = defineStore('transactions-store', {
	state: () => ({
		transactions: [],
		loading: false,
		loadingTh: false,
		optionsThAjaran: [],
		thAjaranH: '',
		filter: '',
		startDate: '',
		endDate: '',
	}),

	actions: {
		async listTahun() {
			try {
				this.loadingTh = true;
				const data = await ApbTransaction.listTahunAjaran();
				this.optionsThAjaran = data.th_ajaran_h;
			} catch (error) {
				console.error(error);
			} finally {
				this.loadingTh = false;
			}
		},

		async loadByTahun(th_ajaran_h) {
			try {
				this.transactions = [];
				this.loading = true;
				const data = await ApbTransaction.getAll({ params: { th_ajaran_h } });
				this.transactions = data.transactions;
			} catch (_err) {
				console.error('🚀 ~ loadData ~ _err:', _err);
			} finally {
				this.loading = false;
			}
		},

		add(transaction) {
			this.transactions = ArrayCrud.updateOrCreate(this.transactions, transaction, 'id', 'first');
		},

		remove(id) {
			this.transactions = ArrayCrud.remove(this.transactions, id);
		},

		async loadById(id) {
			try {
				this.loading = true;
				const data = await ApbTransaction.getById({ id });
				this.add(data.transaction);
				return data.transaction;
			} catch (_err) {
				console.error('🚀 ~ loadData ~ _err:', _err);
			} finally {
				this.loading = false;
			}
		},

		async loadByDate(start_date, end_date) {
			try {
				this.transactions = [];
				this.loading = true;
				const data = await ApbTransaction.getAll({
					params: { start_date, end_date },
				});
				this.transactions = data.transactions;
			} catch (_err) {
				console.error('🚀 ~ loadData ~ _err:', _err);
			} finally {
				this.loading = false;
			}
		},
	},

	persist: {
		storage: sessionStorage,
	},
});
