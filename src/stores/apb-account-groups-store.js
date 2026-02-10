import { defineStore } from 'pinia';
import ApbGroup from 'src/models/ApbGroup';
import ArrayCrud from 'src/models/ArrayCrud';

export const useAccountGroupStore = defineStore('account-group-store', {
	state: () => ({
		loading: false,
		groups: [],
		filterText: '',
		filterCategory: '',
	}),

	getters: {
		optionsCategory: (state) => {
			const category = state.groups.map((group) => group.category).filter((group) => group !== null);
			return [...new Set(category)];
		},

		filteredGroups: (state) => {
			if (state.filterCategory) {
				return state.groups.filter((group) => group.category === state.filterCategory);
			} else {
				return state.groups;
			}
		},
	},

	actions: {
		async loadAll() {
			try {
				this.loading = true;
				const data = await ApbGroup.getAll();
				this.groups = data.groups;
			} catch (_err) {
				console.error('🚀 ~ loadData ~ _err:', _err);
			} finally {
				this.loading = false;
			}
		},

		async updateActive(newValue, group) {
			try {
				this.loading = true;
				this.groups = ArrayCrud.update(this.groups, group.id, { active: newValue });
				await ApbGroup.update({
					id: group.id,
					data: {
						name: group.name,
						category: group.category,
						active: newValue,
					},
				});
			} catch (err) {
				this.groups = ArrayCrud.update(this.groups, group.id, { active: newValue ? false : true });
				console.error('🚀 ~ toggleHidden ~ err:', err);
			} finally {
				this.loading = false;
			}
		},

		update(id, data) {
			this.groups = ArrayCrud.update(this.groups, id, data);
		},
		remove(id) {
			this.groups = ArrayCrud.remove(this.groups, id);
		},

		create(data) {
			this.groups = ArrayCrud.create(this.groups, data);
		},
	},

	persist: {
		storage: sessionStorage,
	},
});
