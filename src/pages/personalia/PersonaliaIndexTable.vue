<template lang="">
	<CardPage>
		<CardHeader title="Data Personalia" @onReload="loadData">
			<template v-slot:buttons>
				<q-btn
					dense
					class="q-px-md text-green-10"
					label="Tambah"
					no-caps=""
					icon="add"
					color="green-2"
					@click="crudShow = true"
				/>
			</template>
		</CardHeader>
		<q-card-section class="q-pa-sm">
			<q-table
				bordered
				flat
				:rows="personalia"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				class="dt"
				:columns="columns"
				:filter="filter"
				no-data-label="Tidak ada data untuk ditampilkan!"
				no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
				row-key="name"
				@row-click="(evt, row, index) => $router.push(`/personalia/${row.id}`)"
			>
				<template v-slot:top-right>
					<q-input outlined dense debounce="300" v-model="filter" placeholder="Cari">
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>
			</q-table>
		</q-card-section>
		<q-dialog persistent="" v-model="crudShow">
			<PersonaliaForm
				:data="{}"
				@success-submit="(val) => $router.push(`/personalia/${val.id}`)"
				@success-delete="$router.go(-1)"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiGet from 'src/api/api-get';
import PersonaliaForm from 'src/components/forms/PersonaliaForm.vue';

const loading = ref(false);
const personalia = ref([]);
const filter = ref('');
const crudShow = ref(false);

async function loadData() {
	const data = await apiGet({ endPoint: 'aparatur', loading });
	if (data) {
		personalia.value = data.aparatur;
	}
}

onMounted(async () => {
	await loadData();
});

const columns = [
	{
		name: 'id',
		label: 'ID',
		align: 'center',
		field: 'id',
		sortable: true,
	},
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
	},
	{
		name: 'kontak',
		label: 'Kontak',
		align: 'left',
		field: (row) => `${row.telepon || '-'}; ${row.email || '-'}`,
		sortable: true,
	},
];
</script>
<style lang=""></style>
