<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="" style="min-width: 1200px">
			<CardHeader title="Modul Mutasi Domisili" :showReload="false">
				<template v-slot:right>
					<q-btn
						icon="visibility"
						label="Hasil Mutasi"
						dense
						outline
						no-caps
						class="q-ml-sm q-px-sm"
						to="/mutasi/result"
					/>
					<q-btn disable flat dense icon="more_vert" class="q-ml-sm" color="green-11" />
				</template>
			</CardHeader>
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
import CardHeader from 'src/components/cards/CardHeader.vue';
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
