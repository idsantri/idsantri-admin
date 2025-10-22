<template lang="">
	<q-page class="q-pa-sm">
		<q-card>
			<CardHeader title="Riwayat Izin" :show-reload="false" />
			<div class="row" style="max-width: 1200px">
				<div class="col-xs-12 col-sm-6">
					<div class="q-ma-sm">
						<CardSantri :id="params.santri_id" />
					</div>
				</div>

				<div class="col-xs-12 col-sm-6">
					<div class="q-ma-sm">
						<IzinRiwayat :santri_id="santri_id" />
					</div>
				</div>
			</div>
		</q-card>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import IzinRiwayat from './part/IzinRiwayat.vue';
import CardSantri from 'components/santri/CardSantri.vue';

const { params } = useRoute();
const santri_id = ref(params.santri_id);

onMounted(async () => {
	santri_id.value = params.santri_id;
	// if (params.santri_id) await fetchData();
	// console.log(santri_id.value);
});
</script>
<style scoped></style>
