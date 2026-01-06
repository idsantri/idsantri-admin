<template lang="">
	<q-list class="tw:bg-green-100/25" style="min-width: 200px">
		<CardLoading :showing="loading" message="" />
		<q-item
			clickable
			v-close-popup
			@click="null"
			v-for="config in filtered"
			:key="config.id"
			:to="`/apb/budgets/${config.id}`"
		>
			<q-item-section>
				<q-item-label caption>[{{ config.account_id }}] {{ config.group }}: {{ config.name }}</q-item-label>
				<q-item-label overline class="text-right">{{ config?.total_budget?.toRupiah() }}</q-item-label>
			</q-item-section>
		</q-item>
		<q-item class="tw:bg-green-200" v-close-popup>
			<q-item-section>
				<q-item-label caption>Total Anggaran:</q-item-label>
				<q-item-label overline class="text-right">{{ total.toRupiah() }}:</q-item-label>
			</q-item-section>
		</q-item>
		<!-- <pre>
			{{ filtered }}
		</pre
		> -->
	</q-list>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useBudgetStore } from 'src/stores/apb-budgets-store';
import { computed, onMounted } from 'vue';

const props = defineProps({
	config: {
		type: Object,
		required: true,
	},
});
const state = useBudgetStore();
const { budgets, loading } = storeToRefs(state);
const filtered = computed(() => {
	return budgets.value.filter(
		(budget) => budget.th_ajaran_h === props.config.th_ajaran_h && budget.group === props.config.group,
	);
});

const total = computed(() => {
	return filtered.value.reduce((acc, cur) => acc + Number(cur.total_budget), 0);
});

onMounted(async () => {
	if (!filtered.value?.length) {
		await state.loadByTahun(props.config.th_ajaran_h);
	}
});
</script>
<style lang=""></style>
