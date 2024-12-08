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

				<q-btn
					round
					flat
					dense
					icon="search"
					color="green-1"
					to="/cari"
					class="text-green-11"
				>
					<!-- <q-badge v-if="badge" floating color="green-13" rounded /> -->
				</q-btn>

				<q-btn-dropdown
					flat
					round
					dense
					dropdown-icon="more_vert"
					class="q-pl-md"
					color="green-11"
				>
					<q-list>
						<q-item
							clickable
							v-close-popup
							name="install"
							@click="installApp"
							v-if="!pwaIsInstalled"
						>
							<q-item-section>Install</q-item-section>
							<q-item-section avatar>
								<q-icon color="green" name="install_mobile" />
							</q-item-section>
						</q-item>

						<q-item clickable v-close-popup to="/profile">
							<q-item-section>Profil</q-item-section>
							<q-item-section avatar>
								<q-icon color="green" name="3p" />
							</q-item-section>
						</q-item>

						<q-item clickable v-close-popup to="/logout">
							<q-item-section>Keluar</q-item-section>
							<q-item-section avatar>
								<q-icon color="red" name="logout" />
							</q-item-section>
						</q-item>
					</q-list>
				</q-btn-dropdown>
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
import { ref, onMounted, computed, toRefs } from 'vue';
import SideBar from 'components/SideBar.vue';
import config from 'src/config';
import ModalsMain from './comp/ModalsMain.vue';
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
import loadingStore from 'stores/loading-store';

const componentKey = ref(0);
const forceRerender = () => componentKey.value++;

const { loadingMain } = toRefs(loadingStore());

/**
 * ----------------------------------
 * PWA
 * ----------------------------------
 */
const deferredPrompt = ref(null);
onMounted(async () => {
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		deferredPrompt.value = e;
	});
});

const pwaIsInstalled = computed(() => {
	if (window.matchMedia('(display-mode:standalone)').matches) {
		console.log('this is standalone');
		return true;
	}
	console.log('this is not standalone');
	return false;
});

const installApp = async () => {
	deferredPrompt.value.prompt();
	const { outcome } = await deferredPrompt.value.userChoice;
	if (outcome === 'dismissed') {
		console.log('this is standalone');
		return true;
	}
};
</script>
<style lang="scss">
.spinner {
	text-align: center;
	margin: 30px auto;
}
</style>
