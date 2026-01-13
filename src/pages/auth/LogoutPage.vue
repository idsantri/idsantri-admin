<template>
	<div>
		<div class="q-pa-xs" style="height: 12rem"></div>
		<q-spinner-cube v-show="showSpinner" color="green-12" size="14em" class="absolute-center" />
	</div>
</template>
<script setup>
import authState from '../../stores/auth-store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { notifyConfirm, notifySuccess } from 'src/utils/notify';
import apiPost from 'src/api/apiPost';

const emit = defineEmits(['title', 'errors']);
emit('title', 'Keluar');
emit('errors', []);

const showSpinner = ref(true);
const router = useRouter();

onMounted(async () => {
	const confirmed = await notifyConfirm('Keluar dari Aplikasi?', true);
	if (confirmed) {
		try {
			const response = await apiPost({ endPoint: 'logout' });
			notifySuccess(response.message);
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			authState().logout();
			router.push('/login');
		}
	} else {
		router.go(-1);
	}
});
</script>
