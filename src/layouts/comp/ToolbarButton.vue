<template lang="">
	<div :class="$q.screen.lt.sm ? 'hidden' : '' + 'text-green-11 q-px-sm'">
		<span>{{ user?.name }} </span>
		{{ ' ' }}
		<span class="text-caption">({{ user?.email }})</span>
	</div>
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
		<q-list clickable v-close-popup>
			<q-item name="install" @click="installApp" v-if="!pwaIsInstalled">
				<q-item-section>Install</q-item-section>
				<q-item-section avatar>
					<q-icon color="green" name="install_mobile" />
				</q-item-section>
			</q-item>

			<q-item to="/profile">
				<q-item-section>Profil</q-item-section>
				<q-item-section avatar>
					<q-icon color="green" name="3p" />
				</q-item-section>
			</q-item>

			<q-item to="/logout">
				<q-item-section>Keluar</q-item-section>
				<q-item-section avatar>
					<q-icon color="red" name="logout" />
				</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import useAuthStore from 'src/stores/auth-store';
const auth = useAuthStore();
const user = auth.getUser;

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
<style lang=""></style>
