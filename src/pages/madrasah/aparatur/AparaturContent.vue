<template lang="">
	<q-table
		flat
		:rows="aparatur"
		:columns="columns"
		:filter="filter"
		@row-click="(evt, row, index) => $router.push(`/personalia/${row.aparatur_id}`)"
		:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
		no-data-label="Silakan tentukan filter!"
		no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
		row-key="name"
		:loading="loading"
	>
		<template v-slot:top-left>
			<div class="text-subtitle1 text-green-10">Data Aparatur Madrasah</div>
		</template>
		<template v-slot:top-right>
			<q-input outlined dense debounce="300" v-model="filter" placeholder="Cari">
				<template v-slot:append>
					<q-icon name="search" />
				</template>
			</q-input>
		</template>
	</q-table>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AparaturMadrasah from 'src/models/AparaturMadrasah';

const { params } = useRoute();
const filter = ref('');
const aparatur = ref([]);
const loading = ref(false);

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id) {
		try {
			loading.value = true;
			const data = await AparaturMadrasah.getAll({
				params: {
					th_ajaran_h: params.th_ajaran_h,
					tingkat_id: params.tingkat_id,
				},
			});

			aparatur.value = data.aparatur_madrasah;
		} catch (error) {
			console.error('🚀 ~ error:', error);
		} finally {
			loading.value = false;
		}
	} else {
		aparatur.value = [];
	}
});

const columns = [
	{
		name: 'nama',
		label: 'Nama',
		align: 'left',
		field: (row) => `${row.nama} (${row.sex})`,
		sortable: true,
	},
	{
		name: 'alamat',
		label: 'Alamat',
		align: 'left',
		field: 'alamat_pendek',
		sortable: true,
		classes: 'alamat',
	},
	{
		name: 'jabatan',
		label: 'Jabatan',
		align: 'left',
		field: 'jabatan',
		sortable: true,
	},
	{
		name: 'tingkat',
		label: 'Tingkat',
		align: 'left',
		field: 'tingkat',
		sortable: true,
	},
	{
		name: 'kelas',
		label: 'Kelas',
		align: 'left',
		field: 'kelas',
		sortable: true,
	},
	{
		name: 'ruang',
		label: 'Ruang',
		align: 'left',
		field: 'ruang',
		sortable: true,
	},
];
</script>
<style lang=""></style>
