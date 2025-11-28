<template lang="">
	<q-page>
		<h6 v-if="loading">loading page ...</h6>
		<q-btn @click="getById">Fetch by id</q-btn>
		<pre>{{ santri }}</pre>
		<q-btn @click="testAlamat">Alamat</q-btn>
		<q-btn @click="testLists">List</q-btn>

		<q-separator spaced="" class="q-my-lg" />
		<q-card>
			<q-card-section>
				<!-- <q-input dense outlined label="Test Input" v-model="input" class="q-my-sm" /> -->
				<InputToggle
					v-model="input"
					label="Test Input Toggle"
					:true-value="true"
					:false-value="false"
					class="q-my-sm"
				/>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import { ref } from 'vue';
import Santri from 'src/models/Santri';
import Alamat from 'src/models/Alamat';
import Lists from 'src/models/Lists';
import InputToggle from 'src/components/inputs/InputToggle.vue';

const santri = ref([]);
const loading = ref(false);
const input = ref(false);

const getById = async () => {
	try {
		santri.value = [];
		loading.value = true;
		const data = await Santri.getById({
			id: 800011,
		});
		if (data) {
			santri.value = data.santri;
		}

		// const res = await Santri._api.get('/santri/8000', {});
		// Santri._showSuccess('berhasil fetch by id');
		// console.log(res);
	} catch (_err) {
		console.error('err ', _err);
	} finally {
		loading.value = false;
	}
};

const testLists = async () => {
	try {
		loading.value = true;
		const { data } = await Lists.getByKey('tahun-ajaran');
		console.log(data);
	} finally {
		loading.value = false;
	}
};

const testAlamat = async () => {
	try {
		loading.value = true;
		const data = await Alamat.searchByParams({
			provinsi: 'jawa timur',
		});
		console.log(data);
	} finally {
		loading.value = false;
	}
};
</script>
<style lang=""></style>
