import { defineStore } from 'pinia';
import ApbBudget from 'src/models/ApbBudget';
import ArrayCrud from 'src/models/ArrayCrud';
import { notifyConfirm } from 'src/utils/notify';
import { computed, ref, shallowRef } from 'vue';

export default defineStore(
	'budgets-store',
	() => {
		const loading = ref(false);
		const loadingTh = ref(false);
		const budgets = shallowRef([]);
		const filterText = ref('');
		const filterThAjaranH = ref('');
		const thAjaranH = ref('');
		const filterKategori = ref('');
		const filterGroup = ref('');
		const optionsThAjaran = ref([]);

		const totalBudgetPendapatan = computed(() => {
			return budgets.value
				.filter((budget) => budget.kategori === 'PENDAPATAN')
				.reduce((total, budget) => {
					return total + Number(budget.total);
				}, 0);
		});

		const totalBudgetBiaya = computed(() => {
			return budgets.value
				.filter((budget) => budget.kategori === 'BIAYA')
				.reduce((total, budget) => {
					return total + Number(budget.total);
				}, 0);
		});

		const totalAllocatedPendapatan = computed(() => {
			return budgets.value
				.filter((budget) => budget.kategori === 'PENDAPATAN')
				.reduce((total, budget) => {
					return total + Number(budget.total_allocated);
				}, 0);
		});

		const totalAllocatedBiaya = computed(() => {
			return budgets.value
				.filter((budget) => budget.kategori === 'BIAYA')
				.reduce((total, budget) => {
					return total + Number(budget.total_allocated);
				}, 0);
		});

		const optionsGroup = computed(() => {
			if (!filterKategori.value) {
				const group = budgets.value.map((account) => account.group);
				return [...new Set(group)].sort();
			} else {
				const group = budgets.value
					.filter((account) => account.kategori === filterKategori.value)
					.map((account) => account.group);
				return [...new Set(group)].sort();
			}
		});

		const optionsKategori = computed(() => {
			const kategori = budgets.value.map((account) => account.kategori).filter((group) => group !== null);
			return [...new Set(kategori)];
		});

		const filteredData = computed(() => {
			const f1 = budgets.value.filter((account) => {
				return filterKategori.value ? account.kategori === filterKategori.value : true;
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

		async function removeData(id) {
			const isConfirmed = await notifyConfirm('<span style="color: red">Hapus anggaran ini?</span>');
			if (!isConfirmed) {
				return false;
			}

			try {
				loading.value = true;
				await ApbBudget.remove({ id, confirm: false });
				budgets.value = ArrayCrud.remove(budgets.value, id);
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
			listTahun,
			removeData,
			optionsThAjaran,
			filterKategori,
			filterGroup,
			optionsGroup,
			optionsKategori,
			filteredData,
			totalBudgetBiaya,
			totalBudgetPendapatan,
			totalAllocatedBiaya,
			totalAllocatedPendapatan,
		};
	},
	{
		persist: {
			storage: sessionStorage,
		},
	},
);
