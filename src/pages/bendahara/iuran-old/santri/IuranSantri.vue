<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="" style="max-width: 600px">
			<q-card-section class="bg-green-8 no-padding">
				<q-toolbar class="no-padding no-margin">
					<q-toolbar-title
						class="text-subtitle1 q-ml-sm text-green-11"
					>
						Data Iuran Santri
					</q-toolbar-title>
					<q-btn
						icon="reply"
						round
						class="q-mr-md"
						flat
						color="green-11"
						dense
						@click="$router.go(-1)"
					/>
					<q-btn
						icon="sync"
						round
						class="q-mr-md"
						flat
						color="green-11"
						dense
						@click="keyIuran++"
					/>
				</q-toolbar>
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<card-head-santri :data="santri" :loading="loading" />
				<q-card bordered flat class="q-mt-sm">
					<q-card-section
						class="q-pa-sm text-subtitle1 bg-green-11 flex"
					>
						Data Iuran
						<q-space />
						<q-btn-dropdown
							disable
							split
							dense
							label="Tambah"
							no-caps=""
							icon="add"
							color="green-10"
							padding="xs sm"
							text-color="green-11"
							@click="crudShow = true"
						>
							<dropdown-button
								@show-paket="crudShowPaket = true"
							/>
						</q-btn-dropdown>
					</q-card-section>
					<q-card-section class="no-padding" :key="keyIuran">
						<div v-if="loading && !params.thAjaranH">
							<q-spinner-cube
								color="green-12"
								size="8em"
								class="flex q-ma-lg q-mx-auto"
							/>
						</div>
						<div v-if="!hasIuran()" class="q-ma-lg">
							<div class="text-body2 text-italic text-center">
								Tidak ada data untuk ditampilkan!
							</div>
							<hr />
							<div
								class="text-weight-thin text-italic text-center"
							>
								Yang bersangkutan belum pernah melakuan
								pembayaran.
								<br />
								Silakan klik tombol tambah!
							</div>
						</div>

						<div v-else class="row">
							<div class="col bg-green-1" style="max-width: 90px">
								<q-tabs vertical dense="" align="left" no-caps>
									<div
										v-for="(th, index) in tahunIuran"
										:key="index"
									>
										<q-route-tab
											:name="th"
											:label="th"
											:to="`/bendahara/iuran-old/santri/${params.id}/${th}`"
										/>
									</div>
								</q-tabs>
							</div>

							<div class="col">
								<div v-if="!params.thAjaranH" class="q-ma-lg">
									<div class="text-italic text-center">
										Klik angka tahun disamping, atau
										tambahkan data!
									</div>
								</div>
								<div v-else>
									<iuran-santri-by-th />
								</div>
							</div>
						</div>
					</q-card-section>
				</q-card>
			</q-card-section>
		</q-card>

		<!-- add new -->
		<q-dialog v-model="crudShow">
			<iuran-santri-crud
				:is-new="true"
				title="Input Iuran"
				:data="dataIuran"
				@success-submit="successSubmit"
				@success-delete="null"
				:disable-santri-id="true"
			/>
		</q-dialog>

		<!-- add paket-->
		<q-dialog v-model="crudShowPaket">
			<IuranSantriCrudPaket
				title="Input Paket Iuran"
				:data="dataIuran"
				@success-submit="successSubmit"
			/>
		</q-dialog>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiGet from 'src/api/api-get';
import CardHeadSantri from 'src/components/CardHeadSantri.vue';
import IuranSantriByTh from 'src/pages/bendahara/iuran-old/santri/IuranSantriByTh.vue';
import IuranSantriCrud from 'src/pages/bendahara/iuran-old/santri/IuranSantriCrud.vue';
import IuranSantriCrudPaket from './IuranSantriCrudPaket.vue';
import DropdownButton from './DropdownButton.vue';

const santri = ref({});
const iuran = ref([]);
const loading = ref(false);
const { params } = useRoute();
const tahunIuran = ref([]);
const crudShow = ref(false);
const crudShowPaket = ref(false);
const dataIuran = ref({});
const keyIuran = ref(0);
const router = useRouter();

function successSubmit(val) {
	if (val.th_ajaran_h == params.thAjaranH) {
		keyIuran.value++;
	} else {
		router.push(
			`/bendahara/iuran-old/santri/${val.santri_id}/${val.th_ajaran_h}`,
		);
	}
}

async function loadData() {
	const data = await apiGet({
		endPoint: `iuran-old/santri/${params.id}`,
		loading,
	});
	if (!data.santri) return;
	santri.value = data.santri;
	santri.value.santri_id = data.santri.id;
	iuran.value = data.iuran_total;
	tahunIuran.value = iuran.value.map((v) => v.th_ajaran_h);

	const img = await apiGet({
		endPoint: `images/santri/${params.id}`,
	});
	santri.value.image = img.image_url;
}

onMounted(async () => {
	await loadData();
	dataIuran.value = {
		th_ajaran_h: params.thAjaranH || '',
		santri_id: santri.value.id,
		nama: santri.value.nama,
		data_akhir: santri.value.data_akhir,
	};
});

function hasIuran() {
	return iuran.value[0]?.th_ajaran_h ? true : false;
}
</script>
<style lang=""></style>
