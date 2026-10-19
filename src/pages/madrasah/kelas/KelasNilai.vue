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
			<InfoNilai />
		</q-dialog>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import EditNilai from './nilai/EditNilai.vue';
import PivotNilai from './nilai/PivotNilai.vue';
import InfoNilai from './nilai/InfoNilai.vue';

const tab = ref('ujian');
const route = useRoute();
const modeEdit = ref(false);
const showInfo = ref(false);
</script>
<style lang="scss" scoped></style>
