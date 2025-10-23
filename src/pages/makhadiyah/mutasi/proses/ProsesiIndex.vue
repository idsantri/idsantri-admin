<template lang="">
	<CardPage style="min-width: 1200px">
		<CardHeader title="Modul Mutasi Domisili" :showReload="false">
			<template v-slot:buttons>
				<q-btn
					icon="visibility"
					label="Hasil Mutasi"
					dense
					outline
					no-caps
					class="q-px-sm"
					to="/mutasi/result"
				/>
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
	</CardPage>
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
