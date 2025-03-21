<template lang="">
	<q-page class="">
		<div class="row" style="max-width: 1200px">
			<div class="col-xs-12 col-sm-6">
				<CardSantri class="q-ma-sm" :id="params.santri_id" />
			</div>

			<div class="col-xs-12 col-sm-6">
				<IndisiplinerRiwayat class="q-ma-sm" :santri_id="santri_id" />
			</div>
		</div>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CardSantri from 'components/santri/CardSantri.vue';
import IndisiplinerRiwayat from './IndisiplinerRiwayat.vue';

const { params } = useRoute();
const santri_id = ref(params.santri_id);

onMounted(async () => {
	santri_id.value = params.santri_id;
	// if (params.santri_id) await fetchData();
	// console.log(santri_id.value);
});
</script>
<style scoped></style>
