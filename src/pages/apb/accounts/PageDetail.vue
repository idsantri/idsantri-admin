<template lang="">
	<CardPage>
		<CardHeader title="Detail Akun" @onReload="loadData" :show-edit="true"> </CardHeader>
		<q-card-section class="q-pa-sm">
			<pre>{{ account }}</pre>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import ApbAccount from 'src/models/ApbAccount';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const params = useRoute().params;
const loading = ref(false);
const account = ref(null);
const loadData = async () => {
	try {
		loading.value = true;
		const data = await ApbAccount.getById({ id: params.id });
		account.value = data.account;
	} catch (error) {
		console.error('Error loading data:', error);
	} finally {
		loading.value = false;
	}
};

onMounted(async () => {
	await loadData();
});
</script>
<style lang=""></style>
