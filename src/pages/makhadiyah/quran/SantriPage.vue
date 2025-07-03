<template lang="">
	<q-card flat class="flex items-start">
		<q-card-section class="q-pa-sm col-grow">
			<q-card flat bordered>
				<TableHeader
					title="Data Santri AKTIF"
					v-model="filter"
					@on-reload="loadData"
					@on-filter="showFilter = !showFilter"
					:show-filter="showFilter"
				/>
				<transition name="fade">
					<q-card-section class="q-pa-sm" v-if="showFilter">
						<FilterDomisili
							v-if="showDomisili"
							v-model="modelDomisili"
							:options="optionsDomisili"
							@on-toggle="showDomisili = !showDomisili"
						/>
						<FilterKelas
							v-else
							v-model:modelTingkat="modelTingkat"
							v-model:modelKelas="modelKelas"
							:optionsTingkat="optionsTingkat"
							:optionsKelas="optionsKelas"
							@on-toggle="showDomisili = !showDomisili"
						/>
					</q-card-section>
				</transition>
				<q-table
					:rows="filteredSantri"
					:filter="filter"
					:loading="loading"
					:rows-per-page-options="[10, 25, 50, 100, 0]"
					flat
					@row-click="(evt, row, index) => (selected = row)"
					:columns="columnSantri"
					table-header-class="bg-green-11 text-green-10 text-subtitle1"
				/>
			</q-card>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<MutaallimCard :santri="selected" />
		</q-card-section>
	</q-card>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { onMounted, ref, computed, watchEffect, watch } from 'vue';
import MutaallimCard from './MutaallimCard.vue';
import TableHeader from './TableHeader.vue';
import FilterDomisili from './FilterDomisili.vue';
import FilterKelas from './FilterKelas.vue';
import { columnSantri } from './column-header';

const filter = ref('');
const loading = ref(false);
const selected = ref({});
const santri = ref([]);
const showFilter = ref(false);
const modelDomisili = ref([]);
const showDomisili = ref(true);
const modelTingkat = ref('');
const modelKelas = ref([]);

const filteredSantri = computed(() => {
	return santri.value.filter((item) => {
		const matchesDomisili =
			!modelDomisili.value?.length ||
			modelDomisili.value.includes(item.domisili);
		const matchesTingkat =
			!modelTingkat.value || item.tingkat === modelTingkat.value;
		const matchesKelas =
			!modelKelas.value?.length || modelKelas.value.includes(item.kelas);
		return matchesDomisili && matchesTingkat && matchesKelas;
	});
});

async function loadData() {
	const data = await apiGet({ endPoint: 'quran/mutaallim/santri', loading });
	if (data) {
		santri.value = data.santri;
	}
}

onMounted(async () => {
	await loadData();
});

const optionsDomisili = computed(() => {
	const domisiliSet = new Set();
	santri.value.forEach((item) => {
		if (item.domisili) {
			domisiliSet.add(item.domisili);
		}
	});
	return Array.from(domisiliSet).sort((a, b) => a.localeCompare(b));
});

const optionsTingkat = computed(() => {
	const set = new Set();
	santri.value.forEach((item) => {
		if (item.tingkat) {
			set.add(item.tingkat);
		}
	});
	return Array.from(set).sort((a, b) => a.localeCompare(b));
});

const optionsKelas = computed(() => {
	if (!modelTingkat.value) return [];
	const set = new Set();
	santri.value.forEach((item) => {
		if (item.tingkat === modelTingkat.value && item.kelas) {
			set.add(item.kelas);
		}
	});
	return Array.from(set).sort((a, b) => a.localeCompare(b));
});

watchEffect(() => {
	if (!showFilter.value) {
		modelDomisili.value = [];
		modelTingkat.value = '';
		modelKelas.value = [];
	}
});

watch(showDomisili, () => {
	modelDomisili.value = [];
	modelTingkat.value = '';
	modelKelas.value = [];
});

watch(modelTingkat, () => {
	modelKelas.value = [];
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
