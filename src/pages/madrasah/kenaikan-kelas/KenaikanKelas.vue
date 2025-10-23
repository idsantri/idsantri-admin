<template lang="">
	<CardPage style="min-width: 1200px">
		<CardHeader title="Modul Kenaikan Kelas" :show-reload="false" />

		<q-card-section class="no-padding">
			<div class="row">
				<div class="col-6 q-pa-sm">
					<DataLeft />
				</div>
				<div class="col-6 q-pa-sm">
					<DataRight />
				</div>
			</div>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { onMounted } from 'vue';
import DataLeft from './DataLeft.vue';
import DataRight from './DataRight.vue';

onMounted(() => {
	// console.log(dataMurid.value);
	const toggle = document.getElementById('toggle-drawer');
	if (toggle) toggle.click();
});
</script>
<style lang=""></style>
