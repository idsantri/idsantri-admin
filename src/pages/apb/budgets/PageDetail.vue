<template lang="">
	<CardPage>
		<CardHeader title="Anggaran" :show-reload="false" @on-reload="null" :show-edit="false" />
		<q-card-section class="q-pa-sm">
			<q-card bordered flat class="">
				<q-markup-table class="">
					<tbody>
						<tr>
							<td class="label">Tahun Ajaran</td>
							<td>{{ budget?.th_ajaran_h }}</td>
						</tr>
						<tr>
							<td class="label">Akun</td>
							<td>
								[{{ budget?.account_id }}] {{ budget?.category }} {{ budget?.group }}:
								<strong>{{ budget?.name }}</strong>
							</td>
						</tr>
						<tr>
							<td class="label">Total Anggaran</td>
							<td>
								{{ budget?.total_budget.toRupiah() }}
							</td>
						</tr>
						<tr>
							<td class="label">Total Serapan/Alokasi</td>
							<td>
								{{ budget?.total_absorbed ? budget?.total_absorbed.toRupiah() : 0 }}
							</td>
						</tr>
						<tr>
							<td class="label">Sisa</td>
							<td>
								{{ (Number(budget?.total_budget) - Number(budget?.total_absorbed)).toRupiah() }}
							</td>
						</tr>
					</tbody>
				</q-markup-table>
				<q-card-section class="q-pa-sm">
					<CardDetail
						:budget_id="params.id"
						:th_ajaran_h="budget?.th_ajaran_h"
						:account_id="budget?.account_id"
						@updateTotalBudget="updateTotal"
					/>
				</q-card-section>
			</q-card>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import apbBudgetsStore from 'src/stores/apb-budgets-store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import CardDetail from './CardDetail.vue';
import ArrayCrud from 'src/models/ArrayCrud';

/**
 * TODO:
 * - Get by Id
 * - Get by Tahun Ajaran & Account Id
 */

const state = apbBudgetsStore();
const { params } = useRoute();
const { budgets } = storeToRefs(state);
const budget = computed(() => budgets.value.find((item) => item.id == params.id));

const updateTotal = (total_budget) => {
	budgets.value = ArrayCrud.update(budgets.value, budget.value.id, { ...budget.value, total_budget });
};
</script>
<style lang="scss" scoped>
.label {
	font-style: italic;
	width: 200px;
}
td {
	white-space: normal;
	word-wrap: break-word;
}
</style>
