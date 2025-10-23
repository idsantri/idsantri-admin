<template lang="">
	<q-btn-dropdown
		color="green-10"
		label="Filter By"
		no-caps
		class="text-green-11 q-px-md"
		dense
	>
		<q-list>
			<q-item class="q-pa-sm">
				<q-item-section>
					<q-item-label>
						<q-card flat style="width: 250px">
							<q-card-section class="no-padding text-subtitle1">
								Filter by Santri ID
							</q-card-section>
							<q-card-section class="no-padding">
								<InputSelectSantriId
									class="q-mt-sm"
									:active-only="false"
									@emit-input="
										(val) => Object.assign(input, val)
									"
									:data="{}"
								/>
							</q-card-section>
						</q-card>
					</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>
</template>
<script setup>
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const input = ref({ santri_id: null, nama: '' });
const router = useRouter();

watch(
	() => input.value.nama,
	(newValue) => {
		if (newValue?.length > 0 && input.value.santri_id) {
			// console.log(input.value);
			router.push(
				'/keamanan/indisipliner/santri/' + input.value.santri_id,
			);
		}
	},
);
</script>
<style lang=""></style>
