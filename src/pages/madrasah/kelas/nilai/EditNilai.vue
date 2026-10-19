<template lang="">
	<div>
		<CardLoading :showing="loading" />
		<div class="q-pa-none">
			<q-card flat bordered class="tw:flex tw:items-center tw:w-full bg-transparent">
				<div class="q-px-sm tw:flex-grow text-italic">Nilai:</div>
				<div class="bg-green-2 q-pr-sm">
					<q-radio v-model="ujianKe" :val="1" label="ke-1" />
					<q-radio v-model="ujianKe" :val="2" label="ke-2" />
					<q-radio v-model="ujianKe" :val="3" label="ke-3" />
					<q-radio v-model="ujianKe" :val="4" label="ke-4" />
				</div>
				<div class="bg-green-11 q-pr-sm">
					<q-radio v-model="category" val="harian" label="Harian" />
					<q-radio v-model="category" val="ujian" label="Ujian" />
				</div>
			</q-card>
		</div>
		<div class="q-pa-none q-mt-sm">
			<q-card flat bordered class="">
				<q-card-section v-if="nilaiMapel.length == 0 && !loading" class="q-pa-sm text-italic">
					Pilih ujian ke-1, ke-2, ke-3, atau ke-4 untuk melihat nilai mapel pada ujian tersebut. <br />
					Pilih kategori harian atau ujian untuk melihat nilai harian atau nilai ujian.
				</q-card-section>
				<q-card-section v-else class="q-pa-none">
					<q-markup-table flat class="text-green-10">
						<thead>
							<tr>
								<th class="text-left">Mata Pelajaran</th>
								<th class="text-center">Harian</th>
								<th class="text-center">Ujian</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in nilaiMapel" :key="item.mapel_id">
								<td class="text-left">{{ item.mapel_name }}</td>
								<td class="text-center" style="width: 100px">
									<q-input
										input-class="text-center"
										outlined
										dense
										v-model="item.n_harian"
										:disable="category == 'ujian'"
										:filled="category == 'ujian'"
									/>
								</td>
								<td class="text-center" style="width: 100px">
									<q-input
										input-class="text-center"
										outlined
										dense
										v-model="item.n_ujian"
										:disable="category == 'harian'"
										:filled="category == 'harian'"
									/>
								</td>
							</tr>
						</tbody>
						<tfoot class="bg-green-11">
							<tr>
								<td class="text-right text-italic">Simpan Nilai</td>
								<td class="text-center">
									<q-btn
										label="Harian"
										color="green-6"
										@click="saveNilaiMapel"
										no-caps
										:disable="category == 'ujian'"
									/>
								</td>
								<td class="text-center">
									<q-btn
										label="Ujian"
										color="green-6"
										@click="saveNilaiMapel"
										no-caps
										:disable="category == 'harian'"
									/>
								</td>
							</tr>
						</tfoot>
					</q-markup-table>
				</q-card-section>
			</q-card>
			<!-- {{ nilaiMapel }} -->
		</div>
	</div>
</template>
<script setup>
import NilaiMapel from 'src/models/NilaiMapel';
import { ref, watchEffect } from 'vue';

const props = defineProps({
	kelasId: [String, Number],
});
const emit = defineEmits(['update:nilaiMapel']);
const category = ref('ujian');
const ujianKe = ref(null);
const nilaiMapel = ref([]);
const loading = ref(false);

const getNilaiMapel = async () => {
	if (!props.kelasId || !ujianKe.value) return;
	try {
		loading.value = true;
		const response = await NilaiMapel.getAll({
			params: { kelas_id: props.kelasId, ujian_ke: ujianKe.value },
			notifySuccess: false,
		});
		nilaiMapel.value = response.nilai_mapel;
		// console.log('🚀 ~ getNilaiMapel ~ response:', response);
	} catch (error) {
		console.error('Error fetching nilai mapel:', error);
	} finally {
		loading.value = false;
	}
};
watchEffect(() => {
	getNilaiMapel();
});

const saveNilaiMapel = async () => {
	const data = nilaiMapel.value.map((item) => ({
		kelas_id: item.kelas_id,
		mapel_id: item.mapel_id,
		nilai: category.value === 'harian' ? item.n_harian : item.n_ujian,
	}));
	const payload = {
		ujian_ke: ujianKe.value,
		kategori: category.value,
		data: data,
	};
	// console.log('🚀 ~ saveNilaiMapel ~ payload:', payload);
	// return;
	try {
		loading.value = true;
		await NilaiMapel.create({ data: payload });
		emit('update:nilaiMapel', category.value);
	} catch (error) {
		console.error('Error saving nilai mapel:', error);
	} finally {
		loading.value = false;
	}
};
</script>
<style lang=""></style>
