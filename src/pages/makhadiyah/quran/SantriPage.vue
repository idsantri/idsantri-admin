<template lang="">
	<q-card flat class="flex items-start">
		<q-card-section class="q-pa-sm col-grow">
			<q-card flat bordered>
				<TableHeader
					title="Data Santri AKTIF"
					v-model="filter"
					@on-reload="loadData"
					@on-filter="showFilter = !showFilter"
				/>
				<q-card-section class="q-pa-sm" v-show="showFilter">
					<q-select
						dense
						outlined
						multiple
						label="Filter Domisili"
						v-model="modelDomisili"
						:options="groupByDomisili()"
						style="max-width: 300px"
						clearable
					>
						<template
							v-slot:option="{
								itemProps,
								opt,
								selected,
								toggleOption,
							}"
						>
							<q-item v-bind="itemProps">
								<q-item-section>
									<q-item-label>{{ opt }}</q-item-label>
								</q-item-section>
								<q-item-section side>
									<q-toggle
										:model-value="selected"
										@update:model-value="toggleOption(opt)"
									/>
								</q-item-section>
							</q-item>
						</template>
					</q-select>
					<!-- {{ modelDomisili }} -->
				</q-card-section>
				<q-table
					:rows="santri"
					:filter="filter"
					:loading="loading"
					:rows-per-page-options="[10, 25, 50, 100, 0]"
					flat
					@row-click="(evt, row, index) => (selected = row)"
					:columns="columns"
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
import { onMounted, ref, watchEffect } from 'vue';
import MutaallimCard from './MutaallimCard.vue';
import TableHeader from './TableHeader.vue';

const filter = ref('');
const loading = ref(false);
const selected = ref({});
const santri = ref([]);
const showFilter = ref(false);
const modelDomisili = ref([]);

async function loadData() {
	const data = await apiGet({ endPoint: 'quran/mutaallim/santri', loading });
	if (data) {
		santri.value = data.santri;
	}
}
onMounted(async () => {
	await loadData();
});

watchEffect(() => {
	if (modelDomisili.value?.length > 0) {
		console.log('filter');
	} else {
		console.log('reset');
	}
});

function groupByDomisili() {
	const domisiliSet = new Set();
	santri.value.forEach((item) => {
		if (item.domisili) {
			domisiliSet.add(item.domisili);
		}
	});
	return Array.from(domisiliSet);
}

const columns = [
	{
		name: 'id',
		label: 'ID Santri',
		align: 'center',
		field: 'id',
		sortable: true,
	},
	{
		name: 'nama',
		label: 'Nama',
		align: 'left',
		field: 'nama',
		sortable: true,
	},
	{
		name: 'domisili',
		label: 'Domisili',
		align: 'left',
		field: 'domisili',
		sortable: true,
	},
	{
		name: 'marhalah',
		label: 'Marhalah',
		align: 'left',
		field: 'marhalah',
		sortable: true,
	},
	{
		name: 'faslah',
		label: 'Faslah/Kelas',
		align: 'left',
		field: 'faslah',
		sortable: true,
	},
];
</script>
<style lang=""></style>
