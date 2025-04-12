<template lang="">
	<q-page class="q-pa-sm">
		<q-card>
			<q-card-section
				class="q-pa-sm bg-green-8 text-green-11 text-subtitle1 flex"
			>
				Pengaturan Aplikasi Wali Santri
				<q-space />
				<q-btn
					no-caps
					label="Kembali"
					icon="reply"
					dense
					class="q-px-md"
					outline
					@click="$router.go(-1)"
				/>
			</q-card-section>
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
					<q-tab name="cs" label="Nomor CS" no-caps />
					<q-tab name="profil" label="Profil" no-caps />
					<q-tab name="banner" label="Banner" no-caps />
					<!-- <q-space />
					<q-btn icon="edit" label="Edit" /> -->
				</q-tabs>
				<div v-if="loading">
					<q-spinner-cube size="4em" class="flex q-ma-lg q-mx-auto" />
				</div>
				<q-tab-panels
					v-if="!loading"
					v-model="tab"
					animated
					class="rounded-borders q-card--bordered"
				>
					<q-tab-panel name="cs" class="q-pa-sm">
						<PanelCs
							:cs="appWali.cs"
							@onUpdate="(cs) => (appWali.cs = cs)"
						/>
					</q-tab-panel>

					<q-tab-panel name="profil" class="q-pa-sm">
						<PanelProfile
							:profile="appWali.profile"
							@onUpdate="(profile) => (appWali.profile = profile)"
						/>
					</q-tab-panel>

					<q-tab-panel name="banner" class="q-pa-sm">
						<PanelBanner
							:banner="appWali.banner"
							@onUpdate="(banner) => (appWali.banner = banner)"
						/>
					</q-tab-panel>
				</q-tab-panels>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiGet from 'src/api/api-get';
import PanelProfile from './PanelProfile.vue';
import PanelCs from './PanelCs.vue';
import PanelBanner from './PanelBanner.vue';

const tab = ref('cs');
const loading = ref(false);
const appWali = ref({
	cs: '',
	profile: '',
	banner: {},
});

async function loadData() {
	const data = await apiGet({
		endPoint: 'config/app-wali',
		loading: loading,
	});
	Object.assign(appWali.value, data.app_wali);
	// console.log(appWali.value);
}

onMounted(async () => {
	await loadData();
});
</script>
<style lang=""></style>
