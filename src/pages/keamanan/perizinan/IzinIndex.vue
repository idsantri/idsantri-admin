<template lang="">
	<CardPage>
		<CardHeader title="Data Izin Santri" :show-reload="false" :show-add="true" @on-add="crudShow = true">
			<template #more v-if="$q.screen.lt.sm">
				<q-list>
					<q-item v-close-popup to="/keamanan/izin-pesantren/statistik">
						<q-item-section>
							<q-item-label>Statistik</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="sym_o_bar_chart" flat />
						</q-item-section>
					</q-item>
				</q-list>
			</template>
			<template #buttons v-if="!$q.screen.lt.sm">
				<q-btn
					dense
					outline
					no-caps
					label="Statistik"
					icon="sym_o_bar_chart"
					to="/keamanan/izin-pesantren/statistik"
					class="q-px-sm"
				/>
			</template>
		</CardHeader>
		<q-card-section class="q-pa-sm">
			<router-view></router-view>
		</q-card-section>
		<q-dialog v-model="crudShow">
			<IzinPesantrenForm
				:data="{}"
				@success-delete="null"
				@success-submit="(v) => $router.push(`/keamanan/izin-pesantren/${v.id}`)"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import IzinPesantrenForm from 'src/components/forms/IzinPesantrenForm.vue';
import { ref } from 'vue';
const crudShow = ref(false);
</script>
<style lang=""></style>
