<template lang="">
	<q-card flat class="">
		<q-card-section class="no-padding">
			<q-card flat bordered>
				<TableHeader title="Data Muallim" v-model="filter" @on-reload="onReload" :btn-filter="false">
					<template #actions>
						<q-btn
							no-caps
							dense
							class="q-px-sm q-mr-sm"
							icon="search"
							label="Personalia"
							color="green-10"
							@click="$router.push('/personalia')"
						/>
					</template>
				</TableHeader>
				<q-card-section class="q-pa-sm">
					<InputSelectArray
						v-model="th_ajaran_h"
						url="tahun-ajaran"
						label="Pilih Tahun Ajaran"
						sort="desc"
						style="max-width: 300px"
						class="q-mt-sm"
						:rules="[(val) => !!val || 'Harus diisi!']"
						:selected="th_ajaran_h"
					/>
				</q-card-section>

				<q-table
					:rows="muallim"
					:filter="filter"
					:loading="loading"
					:rows-per-page-options="[10, 25, 50, 100, 0]"
					flat
					@row-click="(evt, row, index) => $router.push(`/personalia/${row.aparatur_id}`)"
					:columns="columns"
					table-header-class="bg-green-1 text-green-10 text-subtitle1"
				/>
			</q-card>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { ref, watch } from 'vue';
import TableHeader from './TableHeader.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import apiGet from 'src/api/api-get';
const filter = ref('');
const th_ajaran_h = ref('');
const muallim = ref([]);
const loading = ref(false);

async function onReload() {
	if (th_ajaran_h.value) {
		await loadData(th_ajaran_h.value);
	} else {
		muallim.value = [];
	}
}

async function loadData(th_ajaran_h) {
	const data = await apiGet({
		endPoint: `aparatur-quran`,
		params: { th_ajaran_h: th_ajaran_h, jabatan: 'Muallim' },
		loading,
	});
	if (data) {
		muallim.value = data.aparatur_quran;
	}
}

watch(
	() => th_ajaran_h.value,
	async (newVal) => {
		if (newVal) {
			// console.log('Loading muallim data for year:', newVal);
			await loadData(newVal);
		} else {
			// console.log('No year selected, clearing muallim data');
			muallim.value = [];
		}
	},
);

const columns = [
	{ name: 'nama', label: 'Nama', align: 'left', field: 'nama' },
	{
		name: 'th_ajaran_h',
		label: 'Tahun Ajaran',
		align: 'left',
		field: 'th_ajaran_h',
	},
	{ name: 'marhalah', label: 'Marhalah', align: 'left', field: 'marhalah' },
	{ name: 'faslah', label: 'Faslah/Kelas', align: 'left', field: 'faslah' },
	{ name: 'ruang', label: 'Ruang', align: 'left', field: 'ruang' },
];
</script>
<style lang=""></style>
