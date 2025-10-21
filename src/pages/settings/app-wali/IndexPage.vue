<template lang="">
	<q-page class="q-pa-sm">
		<q-card>
			<CardHeader title="Pengaturan Aplikasi Wali Santri" :showReload="false" />
			<q-card-section class="q-pa-sm">
				<q-tabs
					v-model="tab"
					inline-label
					outside-arrows
					mobile-arrows
					indicator-color="green-13"
					active-color="green-11"
					align="left"
					class="bg-green-7 text-green-3 q-mb-sm"
				>
					<q-tab name="banner" label="Banner" no-caps />
					<q-tab name="cs" label="Nomor CS" no-caps />
					<q-tab name="profil" label="Profil" no-caps />
					<!-- <q-space />
					<q-btn
						color="green-11"
						flat
						icon="sync"
						dense
						class="q-mr-sm"
						disabled
					/> -->
				</q-tabs>
				<q-tab-panels v-model="tab" animated class="rounded-borders q-card--bordered">
					<q-tab-panel name="banner" class="q-pa-sm">
						<PanelBanner />
					</q-tab-panel>
					<q-tab-panel name="cs" class="q-pa-sm">
						<PanelCs />
					</q-tab-panel>

					<q-tab-panel name="profil" class="q-pa-sm">
						<PanelProfile />
					</q-tab-panel>
				</q-tab-panels>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import { ref } from 'vue';
import PanelProfile from './PanelProfile.vue';
import PanelCs from './PanelCs.vue';
import PanelBanner from './PanelBanner.vue';

const tab = ref('banner');
</script>
<style lang=""></style>
