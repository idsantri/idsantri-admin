<template lang="">
	<q-card flat bordered style="max-width: 1000px">
		<q-form @submit.prevent="onSubmit">
			<q-card-section class="no-padding">
				<div class="row">
					<div v-if="loadingDownload">
						<q-dialog v-model="loadingDownload" persistent="">
							<q-spinner-cube color="green-12" size="8em" class="flex q-ma-lg q-mx-auto" />
						</q-dialog>
					</div>
					<div class="col-12 col-md-3 q-pa-sm">
						<q-card bordered flat>
							<q-card-section class="bg-green-11 q-pa-sm"> Pilih Kelas </q-card-section>
							<q-card-section class="no-padding">
								<q-select
									class="q-pa-sm"
									dense
									outlined
									label="Tahun Ajaran"
									v-model="input.th_ajaran_h"
									:options="lists['th_ajaran']"
									option-value="th_ajaran_h"
									option-label="th_ajaran_h"
									emit-value
									map-options
									:loading="loading['th_ajaran']"
									behavior="menu"
								/>
								<q-select
									class="q-pa-sm"
									dense
									outlined
									label="Tingkat Pendidikan"
									v-model="input.tingkat_id"
									:options="lists['tingkat']"
									option-value="tingkat_id"
									option-label="tingkat"
									emit-value
									map-options
									:loading="loading['tingkat']"
									clearable=""
									behavior="menu"
								/>
								<q-select
									class="q-pa-sm"
									dense
									outlined
									label="Kelas"
									v-model="input.kelas"
									:options="lists['kelas']"
									option-value="kelas"
									option-label="kelas"
									emit-value
									map-options
									:loading="loading['kelas']"
									clearable=""
									behavior="menu"
								/>
							</q-card-section>
						</q-card>
					</div>
					<div class="col-12 col-md-3 q-pa-sm">
						<q-card bordered flat>
							<q-card-section class="bg-green-11 q-pa-sm"> Atur Absensi </q-card-section>
							<q-card-section class="no-padding">
								<q-select
									class="q-pa-sm"
									dense
									outlined
									label="Absensi"
									v-model="input.absensi"
									:options="['Sekolah', 'Musyawarah']"
									behavior="menu"
								/>
								<q-select
									class="q-pa-sm"
									dense
									outlined
									label="Tahun"
									v-model="input.tahun"
									:options="optionsTahun"
									behavior="menu"
								/>
								<q-select
									class="q-pa-sm"
									dense
									outlined
									label="Bulan"
									v-model="input.bulan"
									:options="optionsBulan"
									clearable=""
									behavior="menu"
								/>
							</q-card-section>
						</q-card>
					</div>
					<div class="col-12 col-md-6 q-pa-sm">
						<q-card bordered flat>
							<q-card-section class="bg-green-11 q-pa-sm">
								Atur Pekan dan Tanggal
								<small><em>(untuk absensi perpekan)</em></small>
							</q-card-section>
							<q-card-section class="no-padding">
								<div class="row">
									<q-toggle class="q-pa-sm col-4" label="Perpekan" v-model="perpekan" />
									<q-input
										class="q-pa-sm col-4"
										dense
										outlined
										label="Pekan ke-?"
										v-model="input.pekan"
										:disable="!perpekan"
									/>
								</div>
								<div class="row">
									<q-input
										class="q-pa-sm col-4"
										dense
										outlined
										label="Sabtu Tanggal"
										v-model="input.d1"
										@change="inputDay(1)"
										:disable="!perpekan"
									/>
									<q-input
										class="q-pa-sm col-4"
										dense
										outlined
										label="Ahad Tanggal"
										v-model="input.d2"
										@change="inputDay(2)"
										:disable="!perpekan"
									/>
									<q-input
										class="q-pa-sm col-4"
										dense
										outlined
										label="Senin Tanggal"
										v-model="input.d3"
										@change="inputDay(3)"
										:disable="!perpekan"
									/>
								</div>
								<div class="row">
									<q-input
										class="q-pa-sm col-4"
										dense
										outlined
										label="Selasa Tanggal"
										v-model="input.d4"
										@change="inputDay(4)"
										:disable="!perpekan"
									/>
									<q-input
										class="q-pa-sm col-4"
										dense
										outlined
										label="Rabu Tanggal"
										v-model="input.d5"
										@change="inputDay(5)"
										:disable="!perpekan"
									/>
									<q-input
										class="q-pa-sm col-4"
										dense
										outlined
										label="Kamis Tanggal"
										v-model="input.d6"
										@change="inputDay(6)"
										:disable="!perpekan"
									/>
								</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
			</q-card-section>
			<q-card-actions class="bg-green-7 flex">
				<q-btn
					label="Cetak dengan Access"
					icon="print"
					color="green-10"
					class="q-px-md text-green-11"
					dense
					no-caps
					to="/info/download"
				/>
				<q-space />
				<q-btn
					label="Print"
					icon="print"
					color="green-11"
					class="q-px-md text-green-10"
					dense
					no-caps
					@click="handlePrint"
				/>
				<q-btn
					type="submit"
					label="Unduh"
					icon="download"
					color="green-11"
					class="q-px-md text-green-10"
					dense
					no-caps
				/>
			</q-card-actions>
		</q-form>
		<q-dialog v-model="showViewer">
			<ReportViewer :url="urlReport" />
		</q-dialog>
		<!-- TEST -->
		<div v-if="false">
			<q-btn
				label="Proses"
				icon="download"
				color="green-11"
				class="q-px-md text-green-10"
				dense
				no-caps
				@click="onProses"
			/>
			<TestPrint :data-murid="murid" />
		</div>
	</q-card>
</template>
<script setup>
import { getListsCustom } from 'src/api/api-get-lists';
import { onMounted, ref, watch } from 'vue';
import { listBulanHijri } from 'src/utils/hijri';
import apiDownload from 'src/api/api-download';
import TestPrint from './TestPrint.vue';
import apiGet from 'src/api/api-get';
import ReportViewer from 'src/components/ReportViewer.vue';

const loading = ref([]);
const lists = ref([]);
const input = ref({ absensi: 'Sekolah' });
const optionsTahun = ref([]);
const optionsBulan = ref(listBulanHijri.map((bulan) => bulan.name));
const perpekan = ref(false);
const loadingDownload = ref(false);
const urlReport = ref('');

const murid = ref([]);
async function onProses() {
	murid.value = [];
	const data = await apiGet({
		loading: loadingDownload,
		endPoint: `murid/${input.value.th_ajaran_h}/${input.value.tingkat_id}${input.value.kelas ? '/' + input.value.kelas : ''}`,
	});
	// console.log(data);
	murid.value = data.murid;
	// console.log(murid.value);
}

async function onSubmit() {
	const obj = JSON.parse(JSON.stringify(input.value));
	const fileName =
		'absensi-' +
		(obj.absensi?.toLowerCase() || '') +
		'~' +
		(obj.th_ajaran_h || '') +
		'~' +
		(obj.tingkat_id || '') +
		'~' +
		(obj.kelas || '') +
		'~' +
		(obj.tahun || '') +
		'~' +
		(obj.bulan?.toLowerCase() || '') +
		(obj.pekan ? '~p' + obj.pekan : '');
	// console.log(fileName);
	// return;
	let url = '';
	if (perpekan.value) {
		url = '/reports/absensi/pekanan/download';
	} else {
		url = '/reports/absensi/bulanan/download';
	}
	await apiDownload({
		endPoint: url,
		// confirm: false,
		loading: loadingDownload,
		params: obj,
		fileName,
	});
}

const showViewer = ref(false);
function handlePrint() {
	const queryString = new URLSearchParams(input.value).toString();
	// console.log(queryString);
	// return;
	let url = '';
	if (perpekan.value) {
		url = 'reports/absensi/pekanan/view';
	} else {
		url = 'reports/absensi/bulanan/view';
	}
	urlReport.value = `${url}?${queryString}`;
	showViewer.value = true;
}

function inputDay(val) {
	if (val == 1) {
		if (!isNaN(input.value.d1)) {
			input.value.d2 = parseInt(input.value.d1) + 1 || '';
			input.value.d3 = parseInt(input.value.d1) + 2 || '';
			input.value.d4 = parseInt(input.value.d1) + 3 || '';
			input.value.d5 = parseInt(input.value.d1) + 4 || '';
			input.value.d6 = parseInt(input.value.d1) + 5 || '';
		}
	}
	if (val == 2) {
		if (!isNaN(input.value.d2)) {
			input.value.d3 = parseInt(input.value.d2) + 1 || '';
			input.value.d4 = parseInt(input.value.d2) + 2 || '';
			input.value.d5 = parseInt(input.value.d2) + 3 || '';
			input.value.d6 = parseInt(input.value.d2) + 4 || '';
		}
	}
	if (val == 3) {
		if (!isNaN(input.value.d3)) {
			input.value.d4 = parseInt(input.value.d3) + 1 || '';
			input.value.d5 = parseInt(input.value.d3) + 2 || '';
			input.value.d6 = parseInt(input.value.d3) + 3 || '';
		}
	}
	if (val == 4) {
		if (!isNaN(input.value.d4)) {
			input.value.d5 = parseInt(input.value.d4) + 1 || '';
			input.value.d6 = parseInt(input.value.d4) + 2 || '';
		}
	}
	if (val == 5) {
		if (!isNaN(input.value.d5)) {
			input.value.d6 = parseInt(input.value.d5) + 1 || '';
		}
	}
}

onMounted(async () => {
	const data = await getListsCustom({
		url: 'murid/lists-kelas',
		key: 'th_ajaran',
		loadingArray: loading,
	});
	lists.value['th_ajaran'] = data;
});

// watch th ajaran
// get tingkat
watch(
	() => input.value.th_ajaran_h,
	async (newValue, oldValue) => {
		if (newValue != oldValue) {
			// console.log('new value', newValue);
			input.value.tingkat_id = '';
			input.value.kelas = '';
			input.value.tahun = '';
			const data = await getListsCustom({
				url: `murid/lists-kelas/${newValue}`,
				key: 'tingkat',
				loadingArray: loading,
			});
			lists.value['tingkat'] = data;
			// console.log(newValue.substring(0, 4));
			// console.log(newValue.substring(5));
			optionsTahun.value = [newValue.substring(0, 4), newValue.substring(5)];
		}
	},
);

// watch tingkat
// get kelas
watch(
	() => input.value.tingkat_id,
	async (newValue, oldValue) => {
		if (newValue != oldValue) {
			input.value.kelas = '';
			if (newValue && input.value.th_ajaran_h) {
				const data = await getListsCustom({
					url: `murid/lists-kelas/${input.value.th_ajaran_h}/${newValue}`,
					key: 'kelas',
					loadingArray: loading,
				});
				lists.value['kelas'] = data;
			}
			// console.log(lists.value);
		}
	},
);
</script>
<style lang=""></style>
