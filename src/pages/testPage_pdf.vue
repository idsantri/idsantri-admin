<template lang="">
	<q-btn label="show" @click="showPdf = true"></q-btn>

	<q-dialog v-model="showPdf">
		<q-card style="width: 100%; height: 90%">
			<q-card-section style="width: 100%; height: 100%" class="q-pa-sm">
				<iframe :src="srcPdf" style="width: 100%; height: 100%" loading="lazy" scrolling="no"></iframe>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>
<script setup>
import api from 'src/api';
import { ref } from 'vue';
const showPdf = ref(false);
const srcPdf = api.defaults.baseURL + '/reports/santri/registrasi/view?id=8000';
</script>
<style lang=""></style>
