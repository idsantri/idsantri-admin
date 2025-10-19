<template lang="">
	<q-page>
		<div class="row" style="max-width: 1200px">
			<div class="col-12 col-md-6 q-pt-sm">
				<!-- PJGT -->
				<q-card class="q-mx-sm">
					<q-card-section class="bg-green-8 no-padding">
						<q-toolbar class="no-padding no-margin">
							<q-toolbar-title
								class="text-subtitle1 q-ml-sm text-green-11"
							>
								Data PJGT
							</q-toolbar-title>
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
						<div v-if="loadingPjgt">
							<q-spinner-cube
								color="green-12"
								size="8em"
								class="flex q-ma-lg q-mx-auto"
							/>
						</div>
						<div v-else>
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
						</div>
					</q-card-section>
				</q-card>
			</div>
			<div class="col-12 col-md-6 q-pt-sm">
				<!-- GT -->
				<q-card class="q-mx-sm">
					<q-card-section class="bg-green-8 no-padding">
						<q-toolbar class="no-padding no-margin">
							<q-toolbar-title
								class="text-subtitle1 q-ml-sm text-green-11"
							>
								Data GT
							</q-toolbar-title>
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
						<div v-if="loadingGt">
							<q-spinner-cube
								color="green-12"
								size="8em"
								class="flex q-ma-md q-mx-auto"
							/>
						</div>
						<div v-else>
							<div
								v-if="!gt.length"
								class="text-center text-negative bg-red-1"
							>
								<p class="no-margin q-pa-md">
									Tidak ada data untuk ditampilkan!
								</p>
							</div>
							<q-list v-else bordered separator>
								<q-item
									v-for="(item, index) in gt"
									:key="index"
								>
									<q-item-section>
										<q-item-label overline>
											{{ item.th_ajaran_h }}
										</q-item-label>
										<q-item-label caption>
											<em>
												GT ID:
												<strong> {{ item.id }} </strong
												>; Santri ID:
												<strong>{{
													item.santri_id
												}}</strong>
											</em>
										</q-item-label>
										<q-item-label>
											{{ item.nama?.toUpperCase() }}
										</q-item-label>
										<q-item-label caption>
											Telepon: {{ item.telepon || '-' }};
											Email: {{ item.email || '-' }}
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
						</div>
					</q-card-section>
				</q-card>
			</div>
		</div>
		<q-dialog persistent="" v-model="crudShow">
			<PjgtForm
				:is-new="false"
				:data="pjgt"
				@success-submit="loadPjgt()"
				@success-delete="$router.go(-1)"
			/>
		</q-dialog>

		<q-dialog persistent="" v-model="crudGt">
			<gt-crud
				:is-new="true"
				:data="{
					pjgt_id: pjgt.id,
					pjgt_nama: pjgt.nama,
					pjgt_wilayah: pjgt.wilayah,
				}"
				@success-submit="loadGt()"
				@success-delete="$router.go(-1)"
			/>
		</q-dialog>

		<!-- <pre>{{ pjgt }}</pre> -->
		<!-- <pre>{{ gt }}</pre> -->
	</q-page>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { formatAlamatLengkap } from 'src/utils/format-text';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import PjgtForm from 'src/components/forms/PjgtForm.vue';
import GtCrud from 'src/pages/ugt/gt/GtCrud.vue';

const route = useRoute();
const id = route.params.id;
const loadingPjgt = ref(false);
const loadingGt = ref(false);
const pjgt = ref({});
const gt = ref([]);
const crudShow = ref(false);
const crudGt = ref(false);

async function loadPjgt() {
	const data = await apiGet({
		endPoint: `ugt/pjgt/${id}`,
		loading: loadingPjgt,
	});
	pjgt.value = data.pjgt;
}
async function loadGt() {
	const data = await apiGet({
		endPoint: 'ugt/gt',
		loading: loadingGt,
		params: {
			pjgt_id: id,
		},
	});
	gt.value = data.gt;
}

onMounted(async () => {
	await loadPjgt();
	await loadGt();
});
</script>
<style lang=""></style>
