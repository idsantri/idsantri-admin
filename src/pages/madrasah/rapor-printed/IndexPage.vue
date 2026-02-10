<template lang="">
	<CardPage>
		<CardHeader title="Rapor (Printed)" @onReload="loadData" />
		<q-card-section class="q-pa-sm">
			<q-card style="max-width: 1024px" flat bordered>
				<q-table
					:rows="rapor"
					:loading="loading"
					:columns="columns"
					:rows-per-page-options="[10, 25, 50, 100, 0]"
					row-key="name"
					:filter="filter"
				>
					<template v-slot:top>
						<div class="text-green-10">
							<div class="text-subtitle1">Daftar Rapor yang Sudah Dicetak</div>
							<div class="text-caption text-italic" style="line-height: 1rem">
								Hapus data berikut agar DATA RAPOR (Nilai Mapel, Nilai Ahwal, dan Absensi) tidak
								terkunci!
							</div>
							<div class="text-overline q-mb-sm" style="line-height: 1.5rem">(Akses Admin)</div>
						</div>
						<q-space />
						<q-input outlined dense debounce="300" color="primary" placeholder="Cari" v-model="filter">
							<template v-slot:append>
								<q-icon name="search" />
							</template>
						</q-input>
					</template>

					<template v-slot:header="props">
						<q-tr :props="props">
							<q-th v-for="col in props.cols" :key="col.name" :props="props">
								{{ col.label }}
							</q-th>
							<q-th class="text-center">
								<q-btn icon="delete" color="negative" dense flat disable title="Hapus" />
							</q-th>
						</q-tr>
					</template>
					<template v-slot:body="props">
						<q-tr :props="props">
							<q-td v-for="col in props.cols" :key="col.name" :props="props">
								{{ col.value }}
							</q-td>
							<q-td class="text-center">
								<q-btn
									icon="sym_o_delete"
									color="negative"
									dense
									flat
									@click="deleteRow(props.row.id)"
								/>
							</q-td>
						</q-tr>
					</template>
				</q-table>
			</q-card>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import Rapor from 'src/models/Rapor';
import { onMounted, ref } from 'vue';

const rapor = ref([]);
const loading = ref(false);
const filter = ref('');

async function loadData() {
	try {
		loading.value = true;
		const data = await Rapor.setting();
		rapor.value = data.rapor_setting;
	} catch (error) {
		console.error('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});

async function deleteRow(id) {
	try {
		loading.value = true;
		await Rapor.remove({ id });
		await loadData();
	} catch (error) {
		console.error('🚀 ~ deleteRow ~ error:', error);
	} finally {
		loading.value = false;
	}
}

const columns = [
	{
		name: 'th_ajaran_h',
		label: 'Th Ajaran H',
		align: 'left',
		field: 'th_ajaran_h',
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
		name: 'rapor_ke',
		label: 'Ke',
		align: 'left',
		field: 'rapor_ke',
		sortable: true,
	},
	{
		name: 'tgl_rapor',
		label: 'Tanggal',
		align: 'left',
		field: 'tgl_rapor',
		sortable: true,
	},
	{
		name: 'model_ujian',
		label: 'Model',
		align: 'left',
		field: 'model_ujian',
		sortable: true,
	},
];
</script>
<style lang=""></style>
