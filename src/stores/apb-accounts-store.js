import { defineStore } from 'pinia';
import ApbAccount from 'src/models/ApbAccount';
import ArrayCrud from 'src/models/ArrayCrud';
import { computed, ref, shallowRef } from 'vue';

export default defineStore(
	'accounts-store',
	() => {
		const loading = ref(false);
		const accounts = shallowRef([]);
		const filterText = ref('');
		const filterKategori = ref('');
		const filterGroup = ref('');

		const optionsSelect = computed(() => {
			return accounts.value
				.filter((account) => account.hidden == 0)
				.map((account) => {
					return { group_nama: account.group + ': ' + account.nama, ...account };
				})
				.sort((a, b) => a.group.localeCompare(b.group));
		});

		const optionsKategori = computed(() => {
			const kategori = accounts.value.map((account) => account.kategori).filter((group) => group !== null);
			return [...new Set(kategori)];
		});

		const optionsGroup = computed(() => {
			if (!filterKategori.value) {
				const group = accounts.value.map((account) => account.group);
				return [...new Set(group)].sort();
			} else {
				const group = accounts.value
					.filter((account) => account.kategori === filterKategori.value)
					.map((account) => account.group);
				return [...new Set(group)].sort();
			}
		});

		const filteredAccounts = computed(() => {
			const f1 = accounts.value.filter((account) => {
				return filterGroup.value ? account.group === filterGroup.value : true;
			});
			const f2 = f1.filter((account) => {
				return filterKategori.value ? account.kategori === filterKategori.value : true;
			});
			return f2;
		});

		async function toggleHidden(value, id) {
			try {
				loading.value = true;
				accounts.value = ArrayCrud.update(accounts.value, id, { hidden: value });
				await ApbAccount.toggleHidden(id);
			} catch (err) {
				accounts.value = ArrayCrud.update(accounts.value, id, { hidden: value ? 0 : 1 });
				console.error('🚀 ~ toggleHidden ~ err:', err);
			} finally {
				loading.value = false;
			}
		}

		async function loadAll(notify = true) {
			try {
				loading.value = true;
				const data = await ApbAccount.getAll({ notifySuccess: notify });
				accounts.value = data.accounts;
			} catch (_err) {
				console.error('🚀 ~ loadData ~ _err:', _err);
			} finally {
				loading.value = false;
			}
		}

		const add = (account) => {
			accounts.value = ArrayCrud.updateOrCreate(accounts.value, account, 'id', 'first');
		};

		const remove = (id) => {
			accounts.value = ArrayCrud.remove(accounts.value, id);
		};

		async function loadById(id, notify = true) {
			try {
				loading.value = true;
				const data = await ApbAccount.getById({ id, notifySuccess: notify });
				add(data.account);
			} catch (_err) {
				console.error('🚀 ~ loadData ~ _err:', _err);
			} finally {
				loading.value = false;
			}
		}

		return {
			loading,
			accounts,
			filteredAccounts,
			filterText,
			filterKategori,
			filterGroup,
			optionsKategori,
			optionsGroup,
			optionsSelect,
			toggleHidden,
			loadAll,
			loadById,
			add,
			remove,
		};
	},
	{
		persist: {
			storage: sessionStorage,
		},
	},
);
