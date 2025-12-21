<template>
	<q-card bordered flat>
		<q-card-section class="q-pa-sm text-subtitle2 bg-green-11 flex items-center">
			Data Santri
			<q-space />
			<q-btn icon="sync" dense outline="" size="sm" class="q-px-sm" @click="loadData" />
		</q-card-section>

		<q-card-section class="q-pa-sm">
			<q-list>
				<q-item class="no-padding">
					<q-item-section avatar>
						<q-skeleton v-if="loading || !id" type="" class="full-width full-height" />
						<q-img v-else :src="santri?.image_url || '/user-default.png'" :ratio="3 / 4" alt="santri" />
					</q-item-section>
					<q-item-section>
						<q-item-label overline>
							<q-skeleton v-if="loading || !id" type="text" />
							<div v-else>
								{{ santri.nama?.toUpperCase() }}
								({{ santri.id }})
							</div>
						</q-item-label>
						<q-item-label>
							<q-skeleton v-if="loading || !id" type="text" />
							<div v-else>{{ santri.data_akhir }}</div>
						</q-item-label>
						<q-item-label caption>
							<q-skeleton v-if="loading || !id" type="text" />
							<div v-else>{{ santri.alamat_pendek }}</div>
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-skeleton v-if="loading || !id" type="QBtn" class="full-width" />
						<q-btn
							v-else
							round
							dense
							glossy
							icon="info"
							no-caps
							class="q-px-sm bg-green-8 text-green-11"
							:to="`/santri/${santri.id}`"
						/>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
		<!-- <pre>{{ santri }}</pre> -->
	</q-card>
</template>
<script setup>
import Santri from 'src/models/Santri';
import santriStore from 'src/stores/santri-store';
import { ref, watchEffect } from 'vue';

const emit = defineEmits(['loaded']);
const props = defineProps({
	id: {
		type: [Number, String],
		// required: true,
		validator(value) {
			// Cek jika number langsung
			if (typeof value === 'number') {
				return !isNaN(value);
			}

			// Cek jika string yang bisa dikonversi ke number
			if (typeof value === 'string') {
				const num = Number(value);
				return !isNaN(num);
			}

			return false;
		},
	},
});

const loading = ref(false);
const santri = ref({});

const loadData = async () => {
	try {
		loading.value = true;

		const data = await Santri.getById({ id: props.id });

		santri.value = data.santri;

		//store
		santriStore().setSantri(data.santri);
		santriStore().setOrtu(data.ortu);
		santriStore().setWali(data.wali);
	} catch (error) {
		console.error('Error loading santri data:', error);
	} finally {
		loading.value = false;
	}
};

watchEffect(async () => {
	if (props.id) {
		const stored = santriStore().getSantri;
		if (stored.id == props.id) {
			santri.value = stored;
		} else {
			await loadData();
		}
		emit('loaded', santri.value);
	}
});
</script>
<style lang=""></style>
