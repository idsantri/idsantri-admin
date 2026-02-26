<template lang="">
	<q-card flat bordered class="bg-green-1">
		<q-tabs v-if="!modeEdit" no-caps outside-arrows mobile-arrows class="bg-green-2 text-green-10" v-model="tab">
			<q-tab name="harian" label="Harian" />
			<q-tab name="ujian" label="Ujian" />
			<q-tab name="rapor" label="Rapor" :disable="modeEdit" />
			<q-tab name="ijazah" label="Ijazah" :disable="modeEdit" />
			<q-space />
			<q-btn icon="info" flat class="" @click="showInfo = true" />
			<q-btn :icon="modeEdit ? 'edit_off' : 'edit'" flat class="q-mr-sm" @click="modeEdit = !modeEdit" />
		</q-tabs>
		<div v-else class="bg-green-2 text-green-10 flex items-center q-pa-sm">
			<div class="text-subtitle2">Input Nilai Mapel</div>
			<q-space />
			<q-btn icon="info" flat class="" @click="showInfo = true" />
			<q-btn :icon="modeEdit ? 'edit_off' : 'edit'" flat class="" @click="modeEdit = !modeEdit" />
		</div>
		<q-card-section class="q-pa-sm" v-if="!modeEdit">
			<PivotNilai :kelasId="route.params.id" :tab="tab" />
		</q-card-section>
		<q-card-section v-else class="q-pa-sm">
			<EditNilai
				:kelasId="route.params.id"
				@update:nilaiMapel="
					(category) => {
						tab = category;
						modeEdit = false;
					}
				"
			/>
		</q-card-section>

		<q-dialog v-model="showInfo">
			<q-card class="bg-green-1">
				<q-card-section class="q-pa-sm bg-green-8 text-green-11 flex items-center justify-between">
					<div class="text-subtitle1">Perhatian</div>
					<q-btn icon="close" flat class="" @click="showInfo = false" dense />
				</q-card-section>
				<q-card-section class="">
					<div>
						<div class="text-subtitle2">Kalkulasi Rerata Nilai Mapel</div>
						<div class="text-caption text-italic text-red-10">
							(Kosong (<strong>null</strong>) TIDAK sama dengan angka
							<strong>0</strong>)
						</div>

						<ul>
							<li>75 + 75 + 75 = 225 ÷ 3 = <strong>75</strong></li>
							<li>
								75 + 0 + 75 = 150 ÷ 3 = <strong>50</strong> &nbsp;
								<em>(0 tetap dihitung nilai, masuk pembagi)</em>
							</li>
							<li>
								75 + '' + 75 = 150 ÷ 2 = <strong>75</strong> &nbsp;
								<em>(Kosong ('') bukan nilai, tidak masuk pembagi)</em>
							</li>
						</ul>
					</div>
					<q-separator class="q-my-md" />
					<div class="">
						<div class="text-subtitle2">Kalkulasi Nilai Rapor dan Ijazah</div>
						<ul>
							<li>
								Dengan nilai harian: <br />
								<code> (((nilai_ujian + nilai_remedial) * 2) + nilai_harian) / 3 / 10 </code>
							</li>
							<li>
								Tanpa nilai harian: <br />
								<code> (nilai_ujian + nilai_remedial) / 10 </code>
							</li>
							<li>Berlaku standar nilai-minimal-rapor dan nilai-minimal-ijazah.</li>
						</ul>
					</div>
				</q-card-section>
			</q-card>
		</q-dialog>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import EditNilai from './nilai/EditNilai.vue';
import PivotNilai from './nilai/PivotNilai.vue';

const tab = ref('ujian');
const route = useRoute();
const modeEdit = ref(false);
const showInfo = ref(false);
</script>
<style lang="scss" scoped>
ul {
	padding-left: 1rem;
	list-style-type: disc;
}
code {
	background-color: #e0e0e0;
	padding: 4px 4px;
	border-radius: 4px;
	font-family: monospace;
	font-size: 0.9em;
}
</style>
