<template lang="">
	<CardPage>
		<CardHeader title="Modul Kenaikan Kelas" :show-reload="false" />

		<q-card-section
			class="no-padding full-width row no-wrap justify-between items-start content-start scroll q-gutter-x-sm"
		>
			<div class="col q-py-sm" style="min-width: 400px">
				<DataLeft />
			</div>
			<div class="col q-py-sm" style="min-width: 500px">
				<DataRight />
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
