<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar class="bg-green-9">
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleLeftDrawer"
					class="text-green-11"
					id="toggle-drawer"
				/>

				<q-toolbar-title class="text-green-11">
					ID Santri: {{ config.INS_SHORT }}
				</q-toolbar-title>

				<ToolbarButton />
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			bordered
			class="bg-green-7"
		>
			<suspense>
				<template #default>
					<side-bar />
				</template>
				<template #fallback>
					<div class="spinner">
						<q-spinner-cube color="green-8" size="8em" />
					</div>
				</template>
			</suspense>
		</q-drawer>

		<q-page-container :key="componentKey">
			<suspense>
				<template #default>
					<router-view :key="$route.fullPath" />
				</template>
				<template #fallback>
					<div class="spinner">
						<q-spinner-cube color="green-8" size="8em" />
					</div>
				</template>
			</suspense>
		</q-page-container>

		<!-- hidden elements -->
		<div style="display: none">
			<button @click="forceRerender" id="btn-force-rerender">
				rerender
			</button>
		</div>

		<!-- inject modal -->
		<modals-main />

		<div v-if="loadingMain">
			<q-dialog v-model="loadingMain" persistent>
				<q-spinner-cube
					color="green-12"
					size="8em"
					class="flex q-ma-lg q-mx-auto"
				/>
			</q-dialog>
		</div>

		<q-footer bordered class="bg-green-6 text-green-12">
			<p class="text-center no-margin q-pa-xs">© by idsantri</p>
			<!-- <q-btn
				label="loading"
				icon="user"
				@click="setLoadingSpinner(true)"
			/> -->
		</q-footer>
	</q-layout>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import loadingStore from 'stores/loading-store';
import config from 'src/config';
import SideBar from './comp/SideBar.vue';
import ModalsMain from './comp/ModalsMain.vue';
import ToolbarButton from './comp/ToolbarButton.vue';

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
const componentKey = ref(0);
const forceRerender = () => componentKey.value++;
const { loadingMain } = toRefs(loadingStore());
</script>

<style lang="scss">
.spinner {
	text-align: center;
	margin: 30px auto;
}
</style>
