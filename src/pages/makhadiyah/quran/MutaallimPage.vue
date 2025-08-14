<template lang="">
	<div class="flex items-start q-gutter-sm">
		<div class="col-grow">
			<q-card flat bordered>
				<TableHeader
					title="Data Mutaallim AKTIF"
					v-model="filter"
					@on-reload="loadData"
					@on-filter="showFilter = !showFilter"
					:show-filter="showFilter"
				/>
				<transition name="fade">
					<q-card-section class="q-pa-sm" v-if="showFilter">
						<FilterMarhalah
							v-model:modelMarhalah="modelMarhalah"
							v-model:modelFaslah="modelFaslah"
							:optionsMarhalah="optionsMarhalah"
							:optionsFaslah="optionsFaslah"
						/>
					</q-card-section>
				</transition>

				<q-table
					:rows="filteredMutaallim"
					:filter="filter"
					:loading="loading"
					:rows-per-page-options="[10, 25, 50, 100, 0]"
					flat
					@row-click="(evt, row, index) => (selected = row)"
					:columns="columnMutaallim"
					table-header-class="bg-green-1 text-green-10 text-subtitle1"
				/>
			</q-card>
		</div>
		<div class="">
			<MutaallimCard
				:santri="{ id: selected.santri_id, nama: selected.nama }"
			/>
		</div>
	</div>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import MutaallimCard from './MutaallimCard.vue';
import TableHeader from './TableHeader.vue';
import FilterMarhalah from './FilterMarhalah.vue';
import { columnMutaallim } from './column-header';

const selected = ref({});
const mutaallim = ref([]);
const loading = ref(false);
const filter = ref('');
const showFilter = ref(false);
const modelMarhalah = ref('');
const modelFaslah = ref([]);

async function loadData() {
	const data = await apiGet({ endPoint: 'quran/mutaallim/aktif', loading });
	if (data) {
		mutaallim.value = data.mutaallim;
		// console.log(data.mutaallim);
	}
}

const filteredMutaallim = computed(() => {
	if (!modelMarhalah.value) return mutaallim.value;
	if (!modelFaslah.value?.length) {
		return mutaallim.value.filter(
			(item) => item.marhalah === modelMarhalah.value,
		);
	}
	return mutaallim.value.filter(
		(item) =>
			item.marhalah === modelMarhalah.value &&
			modelFaslah.value.includes(item.faslah),
	);
});

onMounted(async () => {
	await loadData();
});

watch(modelMarhalah, () => {
	modelFaslah.value = [];
});

watchEffect(() => {
	if (!showFilter.value) {
		modelMarhalah.value = '';
		modelFaslah.value = [];
	}
});

const optionsMarhalah = computed(() => {
	const set = new Set();
	mutaallim.value.forEach((item) => {
		if (item.marhalah) {
			set.add(item.marhalah);
		}
	});
	return Array.from(set).sort((a, b) => a.localeCompare(b));
});

const optionsFaslah = computed(() => {
	if (!modelMarhalah.value) return [];
	const set = new Set();
	mutaallim.value.forEach((item) => {
		if (item.marhalah === modelMarhalah.value && item.faslah) {
			set.add(item.faslah);
		}
	});
	return Array.from(set).sort((a, b) => a.localeCompare(b));
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
