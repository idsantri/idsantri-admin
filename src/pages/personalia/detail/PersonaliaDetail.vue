<template lang="">
	<q-page class="q-pa-sm">
		<q-card>
			<CardHeader title="Detail Personalia" :showReload="false">
				<template v-slot:left>
					<q-btn
						no-caps
						label="Personalia"
						icon="badge"
						dense
						color="green-13"
						class="q-px-md q-mr-sm text-green-10"
						to="/personalia"
					/>
				</template>
			</CardHeader>
			<q-card-section class="row no-padding" style="max-width: 1200px">
				<div class="col-12 col-md-6 q-pa-sm">
					<CardIdentitas @on-load="(val) => (aparatur = val)" />
				</div>
				<div class="col-12 col-md-6 q-pa-sm">
					<CardJabatan />
				</div>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import CardIdentitas from './CardIdentitas.vue';
import CardJabatan from './CardJabatan.vue';
import { provide, ref } from 'vue';

const aparatur = ref({});
provide('aparatur', aparatur);
</script>
<style lang=""></style>
