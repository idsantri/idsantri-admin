<template>
	<div>
		<div class="q-pa-xs" style="height: 12rem"></div>
		<q-spinner-cube v-show="showSpinner" color="green-12" size="14em" class="absolute-center" />
	</div>
</template>
<script setup>
// import { useQuasar } from 'quasar';
import authState from '../../stores/auth-store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { notifyConfirm } from 'src/utils/notify';
import apiPost from 'src/api/api-post';

const emit = defineEmits(['title', 'errors']);
emit('title', 'Keluar');
emit('errors', []);

const showSpinner = ref(true);
const router = useRouter();

onMounted(async () => {
	const confirmed = await notifyConfirm('Keluar dari Aplikasi?', true);
	if (confirmed) {
		await apiPost({ endPoint: 'logout' });
		authState().$reset();
		router.push('/login');
	} else {
		router.go(-1);
	}
});
</script>
