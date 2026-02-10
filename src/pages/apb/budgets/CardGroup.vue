<template lang="">
	<q-list>
		<q-item class="bg-green-1 q-py-none">
			<q-item-section class="">
				<q-item-label>{{ th_ajaran_h }} / {{ group }}</q-item-label>
			</q-item-section>
			<q-item-section>
				<q-tabs v-model="tab" dense align="right" class="" active-bg-color="green-11">
					<q-tab name="accounts" dense no-caps class="" label="Akun" />
					<q-tab name="group" dense no-caps class="" label="Grup" />
				</q-tabs>
			</q-item-section>
		</q-item>
	</q-list>
	<q-tab-panels v-model="tab" animated class="">
		<q-tab-panel name="accounts" class="no-padding">
			<CardLoading :showing="loadingBudget" />
			<q-list class="" separator>
				<q-item v-for="budget in filterBudgets" :key="budget.id">
					<q-item-section>
						<q-item-label caption :class="budget.account_id == account_id ? 'text-black' : ''">
							{{ budget.account_id }}: {{ budget.name }}
						</q-item-label>
					</q-item-section>
					<q-item-section class="text-right">
						<q-item-label
							overline
							:class="budget.account_id == account_id ? 'text-black text-weight-bold' : ''"
						>
							{{ budget?.total_budget?.toRupiah() }}
						</q-item-label>
					</q-item-section>
					<q-item-section class="" avatar>
						<q-btn
							:disable="budget.account_id == account_id"
							:icon="budget.account_id != account_id ? 'info' : 'sym_o_info'"
							dense
							flat
							no-caps
							color="info"
							:to="`/apb/budgets/${budget.id}?tab=accounts`"
							replace
						/>
					</q-item-section>
				</q-item>
				<q-item class="bg-green-1">
					<q-item-section class="">
						<q-item-label caption class="text-italic">Total Grup</q-item-label>
					</q-item-section>
					<q-item-section class="text-right">
						<q-item-label overline class="text-bold"> {{ totalGroup.toRupiah() }}</q-item-label>
					</q-item-section>
					<q-item-section class="" avatar> </q-item-section>
				</q-item>
			</q-list>
		</q-tab-panel>

		<q-tab-panel name="group">
			<q-list class="" separator>
				<CardLoading :showing="loadingConfig" />

				<q-item>
					<q-item-section>
						<q-item-label caption> Target/Limit Grup (%)</q-item-label>
						<q-item-label overline> {{ config ? config?.limit + '%' : 'Tidak diatur' }} </q-item-label>
					</q-item-section>

					<q-item-section class="" avatar>
						<q-btn icon="sync" dense flat no-caps color="info" @click="reloadConfig" />
					</q-item-section>
				</q-item>
				<q-separator inset />
				<q-item>
					<q-item-section>
						<q-item-label caption> Target/Limit Grup (Rp)</q-item-label>
						<q-item-label overline>
							{{ config ? config?.limit_rp?.toRupiah() : 'Tidak diatur' }}
						</q-item-label>
					</q-item-section>
					<q-item-section class="" avatar>
						<q-btn
							icon="sym_o_info"
							dense
							flat
							no-caps
							color="info"
							:to="`/apb/budgets/configs?th=${th_ajaran_h}&category=${category}&text=${group}`"
						/>
					</q-item-section>
				</q-item>
				<q-separator inset />
				<q-item>
					<q-item-section class="">
						<q-item-label caption class=""> Total Grup </q-item-label>
						<q-item-label overline :class="warned ? 'text-negative text-bold' : ''">
							{{ totalGroup.toRupiah() }}
						</q-item-label>
					</q-item-section>
					<q-item-section class="" avatar>
						<q-icon
							v-if="warned"
							class="q-mx-xs"
							name="sym_o_warning"
							dense
							flat
							no-caps
							color="negative"
						/>
					</q-item-section>
				</q-item>
			</q-list>
		</q-tab-panel>
	</q-tab-panels>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useBudgetConfigStore } from 'src/stores/apb-budget-configs-store';
import { useBudgetStore } from 'src/stores/apb-budgets-store';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
	th_ajaran_h: {
		type: String,
		required: true,
	},
	group: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	account_id: {
		type: String,
		required: true,
	},
});
const tab = ref('group');
const { query } = useRoute();
const budgetState = useBudgetStore();
const configState = useBudgetConfigStore();
const { budgets, loading: loadingBudget } = storeToRefs(budgetState);
const { getConfigs, loading: loadingConfig } = storeToRefs(configState);

onMounted(() => {
	if (query.tab) {
		tab.value = query.tab;
	}
});

const config = computed(() => {
	return getConfigs.value.find((c) => c.th_ajaran_h === props.th_ajaran_h && c.group === props.group);
});

const filterBudgets = computed(() => {
	return budgets.value.filter((budget) => budget.th_ajaran_h === props.th_ajaran_h && budget.group === props.group);
});

const totalGroup = computed(() => {
	return filterBudgets.value.reduce((acc, cur) => acc + Number(cur.total_budget), 0);
});

const warned = computed(() => {
	if (config.value) {
		if (config.value.category == 'BIAYA') {
			if (Number(config.value.limit_rp) < totalGroup.value) {
				return true;
			}
		}
		if (config.value.category == 'PENDAPATAN') {
			if (Number(config.value.limit_rp) > totalGroup.value) {
				return true;
			}
		}
	}

	return false;
});

const reloadConfig = () => {
	configState.loadByTahun(props.th_ajaran_h);
};
watch(
	() => [props.th_ajaran_h, props.group],
	async (newVal) => {
		const newTahun = newVal[0];
		const newGroup = newVal[1];
		if (newTahun && newGroup && !filterBudgets.value?.length) {
			await budgetState.loadByTahun(newTahun);
		}
		if (newTahun && newGroup && !config.value) {
			await configState.loadByTahun(newTahun);
		}
	},
	{ immediate: true, deep: true },
);
</script>
<style lang=""></style>
