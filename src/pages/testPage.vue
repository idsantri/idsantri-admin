<template lang="">
	<q-page>
		<h1 v-if="loading">test page ...</h1>
		<q-btn @click="getById">Fetch by id</q-btn>
		<pre>{{ santri }}</pre>
		<q-btn @click="test">Test</q-btn>
		<q-btn @click="testLists">Test</q-btn>
	</q-page>
</template>
<script setup>
import { ref } from 'vue';
import ApiSantri from 'src/models/ApiSantri';
import ApiAddress from 'src/models/ApiAddress';
import ApiList from 'src/models/ApiList';

const santri = ref([]);
const loading = ref(false);

const getById = async () => {
	try {
		santri.value = [];
		loading.value = true;
		const { data } = await ApiSantri.getById(8000);
		santri.value = data.santri;
	} catch (_err) {
		// console.log('err ', _err);
	} finally {
		loading.value = false;
	}
};

const testLists = async () => {
	try {
		loading.value = true;
		const { data } = await ApiList.getByKey('tahun-ajaran');
		console.log(data);
	} finally {
		loading.value = false;
	}
};

const test = async () => {
	try {
		loading.value = true;
		const { data } = await ApiAddress.searchByParams({
			provinsi: 'jawa timur',
		});
		console.log(data);
	} finally {
		loading.value = false;
	}
};
</script>
<style lang=""></style>
