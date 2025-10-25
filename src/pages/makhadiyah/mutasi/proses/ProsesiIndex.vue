<template lang="">
	<CardPage>
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
		<q-card-section class="no-padding full-width row no-wrap justify-between items-start content-start scroll">
			<div class="col q-py-sm q-mx-sm" style="min-width: 400px">
				<DataLeft />
			</div>
			<div class="col q-py-sm q-mx-sm" style="min-width: 500px">
				<DataRight />
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
