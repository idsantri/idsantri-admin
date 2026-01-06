import { defineStore } from 'pinia';
import ApbBudget from 'src/models/ApbBudget';
import ArrayCrud from 'src/models/ArrayCrud';
import { notifyConfirm } from 'src/utils/notify';
import { computed, ref } from 'vue';

export const useBudgetStore = defineStore(
	'budgets-store',
	() => {
		const loading = ref(false);
		const loadingTh = ref(false);
		const budgets = ref([]);
		const filterText = ref('');
		const filterThAjaranH = ref('');
		const thAjaranH = ref('');
		const filterCategory = ref('');
		const filterGroup = ref('');
		const optionsThAjaran = ref([]);

		const budgetsCalculate = computed(() => {
			return budgets.value.map((budget) => {
				const total = Number(budget.total_budget);
				const absorbed = Number(budget.total_absorbed);

				let percentage = 0;
				let status = 'normal';

				if (total > 0) {
					percentage = ((absorbed / total) * 100).toFixed(2);
				} else if (total === 0 && absorbed > 0) {
					// Kasus khusus: Tidak ada budget tapi ada serapan
					percentage = 100;
					status = 'unbudgeted'; // Beri flag untuk styling
				}
				return {
					...budget,
					sisa: budget.category.toUpperCase() === 'PENDAPATAN' ? absorbed - total : total - absorbed,
					percentage: percentage,
					status: status,
				};
			});
		});

		// const totalBudgetPendapatan = computed(() => {
		// 	return budgets.value
		// 		.filter((budget) => budget.kategori === 'PENDAPATAN')
		// 		.reduce((total, budget) => {
		// 			return total + Number(budget.total_budget);
		// 		}, 0);
		// });

		// const totalBudgetBiaya = computed(() => {
		// 	return budgets.value
		// 		.filter((budget) => budget.kategori === 'BIAYA')
		// 		.reduce((total, budget) => {
		// 			return total + Number(budget.total_budget);
		// 		}, 0);
		// });

		// const totalAbsorbedPendapatan = computed(() => {
		// 	return budgets.value
		// 		.filter((budget) => budget.kategori === 'PENDAPATAN')
		// 		.reduce((total, budget) => {
		// 			return total + Number(budget.total_absorbed);
		// 		}, 0);
		// });

		// const totalAbsorbedBiaya = computed(() => {
		// 	return budgets.value
		// 		.filter((budget) => budget.kategori === 'BIAYA')
		// 		.reduce((total, budget) => {
		// 			return total + Number(budget.total_absorbed);
		// 		}, 0);
		// });

		const optionsGroup = computed(() => {
			if (!filterCategory.value) {
				const group = budgets.value.map((account) => account.group);
				return [...new Set(group)].sort();
			} else {
				const group = budgets.value
					.filter((account) => account.category === filterCategory.value)
					.map((account) => account.group);
				return [...new Set(group)].sort();
			}
		});

		const optionsCategory = computed(() => {
			const category = budgets.value.map((account) => account.category).filter((group) => group !== null);
			return [...new Set(category)];
		});

		const filteredData = computed(() => {
			const f1 = budgetsCalculate.value.filter((account) => {
				return filterCategory.value ? account.category === filterCategory.value : true;
			});
			const f2 = f1.filter((account) => {
				return filterGroup.value ? account.group === filterGroup.value : true;
			});
			return f2;
		});

		async function listTahun() {
			try {
				loadingTh.value = true;
				const data = await ApbBudget.listTahunAjaran();
				optionsThAjaran.value = data.th_ajaran_h;
			} catch (error) {
				console.error(error);
			} finally {
				loadingTh.value = false;
			}
		}

		async function loadByTahun(th_ajaran_h, notify = true) {
			try {
				loading.value = true;
				const data = await ApbBudget.getAll({ params: { th_ajaran_h }, notifySuccess: notify });
				budgets.value = data.budgets;
			} catch (_err) {
				console.error('🚀 ~ loadData ~ _err:', _err);
			} finally {
				loading.value = false;
			}
		}

		async function loadById(id) {
			try {
				loading.value = true;
				const data = await ApbBudget.getById({ id });
				budgets.value = ArrayCrud.update(budgets.value, id, data.budget);
				return data.budget;
			} catch (_err) {
				console.error('🚀 ~ loadData ~ _err:', _err);
			} finally {
				loading.value = false;
			}
		}

		async function removeData(id) {
			const isConfirmed = await notifyConfirm('<span style="color: red">Hapus anggaran ini?</span>');
			if (!isConfirmed) {
				return false;
			}

			try {
				loading.value = true;
				await ApbBudget.remove({ id, confirm: false });
				budgets.value = ArrayCrud.remove(budgets.value, id);
				return true;
			} catch (error) {
				console.error('🚀 ~ remove ~ error:', error);
			} finally {
				loading.value = false;
			}
		}

		return {
			loading,
			loadingTh,
			budgets,
			filterText,
			filterThAjaranH,
			thAjaranH,
			loadByTahun,
			loadById,
			listTahun,
			removeData,
			optionsThAjaran,
			filterCategory,
			filterGroup,
			optionsGroup,
			optionsCategory,
			filteredData,
			// totalBudgetBiaya,
			// totalBudgetPendapatan,
			// totalAbsorbedBiaya,
			// totalAbsorbedPendapatan,
		};
	},
	{
		persist: {
			storage: sessionStorage,
		},
	},
);
