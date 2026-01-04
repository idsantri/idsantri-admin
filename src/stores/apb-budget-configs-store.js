import { defineStore } from 'pinia';
import ApbBudgetConfig from 'src/models/ApbBudgetConfig';
import ArrayCrud from 'src/models/ArrayCrud';

export const useBudgetConfigStore = defineStore('budget-configs-store', {
	state: () => ({
		loading: false,
		loadingTh: false,
		configs: [],
		total_budget: {},
		thAjaranH: [],
		filterText: '',
		filterTahun: '',
	}),

	getters: {
		getConfigs: ({ configs, total_budget }) =>
			configs.map((config) => {
				const limit_rp = (total_budget?.budget_4 * Number(config.limit || 0)) / 100;
				return { ...config, limit_rp };
			}),
		totalLimit: (state) => state.configs.reduce((total, config) => total + Number(config.limit), 0).toFixed(2),
	},

	actions: {
		async loadListTahun() {
			try {
				this.loadingTh = true;
				const data = await ApbBudgetConfig.listTahunAjaran();
				this.thAjaranH = data.th_ajaran_h;
			} catch (error) {
				console.error(error);
			} finally {
				this.loadingTh = false;
			}
		},

		async loadByTahun(th_ajaran_h) {
			try {
				this.loading = true;
				const data = await ApbBudgetConfig.getAll({ params: { th_ajaran_h } });
				this.configs = data.configs;
				this.total_budget = data.total_budget;
			} catch (_err) {
				console.error('🚀 ~ loadData ~ _err:', _err);
			} finally {
				this.loading = false;
			}
		},

		async toggleLock(id, value) {
			try {
				this.loading = true;
				this.configs = ArrayCrud.update(this.configs, id, { locked: value ? true : false });
				await ApbBudgetConfig.update({ id, data: { locked: value } });
			} catch (err) {
				this.configs = ArrayCrud.update(this.configs, id, { locked: value ? false : true });
				console.error('🚀 ~ toggleHidden ~ err:', err);
			} finally {
				this.loading = false;
			}
		},

		async updateLimit(id, { oldValue, newValue }) {
			try {
				this.loading = true;
				const data = await ApbBudgetConfig.update({ id, data: { limit: newValue } });
				this.configs = ArrayCrud.update(this.configs, id, data.config);
			} catch (err) {
				this.configs = ArrayCrud.update(this.configs, id, { limit: oldValue });
				console.error('🚀 ~ toggleHidden ~ err:', err);
			} finally {
				this.loading = false;
			}
		},
	},

	persist: {
		storage: sessionStorage,
	},
});
