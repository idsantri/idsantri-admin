<template lang="">
	<q-card flat class="flex items-start">
		<q-card-section class="q-pa-sm col-grow">
			<q-table
				:rows="santri"
				:filter="filter"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				flat
				bordered
				@row-click="(evt, row, index) => (selected = row)"
				:columns="columns"
			>
				<template v-slot:top>
					<div class="text-subtitle2">Data Santri AKTIF</div>
					<q-space />
					<q-input
						outlined
						dense
						debounce="300"
						color="primary"
						v-model="filter"
						clearable
						type="search"
						placeholder="Tulis teks pencarian di sini..."
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>
			</q-table>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<MutaallimCard :santri="selected" />
		</q-card-section>
	</q-card>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { onMounted, ref } from 'vue';
import MutaallimCard from './MutaallimCard.vue';

const filter = ref('');
const loading = ref(false);
const selected = ref({});
const santri = ref([]);

async function loadData() {
	const data = await apiGet({ endPoint: 'quran/mutaallim/santri', loading });
	if (data) {
		santri.value = data.santri;
	}
}
onMounted(async () => {
	await loadData();
});

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
