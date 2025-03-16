<template>
	<q-card bordered flat>
		<q-card-section class="q-pa-sm text-subtitle1 bg-green-11">
			Data Santri
		</q-card-section>

		<q-card-section class="q-pa-sm">
			<div v-if="loading">
				<q-spinner-cube
					color="green-12"
					size="4em"
					class="flex q-mx-auto"
				/>
			</div>
			<q-list v-else>
				<q-item class="no-padding">
					<q-item-section avatar>
						<q-img
							:src="data?.image || '/user-default.png'"
							:ratio="3 / 4"
							alt="santri"
						/>
					</q-item-section>
					<q-item-section>
						<q-item-label overline>
							{{ data.nama?.toUpperCase() }}
							({{ data.santri_id }})
						</q-item-label>
						<q-item-label>
							{{ data.data_akhir }}
						</q-item-label>
						<q-item-label caption>
							{{ data.alamat_pendek }}
						</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn
							round
							dense
							glossy
							icon="info"
							no-caps
							class="q-px-sm bg-green-8 text-green-11"
							:to="`/santri/${data.santri_id}`"
						/>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
	</q-card>
</template>
<script setup>
/**
 * @deprecated
 * TODO: DELETE IT
 * ganti dengan CardSantriSimple
 */

defineProps({
	data: Object,
	loading: Boolean,
});
</script>
<style lang=""></style>
