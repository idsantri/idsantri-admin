<template lang="">
	<CardPage>
		<CardHeader title="Detail Anggaran" :show-reload="true" @on-reload="null" :show-edit="false" />
		<q-card-section class="tw:grid tw:sm:flex tw:sm:justify-between tw:gap-2 q-pa-sm">
			<q-card class="tw:w-full" bordered flat>
				<CardBudget :budget="budget" @onDelete="handleDelete" />
			</q-card>
			<q-card class="tw:w-full" bordered flat>
				<CardConfig
					:th_ajaran_h="budget?.th_ajaran_h"
					:group="budget?.group"
					:account_id="budget?.account_id"
				/>
			</q-card>
		</q-card-section>
		<q-card-section class="q-px-sm q-pb-sm q-pt-none">
			<CardDetail
				:budget_id="params.id"
				:th_ajaran_h="budget?.th_ajaran_h"
				:account_id="budget?.account_id"
				@updateTotalBudget="updateTotal"
			/>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useBudgetStore } from 'src/stores/apb-budgets-store';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CardDetail from './CardDetail.vue';
import ArrayCrud from 'src/models/ArrayCrud';
import CardBudget from './CardBudget.vue';
import CardConfig from './CardConfig.vue';

/**
 * TODO:
 * - Get by Id
 * - Get by Tahun Ajaran & Account Id
 */

const state = useBudgetStore();
const router = useRouter();
const { params } = useRoute();
const { budgets } = storeToRefs(state);
const budget = ref({});

onBeforeMount(async () => {
	let found = budgets.value.find((item) => item.id == params.id);
	if (!found) {
		found = await state.loadById(params.id);
	}
	budget.value = found;
});

const updateTotal = (total_budget) => {
	budgets.value = ArrayCrud.update(budgets.value, budget.value.id, { ...budget.value, total_budget });
};
const handleDelete = async () => {
	const del = await state.removeData(budget.value.id);
	if (del) {
		router.go(-1);
	}
};
</script>
<style lang="scss" scoped></style>
