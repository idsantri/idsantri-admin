<template lang="">
	<CardPage>
		<CardHeader title="Data Penanggung Jawab Guru Tugas" @on-reload="loadData" />
		<div class="row" style="max-width: 1200px">
			<div class="col-12 col-md-6 q-my-sm">
				<!-- PJGT -->
				<q-card class="q-mx-sm" flat bordered>
					<q-card-section class="bg-green-7 no-padding">
						<q-toolbar class="no-padding no-margin">
							<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11"> Data PJGT </q-toolbar-title>
							<q-btn
								dense
								class="q-px-md q-mr-sm text-green-10"
								label="Edit"
								no-caps=""
								icon="edit"
								color="green-2"
								@click="crudShow = true"
							/>
						</q-toolbar>
					</q-card-section>
					<q-card-section class="q-pa-sm">
						<q-markup-table flat class="text-green-10">
							<tbody>
								<tr>
									<td>ID</td>
									<td>{{ pjgt.id }}</td>
								</tr>
								<tr>
									<td>Nama</td>
									<td>{{ pjgt.nama?.toUpperCase() }}</td>
								</tr>
								<tr>
									<td>Lembaga</td>
									<td>
										{{ pjgt.jenis_lembaga }}
										{{ pjgt.nama_lembaga }}
									</td>
								</tr>
								<tr>
									<td>Wilayah</td>
									<td>{{ pjgt.wilayah }}</td>
								</tr>
								<tr>
									<td>Alamat</td>
									<td>
										{{
											formatAlamatLengkap(
												pjgt.jl,
												pjgt.rt,
												pjgt.rw,
												pjgt.desa,
												pjgt.kecamatan,
												pjgt.kabupaten,
												pjgt.provinsi,
												pjgt.kode_pos,
											)
										}}
									</td>
								</tr>
								<tr>
									<td>Telepon</td>
									<td>{{ pjgt.telepon }}</td>
								</tr>
								<tr>
									<td>Email</td>
									<td>{{ pjgt.email }}</td>
								</tr>
							</tbody>
						</q-markup-table>
						<CardLoading :showing="loadingPjgt" />
					</q-card-section>
				</q-card>
			</div>
			<div class="col-12 col-md-6 q-my-sm">
				<!-- GT -->
				<q-card class="q-mx-sm" flat bordered>
					<q-card-section class="bg-green-7 no-padding">
						<q-toolbar class="no-padding no-margin">
							<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11"> Data GT </q-toolbar-title>
							<q-btn
								dense
								class="q-px-md q-mr-sm text-green-10"
								label="Tambah"
								no-caps=""
								icon="add"
								color="green-2"
								@click="crudGt = true"
							/>
						</q-toolbar>
					</q-card-section>
					<q-card-section class="q-pa-sm">
						<div v-if="!gt.length" class="text-center text-negative bg-red-1 q-py-md">
							<p class="no-margin q-pa-md">Tidak ada data untuk ditampilkan!</p>
						</div>
						<q-list v-else bordered separator>
							<q-item v-for="(item, index) in gt" :key="index">
								<q-item-section>
									<q-item-label overline>
										{{ item.th_ajaran_h }}
									</q-item-label>
									<q-item-label caption>
										<em>
											GT ID:
											<strong> {{ item.id }} </strong>; Santri ID:
											<strong>{{ item.santri_id }}</strong>
										</em>
									</q-item-label>
									<q-item-label>
										{{ item.nama?.toUpperCase() }}
									</q-item-label>
									<q-item-label caption>
										Telepon: {{ item.telepon || '-' }}; Email: {{ item.email || '-' }}
									</q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-btn
										class="bg-green-11"
										icon="info"
										glossy
										round
										outline
										:to="`/ugt/gt/${item.id}`"
									/>
								</q-item-section>
							</q-item>
						</q-list>
						<CardLoading :showing="loadingGt" />
					</q-card-section>
				</q-card>
			</div>
		</div>

		<q-dialog persistent="" v-model="crudShow">
			<UgtPjgtForm :is-new="false" :data="pjgt" @success-submit="loadPjgt()" @success-delete="$router.go(-1)" />
		</q-dialog>

		<q-dialog persistent="" v-model="crudGt">
			<UgtGtForm
				:data="{
					pjgt_id: pjgt.id,
					pjgt_nama: pjgt.nama,
					pjgt_wilayah: pjgt.wilayah,
				}"
				@success-submit="loadGt()"
				@success-delete="null"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { formatAlamatLengkap } from 'src/utils/format-text';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import UgtPjgtForm from 'src/components/forms/UgtPjgtForm.vue';
import UgtGtForm from 'src/components/forms/UgtGtForm.vue';
import UgtPjgt from 'src/models/UgtPjgt';
import UgtGt from 'src/models/UgtGt';

const route = useRoute();
const id = route.params.id;
const loadingPjgt = ref(false);
const loadingGt = ref(false);
const pjgt = ref({});
const gt = ref([]);
const crudShow = ref(false);
const crudGt = ref(false);

async function loadPjgt() {
	try {
		loadingPjgt.value = true;
		const data = await UgtPjgt.getById({ id, notifySuccess: true });
		pjgt.value = data.pjgt;
	} catch (_err) {
		// console.error(_err);
		console.log('error get pjgt by id');
	} finally {
		loadingPjgt.value = false;
	}
}
async function loadGt() {
	try {
		loadingGt.value = true;
		const data = await UgtGt.getAll({ params: { pjgt_id: id } });
		gt.value = data.gt;
	} catch (_err) {
		// console.error(_err);
		console.log('error get gt by pjgt id');
	} finally {
		loadingGt.value = false;
	}
}

async function loadData() {
	await loadPjgt();
	await loadGt();
}

onMounted(async () => {
	await loadData();
});
</script>
<style scoped>
td {
	white-space: normal;
	word-wrap: break-word;
}
</style>
