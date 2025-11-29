<template>
	<router-view />
</template>

<script setup lang="ts">
import 'src/utils/rupiah';
import { onMounted, onUnmounted } from 'vue';
import useAuthStore from 'stores/auth-store';
import { useRouter } from 'vue-router';

defineOptions({
	name: 'App',
});

const auth = useAuthStore();
const router = useRouter();

/**
 * Listener untuk sinkronisasi logout antar tab.
 * Event 'storage' hanya trigger jika perubahan terjadi di TAB LAIN.
 */
const syncLogout = (event: StorageEvent) => {
	if (event.key === 'authTimestamp' && event.newValue === null) {
		console.log('🔄 Detected logout from another tab');
		auth.logout();

		//void: abaikan promise
		void router.push('/login');
	}
};

onMounted(() => {
	// 1. Inisialisasi session (cek expired atau valid)
	auth.initSession();

	// 2. Pasang event listener untuk multi-tab support
	window.addEventListener('storage', syncLogout);
});

onUnmounted(() => {
	// Cleanup
	auth.stopKeepAlive();
	window.removeEventListener('storage', syncLogout);
});
</script>
