<template>
	<CardPage>
		<CardHeader title="Modul Emaal" :show-reload="false" :show-add="false">
			<template #buttons>
				<q-card flat class="bg-green-6">
					<q-tabs shrink stretch dense no-caps active-bg-color="green-10">
						<q-route-tab name="data" label="Data" :to="{ query: { tab: 'data' }, replace: true }" />
						<q-route-tab
							name="santri"
							label="By Santri"
							:to="{ query: { tab: 'santri' }, replace: true }"
						/>
					</q-tabs>
				</q-card>
			</template>
		</CardHeader>
		<q-card-section class="q-pa-sm">
			<q-tab-panels v-model="tab" animated class="bg-transparent">
				<q-tab-panel name="data" class="no-padding"> <PanelData /> </q-tab-panel>
				<q-tab-panel name="santri" class="no-padding"> <PanelSantri /> </q-tab-panel>
			</q-tab-panels>
		</q-card-section>
	</CardPage>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import PanelData from './PanelData.vue';
import PanelSantri from './PanelSantri.vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const tab = ref('data');

watchEffect(() => {
	if (route.query.tab) {
		tab.value = route.query.tab;
	} else {
		router.push({
			path: router.currentRoute.value.path,
			query: { tab: tab.value },
			replace: true,
		});
	}
});
</script>
<style lang="scss"></style>
