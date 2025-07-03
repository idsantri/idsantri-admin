<template lang="">
	<q-page class="q-pa-sm">
		<q-card>
			<CardHeader title="Detail Personalia" :showReload="false">
			</CardHeader>
			<q-card-section class="row no-padding" style="max-width: 1200px">
				<div class="col-12 col-md-6 q-pa-sm">
					<CardIdentitas />
				</div>
				<div class="col-12 col-md-6 q-pa-sm">
					<CardJabatan />
				</div>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import CardHeader from 'src/components/CardHeader.vue';
import CardIdentitas from './CardIdentitas.vue';
import CardJabatan from './CardJabatan.vue';
</script>
<style lang=""></style>
