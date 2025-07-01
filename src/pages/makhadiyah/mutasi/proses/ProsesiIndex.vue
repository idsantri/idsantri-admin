<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="" style="min-width: 1200px">
			<q-card-section class="bg-green-8 text-green-11 q-pa-sm">
				<q-toolbar
					class="no-padding text-green-11"
					style="min-height: 0"
				>
					<q-toolbar-title class="text-subtitle1">
						Modul Mutasi Domisili
					</q-toolbar-title>
					<q-btn
						icon="visibility"
						label="Hasil Mutasi"
						dense
						outline
						no-caps
						class="q-mr-xs q-px-sm"
						to="/mutasi/result"
					/>
					<q-btn
						disable
						flat
						dense
						icon="more_vert"
						class="q-ml-md"
						color="green-11"
					/>
				</q-toolbar>
			</q-card-section>
			<q-card-section class="no-padding">
				<div class="row">
					<div class="col q-pa-sm">
						<DataLeft />
					</div>
					<div class="col q-pa-sm">
						<DataRight />
					</div>
				</div>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import DataLeft from './LeftCard.vue';
import DataRight from './RightCard.vue';
import { onMounted } from 'vue';

onMounted(() => {
	// console.log(dataMurid.value);
	const toggle = document.getElementById('toggle-drawer');
	if (toggle) toggle.click();
});
</script>
<style lang=""></style>
