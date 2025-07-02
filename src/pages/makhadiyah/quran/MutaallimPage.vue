<template lang="">
	<q-card flat class="flex items-start">
		<q-card-section class="q-pa-sm col-grow">
			<q-card flat bordered>
				<TableHeader
					title="Data Mutaallim AKTIF"
					v-model="filter"
					@on-reload="loadData"
					@on-filter="showFilter = !showFilter"
				/>
				<q-card-section class="q-pa-sm" v-show="showFilter">
					<q-select
						dense
						outlined
						multiple
						label="Filter"
						:options="[
							'Option 1',
							'Option 2',
							'Option 3',
							'Option 4',
							'Option 5',
						]"
						:modelValue="filter"
					/>
				</q-card-section>
				<q-table
					:rows="mutaallim"
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
			<MutaallimCard :santri="{ id: selected.santri_id }" />
		</q-card-section>
	</q-card>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { onMounted, ref } from 'vue';
import MutaallimCard from './MutaallimCard.vue';
import TableHeader from './TableHeader.vue';

const selected = ref({});
const mutaallim = ref([]);
const loading = ref(false);
const filter = ref('');
const showFilter = ref(false);

async function loadData() {
	const data = await apiGet({ endPoint: 'quran/mutaallim/aktif', loading });
	if (data) {
		mutaallim.value = data.mutaallim;
	}
}

onMounted(async () => {
	await loadData();
});

const columns = [
	{
		name: 'santri_id',
		label: 'ID Santri',
		align: 'center',
		field: 'santri_id',
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
	{
		name: 'no_absen',
		label: 'No Absen',
		align: 'left',
		field: 'no_absen',
		sortable: true,
	},
];
</script>
<style lang=""></style>
