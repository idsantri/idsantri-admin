<template>
	<q-card bordered flat>
		<q-card-section
			class="q-pa-sm text-subtitle2 bg-green-11 flex items-center"
		>
			Data Santri
			<q-space />
			<q-btn
				icon="sync"
				dense
				outline=""
				size="sm"
				class="q-px-sm"
				@click="loadData"
			/>
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
							:src="santri?.image_url || '/user-default.png'"
							:ratio="3 / 4"
							alt="santri"
						/>
					</q-item-section>
					<q-item-section>
						<q-item-label overline>
							{{ santri.nama?.toUpperCase() }}
							({{ santri.id }})
						</q-item-label>
						<q-item-label>
							{{ santri.data_akhir }}
						</q-item-label>
						<q-item-label caption>
							{{ santri.alamat_pendek }}
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
import apiGet from 'src/api/api-get';
import santriStore from 'src/stores/santri-store';
import { ref, watchEffect } from 'vue';

const emit = defineEmits(['loaded']);
const props = defineProps({
	id: {
		type: [Number, String],
		required: true,
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
	const data = await apiGet({
		endPoint: 'santri/' + props.id,
		loading: loading,
	});
	if (data) {
		santri.value = data.santri;
		emit('loaded', santri.value);

		//store
		santriStore().setSantri(data.santri);
		santriStore().setOrtu(data.ortu);
		santriStore().setWali(data.wali);
	}
};

watchEffect(async () => {
	if (props.id) {
		const stored = santriStore().getSantri;
		if (stored.id == props.id) {
			santri.value = stored;
			emit('loaded', santri.value);
		} else {
			await loadData();
		}
	}
});
</script>
<style lang=""></style>
