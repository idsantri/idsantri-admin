<template lang="">
	<CardPage>
		<CardHeader title="Upload Nilai" :show-reload="false">
			<template #buttons>
				<q-btn
					label="Nilai Mapel"
					to="/madrasah/nilai-mapel"
					dense
					outline
					no-caps
					class="q-px-sm"
					icon="show_chart"
				/>
				<q-btn
					label="Download"
					to="/madrasah/nilai-mapel/download"
					dense
					outline
					no-caps
					icon="upload"
					class="q-px-sm"
				/>
			</template>
		</CardHeader>

		<q-card-section class="no-padding">
			<q-stepper
				v-model="step"
				ref="stepper"
				done-color="green-8"
				active-color="green-10"
				animated
				flat
				header-nav
			>
				<q-step :name="1" title="Pilih File" caption="*.xls, *.xlsx" icon="create_new_folder" :done="step > 1">
					<q-separator class="q-mb-md" />

					<q-file
						@input="handleFileChange"
						outlined
						bottom-slots
						v-model="inputFile"
						label="Pilih file excel"
						counter
						dense
						style="max-width: 500px"
					>
						<template v-slot:prepend>
							<q-icon name="cloud_upload" @click.stop.prevent />
						</template>
						<template v-slot:after>
							<q-icon name="close" @click.stop.prevent="inputFile = null" class="cursor-pointer" />
						</template>

						<template v-slot:hint>
							<span class="text-green text-italic"> Hanya membaca sheet pertama </span>
						</template>
					</q-file>
				</q-step>

				<q-step :name="2" title="Cek Data" caption="Konfirmasi" icon="assignment_turned_in" :done="step > 2">
					<q-separator class="q-mb-md" />

					<q-table
						:rows="nilaiPivot"
						flat
						bordered
						class=""
						:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
					>
						<template v-slot:header="props">
							<q-tr :props="props">
								<q-th
									v-for="col in props.cols"
									:key="col.name"
									:props="props"
									class="text-bold"
									:title="
										mapel.find((m) => m.id.toLowerCase() == col.label.toLowerCase())?.name || ''
									"
								>
									{{ col.label.toLowerCase() }}
									<q-icon
										v-if="
											mapel.find((m) => m.id.toLowerCase() == col.label.toLowerCase()) ||
											col.label.toLowerCase() == 'kelas_id'
										"
										name="check_circle"
										color="green"
										size="1.3em"
									/>
								</q-th>
							</q-tr>
						</template>
					</q-table>
				</q-step>

				<q-step :name="3" title="Lengkapi Data" caption="Langkah Terakhir" icon="article">
					<q-separator class="q-mb-md" />
					<div class="row">
						<div class="col-sm-6 col-xs-12">
							<q-card bordered flat class="q-ma-xs">
								<q-card-section>
									<q-form style="max-width: 500px" @submit.prevent="onSubmit">
										<q-select
											dense
											class="q-mt-sm"
											outlined
											label="Kategori Nilai"
											v-model="input.category"
											required
											hint="Kesalahan karena hal ini berakibat fatal"
											:options="[
												{
													value: 'ujian',
													label: 'Nilai Ujian',
												},
												{
													value: 'harian',
													label: 'Nilai Harian',
												},
											]"
											emit-value
											map-options
										/>
										<q-input
											dense
											class="q-mt-sm"
											outlined
											label="Ujian Ke"
											v-model="input.ujian_ke"
											required
											type="number"
											hint="Kesalahan karena hal ini berakibat fatal"
											:rules="[(val) => (val > 0 && val < 5) || 'antara 1 s.d. 4']"
										/>
										<q-btn
											type="submit"
											label="Simpan"
											icon="save"
											dense
											class="q-mt-sm q-px-sm"
											no-caps
										/>
									</q-form>
								</q-card-section>
							</q-card>
						</div>
						<div class="col-sm-6 col-xs-12">
							<q-card flat bordered class="q-ma-xs">
								<q-card-section class="">
									Pastikan data berikut sudah benar:
									<ul>
										<li>Kelas ID</li>
										<li>Mapel ID</li>
										<li>Kategori Nilai</li>
										<li>Ujian Ke-?</li>
									</ul>
									<br />
									Kesalahan karena hal ini akan susah diperbaiki.
								</q-card-section>
							</q-card>
						</div>
					</div>
				</q-step>
			</q-stepper>
			<CardLoading :showing="loading" />
		</q-card-section>
	</CardPage>
</template>
<script setup>
import Mapel from 'src/models/Mapel';
import NilaiMapel from 'src/models/NilaiMapel';
import { notifyError, notifyWarning } from 'src/utils/notify';
import { nextTick, onMounted, ref, watch } from 'vue';
import { read, utils } from 'xlsx';

const input = ref({ category: 'ujian' });
const inputFile = ref();
const nilaiPivot = ref([]);
const mapelIds = ref([]);
const mapel = ref([{}]);
const step = ref(1);
const loading = ref(false);

async function loadData() {
	try {
		loading.value = true;
		const data = await Mapel.getAll();
		mapel.value = data.mapel;
		const ids = data.mapel.map((item) => item.id);
		mapelIds.value = ids;
	} catch (error) {
		console.error('🚀 ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});

const handleFileChange = async (event) => {
	// 1. Ambil file
	const file = event.target.files[0];
	if (!file) return;

	// 2. Aktifkan loading
	loading.value = true;

	// 3. BERI JEDA agar browser sempat menggambar (render) indikator loading di layar
	await nextTick();

	const reader = new FileReader();

	reader.onload = (e) => {
		try {
			const data = e.target.result;
			const workbook = read(data, { type: 'array' });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const dataJson = utils.sheet_to_json(worksheet, {
				// blankrows: true,
				defval: null,
			});

			if (validateData(dataJson, mapelIds.value)) {
				nilaiPivot.value = dataJson;
				step.value = 2;
			} else {
				notifyWarning('Data tidak dapat diproses');
				notifyWarning('Pastikan baris pertama adalah judul kolom dan baris berikutnya adalah konten data');
			}
		} catch (error) {
			notifyError('Gagal membaca file');
			console.error(error);
		} finally {
			// 4. MATIKAN LOADING DI SINI (Setelah proses selesai/error)
			loading.value = false;
		}
	};

	reader.onerror = () => {
		loading.value = false;
		notifyError('Gagal membaca file fisik');
	};

	reader.readAsArrayBuffer(file);
};

function validateData(dataPivot, mapelIds) {
	return (
		mapelIds.some((mapelId) => Object.prototype.hasOwnProperty.call(dataPivot[0], mapelId)) &&
		Object.prototype.hasOwnProperty.call(dataPivot[0], 'kelas_id')
	);
}

function arrayNilaiMapel({ nilaiPivot, mapelIds }) {
	let result = [];
	mapelIds.forEach((mapelKey) => {
		// cek key ada di data
		if (Object.prototype.hasOwnProperty.call(nilaiPivot[0], mapelKey)) {
			const row = nilaiPivot.map((item) => ({
				kelas_id: item.kelas_id,
				mapel_id: mapelKey,
				nilai: item[mapelKey] || null,
			}));
			result = result.concat(row);
		}
	});
	return result;
}

async function onSubmit() {
	const nilai = arrayNilaiMapel({
		nilaiPivot: nilaiPivot.value,
		mapelIds: mapelIds.value,
	});
	const payload = {
		ujian_ke: parseInt(input.value.ujian_ke),
		kategori: input.value.category?.toLowerCase(),
		data: nilai,
	};

	// console.log('🚀 ~ onSubmit ~ payload:', payload);
	// return;

	try {
		loading.value = true;
		await NilaiMapel.create({
			data: payload,
		});
		step.value = 1;
	} catch (error) {
		console.error('🚀 ~ onSubmit ~ error:', error);
	} finally {
		loading.value = false;
	}
}

watch(inputFile, (newModel) => {
	if (!newModel) {
		nilaiPivot.value = [];
	}
});

watch(step, (newModel) => {
	if (newModel != 1) {
		if (!nilaiPivot.value.length) {
			step.value = 1;
		}
	}
});
</script>
<style lang="scss"></style>
