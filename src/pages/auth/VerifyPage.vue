<template>
	<div>
		<div class="q-pa-xs" style="height: 12rem"></div>
		<q-spinner-cube v-show="showSpinner" color="green-12" size="14em" class="absolute-center" />
	</div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { toArray } from 'src/utils/array-object';
import { notifyAlert, notifyError } from 'src/utils/notify';
import axios from 'axios';

const emit = defineEmits(['title', 'errors']);
emit('title', 'Verifikasi Email');
emit('errors', []);

const showSpinner = ref(false);
const router = useRouter();
const params = ref(useRoute().query);
const query = JSON.parse(JSON.stringify(params.value));
const url = query['email-verify-url'];
const signature = query['signature'];

async function makeRequest() {
	const config = url + '&signature=' + signature;
	showSpinner.value = true;
	try {
		const { data } = await axios.request(config);
		await notifyAlert(data.message, 0);
		router.push({ name: 'Login' });
	} catch (error) {
		if (error.response.data.message) {
			toArray(error.response.data.message).forEach((message) => {
				notifyError(message);
			});
		} else {
			notifyError('Terjadi sebuah kesalahan');
		}
	} finally {
		showSpinner.value = false;
	}
}

onMounted(async () => {
	await makeRequest();
});
</script>
