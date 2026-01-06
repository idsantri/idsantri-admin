<template lang="">
	<CardLoading :showing="loading" />
	<q-list class="" bordered separator>
		<q-item class="bg-green-1">
			<q-item-section class="">
				<q-item-label>{{ th_ajaran_h }} / {{ group }}</q-item-label>
			</q-item-section>
		</q-item>
		<q-item v-for="budget in filtered" :key="budget.id">
			<q-item-section>
				<q-item-label caption :class="budget.account_id == account_id ? 'text-black' : ''">
					{{ budget.account_id }}: {{ budget.name }}
				</q-item-label>
			</q-item-section>
			<q-item-section class="text-right">
				<q-item-label overline :class="budget.account_id == account_id ? 'text-black text-weight-bold' : ''">
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
					:to="`/apb/budgets/${budget.id}`"
					replace
				/>
			</q-item-section>
		</q-item>
		<q-item class="bg-green-1">
			<q-item-section class="">
				<q-item-label caption class="text-italic">Total</q-item-label>
			</q-item-section>
			<q-item-section class="text-right">
				<q-item-label overline class="text-bold"> {{ total.toRupiah() }}</q-item-label>
			</q-item-section>
			<q-item-section class="" avatar> </q-item-section>
		</q-item>
	</q-list>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useBudgetStore } from 'src/stores/apb-budgets-store';
import { computed, watch } from 'vue';

const props = defineProps({
	th_ajaran_h: {
		type: String,
		required: true,
	},
	group: {
		type: String,
		required: true,
	},
	account_id: {
		type: String,
		required: true,
	},
});
const budgetState = useBudgetStore();
const { budgets, loading } = storeToRefs(budgetState);

const filtered = computed(() => {
	return budgets.value.filter((budget) => budget.th_ajaran_h === props.th_ajaran_h && budget.group === props.group);
});

const total = computed(() => {
	return filtered.value.reduce((acc, cur) => acc + Number(cur.total_budget), 0);
});

watch(
	() => [props.th_ajaran_h, props.group],
	async (newVal) => {
		const newTahun = newVal[0];
		const newGroup = newVal[1];
		if (newTahun && newGroup && !filtered.value?.length) {
			await budgetState.loadByTahun(newTahun);
		}
	},
	{ immediate: true, deep: true },
);
</script>
<style lang=""></style>
