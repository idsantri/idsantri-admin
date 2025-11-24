<template lang="">
	<CardPage>
		<CardHeader title="Statistik Santri Indisipliner" :show-reload="false"> </CardHeader>

		<q-card-section class="q-pa-sm">
			<q-card bordered flat>
				<q-card-section class="q-pa-sm">
					<q-select
						dense
						v-model="thAjaranH"
						label="Pilih Tahun Ajaran"
						class="text-green-10"
						outlined
						style="max-width: 300px"
						behavior="menu"
						:options="optionsSelect"
						:loading="loadingSelect"
						clearable
					/>
				</q-card-section>
				<q-separator />
				<q-card-section class="q-pa-sm relative-position">
					<CardLoading :showing="loadingData" />
					<div class="tw:flex tw:flex-col tw:gap-2 tw:w-full">
						<ChartAsrama
							:asrama="asrama"
							@slice-click="(data) => (filterAsrama = data?.asrama ? data.asrama : '')"
						/>
						<div class="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:gap-2">
							<TabelAsrama
								class="tw:col-span-1"
								:asrama="asrama"
								@rowClick="(data) => (filterAsrama = data.asrama)"
							/>
							<TabelKamar class="tw:col-span-1" :kamar="filteredKamar" />
						</div>
					</div>
				</q-card-section>
			</q-card>
		</q-card-section>
		<!-- <pre>{{ asrama }}</pre> -->
	</CardPage>
</template>
<script setup>
import Statistik from 'src/models/Statistik';
import { computed, onMounted, ref, watch } from 'vue';
import ArrayCrud from 'src/models/ArrayCrud';
import ChartAsrama from './part/StatistikChartAsrama.vue';
import TabelAsrama from './part/StatistikTabelAsrama.vue';
import TabelKamar from './part/StatistikTabelKamar.vue';
import Indisipliner from 'src/models/Indisipliner';

const thAjaranH = ref(null);
const loadingSelect = ref(false);
const loadingData = ref(false);
const optionsSelect = ref([]);
const kamar = ref([]);
const asrama = ref([]);
const filterAsrama = ref('');

function reset() {
	asrama.value = [];
	kamar.value = [];
	filterAsrama.value = '';
}

async function getList() {
	try {
		loadingSelect.value = true;
		const data = await Indisipliner.listThAjaran();
		optionsSelect.value = ArrayCrud.sortPrimitiveArray(data.th_ajaran_h, 'desc');
	} catch (error) {
		console.error('🚀 ~ getList ~ error:', error);
	} finally {
		loadingSelect.value = false;
	}
}

onMounted(async () => {
	await getList();
});

async function getData(thAjaranH) {
	if (!thAjaranH) return;
	try {
		loadingData.value = true;
		const data = await Statistik.indisipliner(thAjaranH);
		kamar.value = data.kamar;
		asrama.value = data.asrama;
		// console.log(data);
	} catch (error) {
		console.error('🚀 ~ get statistik ~ error:', error);
	} finally {
		loadingData.value = false;
	}
}

watch(thAjaranH, async (newThAjaranH) => {
	reset();
	if (newThAjaranH) {
		await getData(newThAjaranH);
	}
});

const filteredKamar = computed(() => {
	if (!filterAsrama.value) {
		return kamar.value;
	}
	return kamar.value.filter((item) => item.asrama.toUpperCase() === filterAsrama.value.toUpperCase());
});
</script>
<style lang=""></style>
