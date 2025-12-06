<template>
	<q-card class="" style="max-width: 600px" bordered flat>
		<q-card-section class="q-pa-sm">
			<q-select
				dense
				outlined
				label="Pilih Tingkat Pendidikan"
				v-model="modelTingkatId"
				:options="listsTingkatId"
				emit-value
				map-options
				option-label="val1"
				@update:model-value="(v) => fetchSetting(v.val0)"
				:loading="loading"
				behavior="menu"
			/>
			<q-card class="q-mt-sm">
				<q-card-section class="bg-green-7 text-green-1 text-subtitle1 q-pa-sm">
					Tingkat Pendidikan: {{ modelTingkatId.val1 }}
				</q-card-section>
				<q-card-section class="q-pa-sm">
					<div v-if="modelTingkatId">
						<div>
							<div v-for="item in bulanUjian" :key="item.id">
								<!-- <pre>{{ item }}</pre> -->
								<q-form @submit.prevent="submitUpdate(item)">
									<q-item class="no-padding">
										<q-item-section>
											<div class="row">
												<q-input
													label="Ujian Ke-?"
													class="col-3 q-pr-sm"
													dense
													outlined
													v-model="item.ujian"
													required
													mask="#"
													:rules="[
														(val) => !!val || 'Harus diisi!',
														(val) => (val >= 1 && val <= 3) || '1, 2, atau 3!',
													]"
												/>

												<q-input
													label="Bulan"
													class="col-3 q-pr-sm"
													dense
													outlined
													v-model="item.bulan"
													required
													mask="##"
													:rules="[
														(val) => !!val || 'Harus diisi!',
														(val) => (val >= 1 && val <= 12) || '1 hingga 12!',
													]"
												/>
												<q-input
													class="col-6"
													dense
													outlined
													:model-value="
														listsBulanHijri.find(
															(b) => Number(b.val2) == Number(item.bulan),
														)?.val1 || ''
													"
													readonly=""
												/>
											</div>
										</q-item-section>
										<q-item-section side class="no-padding q-ml-sm">
											<q-btn-group push class="q-mb-lg">
												<q-btn color="positive" glossy icon="save" type="submit" />
												<q-btn
													color="negative"
													glossy
													icon="delete"
													@click="deleteSetting(item.id)"
												/>
											</q-btn-group>
										</q-item-section>
									</q-item>
								</q-form>
							</div>
							<q-form @submit.prevent="addSetting" @reset="newSetting = {}">
								<q-item class="no-padding" style="justify-content: start">
									<q-item-section>
										<div class="row">
											<q-input
												label="Ujian Ke-?"
												class="col-3 q-pr-sm"
												dense
												outlined
												v-model="newSetting.ujian"
												required
												mask="#"
												:rules="[
													(val) => !!val || 'Harus diisi!',
													(val) => (val >= 1 && val <= 3) || '1, 2, atau 3!',
												]"
											/>

											<q-input
												label="Bulan"
												class="col-3 q-pr-sm"
												dense
												outlined
												v-model="newSetting.bulan"
												required
												mask="##"
												:rules="[
													(val) => !!val || 'Harus diisi!',
													(val) => (val >= 1 && val <= 12) || '1 hingga 12!',
												]"
											/>
											<q-input
												class="col-6"
												dense
												outlined
												readonly=""
												:model-value="
													listsBulanHijri.find(
														(b) => Number(b.val2) == Number(newSetting.bulan),
													)?.val1 || ''
												"
											/>
										</div>
									</q-item-section>
									<q-item-section side class="no-padding q-ml-sm">
										<q-btn-group push class="q-mb-lg">
											<q-btn color="positive" glossy icon="save" type="submit" />
											<q-btn color="negative" glossy icon="undo" type="reset" />
										</q-btn-group>
									</q-item-section>
								</q-item>
							</q-form>
						</div>
						<!-- {{ newSetting }} -->
					</div>
					<div v-else class="q-my-md text-center">Silakan pilih list tingkat pendidikan!</div>
				</q-card-section>
				<q-card-section class="bg-green-6 text-green-1 text-caption text-italic q-pa-sm">
					Ujian (1, 2) jika menganut sistem semester atau kuartal (mid semester) <br />
					Ujian (1, 2, 3) jika menganut sistem catur wulan
				</q-card-section>
				<CardLoading :showing="loading || spinner" />
			</q-card>
		</q-card-section>
	</q-card>
</template>
<script setup>
import AbsensiSetting from 'src/models/AbsensiSetting';
import Lists from 'src/models/Lists';
import { onMounted, ref } from 'vue';

const modelTingkatId = ref('');
const listsTingkatId = ref([]);
const listsBulanHijri = ref([{}]);
const bulanUjian = ref([{}]);
const loading = ref(false);
const spinner = ref(false);
const newSetting = ref({});

async function addSetting() {
	try {
		spinner.value = true;
		newSetting.value.tingkat_id = modelTingkatId.value.val0;
		await AbsensiSetting.create({ data: newSetting.value });
		newSetting.value = {};
		await fetchSetting(modelTingkatId.value.val0);
	} catch (error) {
		console.error('🚀 ~ addSetting ~ error:', error);
	} finally {
		spinner.value = false;
	}
}

async function deleteSetting(id) {
	try {
		spinner.value = true;
		await AbsensiSetting.remove({ id });
		await fetchSetting(modelTingkatId.value.val0);
	} catch (e) {
		console.error('🚀 ~ deleteSetting ~ e:', e);
	} finally {
		spinner.value = false;
	}
}

async function submitUpdate(val) {
	try {
		spinner.value = true;
		await AbsensiSetting.update({
			id: val.id,
			data: {
				bulan: val.bulan,
				ujian: val.ujian,
				tingkat_id: val.tingkat_id,
			},
		});
		await fetchSetting(val.tingkat_id);
	} catch (error) {
		console.error('🚀 ~ submitUpdate ~ error:', error);
	} finally {
		spinner.value = false``;
	}
}

async function fetchTingkat() {
	try {
		loading.value = true;
		const data = await Lists.getByKey('tingkat-pendidikan');
		listsTingkatId.value = data.tingkat_pendidikan;
	} catch (error) {
		console.log('error get list ', error);
	} finally {
		loading.value = false;
	}
}

async function fetchHijri() {
	try {
		loading.value = true;
		const data = await Lists.getByKey('bulan-hijri');
		listsBulanHijri.value = data.bulan_hijri;
	} catch (error) {
		console.log('error get list ', error);
	} finally {
		loading.value = false;
	}
}

async function fetchSetting(tingkat_id) {
	try {
		spinner.value = true;
		const data = await AbsensiSetting.getAll({ params: { tingkat_id } });
		bulanUjian.value = data.bulan_ujian;
	} catch (e) {
		console.error('🚀 ~ fetchSetting ~ e:', e);
	} finally {
		spinner.value = false;
	}
}

onMounted(async () => {
	await fetchTingkat();
	await fetchHijri();
});
</script>
