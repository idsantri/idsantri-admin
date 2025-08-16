<template lang="">
	<q-card flat bordered class="">
		<q-card-section class="bg-green-7 no-padding">
			<q-toolbar class="no-padding no-margin">
				<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11">
					Jabatan
				</q-toolbar-title>
				<q-tabs
					v-model="tab"
					narrow-indicator
					class="text-green-11"
					no-caps
					dense
				>
					<q-tab name="madrasah" label="Madrasah" />
					<q-tab name="quran" label="Quran" />
				</q-tabs>
			</q-toolbar>
		</q-card-section>
		<q-tab-panels v-model="tab" animated class="q-pa-sm">
			<q-tab-panel name="madrasah" class="no-padding">
				<CardJabatanMadrasah />
			</q-tab-panel>

			<q-tab-panel name="quran" class="no-padding">
				<CardJabatanQuran />
			</q-tab-panel>
		</q-tab-panels>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import CardJabatanMadrasah from './CardJabatanMadrasah.vue';
import CardJabatanQuran from './CardJabatanQuran.vue';
const tab = ref('madrasah');
</script>
<style lang=""></style>
