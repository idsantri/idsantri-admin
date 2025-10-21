<template>
	<div class="" style="max-width: 600px">
		<q-card>
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
			</q-card-section>
		</q-card>
		<q-card class="q-mt-sm">
			<q-card-section class="bg-green-8 text-green-1 text-subtitle1 q-pa-sm">
				Tingkat Pendidikan: {{ modelTingkatId.val1 }}
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<div v-if="modelTingkatId">
					<div v-if="spinner" class="q-pa-md">
						<q-spinner-cube color="green-12" size="8em" class="flex q-mx-auto" />
					</div>
					<div v-else>
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
													listsBulanHijri.find((b) => Number(b.val2) == Number(item.bulan))
														?.val1 || ''
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
												listsBulanHijri.find((b) => Number(b.val2) == Number(newSetting.bulan))
													?.val1 || ''
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
			<q-card-section class="bg-green-7 text-green-1 text-caption text-italic q-pa-sm">
				Ujian (1, 2) jika menganut sistem semester atau kuartal (mid semester) <br />
				Ujian (1, 2, 3) jika menganut sistem catur wulan
			</q-card-section>
		</q-card>
	</div>
</template>
<script setup>
import apiDelete from 'src/api/api-delete';
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import { onMounted, ref } from 'vue';

const modelTingkatId = ref('');
const listsTingkatId = ref([]);
const listsBulanHijri = ref([{}]);
const bulanUjian = ref([{}]);
const loading = ref(false);
const spinner = ref(false);
const newSetting = ref({});

async function addSetting() {
	newSetting.value.tingkat_id = modelTingkatId.value.val0;
	const post = await apiPost({
		endPoint: 'absensi/settings',
		data: newSetting.value,
	});
	if (post) {
		newSetting.value = {};
		return fetchSetting(modelTingkatId.value.val0);
	}
}
async function deleteSetting(id) {
	const deleted = await apiDelete({
		endPoint: `absensi/settings/${id}`,
		loading: spinner,
	});
	if (deleted) return fetchSetting(modelTingkatId.value.val0);
}
async function submitUpdate(val) {
	await apiUpdate({
		endPoint: `absensi/settings/${val.id}`,
		data: {
			bulan: val.bulan,
			ujian: val.ujian,
			tingkat_id: val.tingkat_id,
		},
		loading: spinner,
		confirm: false,
	});
	await fetchSetting(val.tingkat_id);
}
async function fetchTingkat() {
	const data = await apiGet({
		endPoint: 'lists/tingkat-pendidikan',
		loading,
	});
	listsTingkatId.value = data.tingkat_pendidikan;
}

async function fetchHijri() {
	const data = await apiGet({
		endPoint: 'lists/bulan-hijri',
		loading,
	});
	listsBulanHijri.value = data.bulan_hijri;
}

async function fetchSetting(tingkatId) {
	const data = await apiGet({
		endPoint: `absensi/settings?tingkat_id=${tingkatId}`,
		loading: spinner,
	});
	bulanUjian.value = data.bulan_ujian;
	// console.log(data);
}

onMounted(async () => {
	await fetchTingkat();
	await fetchHijri();
});
</script>
