<template lang="">
	<CardPage :dynamic-height="false">
		<CardHeader title="Data Mutasi Domisili" @on-reload="loadData">
			<template v-slot:buttons>
				<q-btn icon="tune" label="Atur Mutasi" dense outline no-caps class="q-px-sm" to="/mutasi/start" />
			</template>
			<template v-slot:more>
				<q-list>
					<q-item v-close-popup to="/info/download">
						<q-item-section>
							<q-item-label>Cetak</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="print" flat />
						</q-item-section>
					</q-item>

					<q-item v-close-popup @click="downloadMutasi" clickable>
						<q-item-section>
							<q-item-label>Unduh/Download</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="download" flat />
						</q-item-section>
					</q-item>
					<q-item v-close-popup @click="deleteAll" clickable>
						<q-item-section>
							<q-item-label>Hapus Semua</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="delete_forever" flat />
						</q-item-section>
					</q-item>
				</q-list>
			</template>
		</CardHeader>
		<CardLoading :showing="loading" />
		<q-card-section class="q-pa-sm">
			<q-table
				class="q-pa-sm"
				:rows="santri"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
				flat
				bordered
			>
				<template v-slot:header="props">
					<q-tr :props="props">
						<q-th key="santri_id" :props="props" class="text-left"> ID Santri </q-th>
						<q-th key="nama" :props="props"> Nama </q-th>
						<q-th key="tk" :props="props"> Tingkat &mdash; Kelas </q-th>
						<q-th key="domisili" :props="props"> Domisili (Asal) </q-th>
						<q-th key="new_domisili" :props="props"> Domisili (Baru) </q-th>
						<q-th class="text-center">
							<!-- <q-btn
									icon="edit"
									flat
									color="green-6"
									disable
								/> -->
						</q-th>
					</q-tr>
				</template>
				<template v-slot:body="props">
					<q-tr :props="props">
						<q-td key="santri_id" :props="props" class="text-left">
							<q-btn
								:label="props.row.santri_id"
								outline
								color="green-10"
								class="text-caption q-px-sm"
								dense
								:to="`/santri/${props.row.santri_id}`"
							/>
						</q-td>
						<q-td key="nama" :props="props">
							{{ props.row.nama }}
						</q-td>
						<q-td key="tk" :props="props">
							{{ props.row.tk }}
						</q-td>
						<q-td key="domisili" :props="props">
							{{ props.row.domisili }}
						</q-td>
						<q-td key="new_domisili" :props="props">
							{{ props.row.new_domisili }}
						</q-td>
						<q-td key="id" :props="props" class="text-center">
							<q-btn icon="edit" flat color="green-10" @click="edit(props.row)" />
						</q-td>
					</q-tr>
				</template>
			</q-table>
		</q-card-section>
		<q-card-actions class="q-pa-sm bg-green-7 text-green-11 row">
			<div class="col text-italic">
				1) Teliti kembali sebelum Anda menekan tombol Update; 2) Lakukan backup data dengan menekan tombol
				download!;
			</div>
			<q-btn
				style="max-width: 150px"
				class="col bg-green-8 q-ml-md"
				label="Update Domisili"
				glossy
				no-caps
				dense
				outline
				icon="sym_o_edit_arrow_up"
				:disable="!santri.length > 0 || loading"
				@click="updateDomisili"
			/>
		</q-card-actions>
		<q-dialog v-model="showEdit">
			<MutasiForm :data="mutasiItem" @success-delete="loadData" @success-submit="loadData" />
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import MutasiForm from 'src/components/forms/MutasiForm.vue';
import Mutasi from 'src/models/Mutasi';
import DownloadUrl from 'src/models/DownloadUrl';

const santri = ref([]);
const loading = ref(false);
const showEdit = ref(false);
const mutasiItem = ref({});

async function loadData() {
	try {
		loading.value = true;
		const data = await Mutasi.getAll({ notifySuccess: false });
		santri.value = data.mutasi.map((s) => {
			return { ...s, tk: s.tingkat_id + ' ' + s.kelas };
		});
	} catch (error) {
		console.error('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});

async function edit(item) {
	mutasiItem.value = item;
	showEdit.value = true;
}

async function updateDomisili() {
	const message = `<hr><span style="color:blue">Update Domisili?</span><hr>
		<em>
			<strong>Peringatan:</strong>
			<ul style="margin:0">
				<li>Pastikan semua keperluan Administrasi (terkait domisili asal) telah selesai!</li>
				<li>Sebaiknya data di-download/ diunduh terlebih dahulu sebagai backup!</li>
				<li>Setelah update selesai, semua data mutasi akan <strong>dihapus</strong>!</li>
			</ul>
		</em>`;

	try {
		loading.value = true;
		if (await Mutasi.execute(message)) {
			await loadData();
		}
	} catch (error) {
		console.error('🚀 ~ updateDomisili ~ error:', error);
	} finally {
		loading.value = false;
	}
}

async function deleteAll() {
	try {
		loading.value = true;
		await Mutasi.removeAll();
		santri.value = [];
	} catch (error) {
		console.error('🚀 ~ deleteAll ~ error:', error);
	} finally {
		loading.value = false;
	}
}

async function downloadMutasi() {
	try {
		loading.value = true;
		await DownloadUrl.mutasi();
	} catch (error) {
		console.error('🚀 ~ downloadMutasi ~ error:', error);
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
