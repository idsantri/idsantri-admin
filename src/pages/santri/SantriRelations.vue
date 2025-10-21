<template>
	<q-card :key="keySantriRelations">
		<button @click="keySantriRelations++" id="btn-rerender-santri-relations" style="display: none">rerender</button>
		<q-tabs
			no-caps
			outside-arrows
			mobile-arrows
			class="bg-green-7 text-green-11 shadow-2"
			dense=""
			indicator-color="green-13"
			align="left"
		>
			<q-route-tab name="wali" label="Wali" :to="'/santri/' + props.santriId + '/wali'" />
			<q-route-tab name="ortu" label="Ortu" :to="'/santri/' + props.santriId + '/ortu'" />
			<q-route-tab name="status" label="Status" :to="'/santri/' + props.santriId + '/status'" />
			<q-route-tab name="kelas" label="Kelas" :to="'/santri/' + props.santriId + '/kelas'" />
			<q-route-tab name="domisili" label="Domisili" :to="'/santri/' + props.santriId + '/domisili'" />
			<!-- <q-route-tab
				name="iuran-total"
				label="Iuran"
				:to="'/santri/' + props.santriId + '/iuran-total'"
			/> -->
			<q-space />
			<!-- <q-btn
				label="Iuran"
				no-caps
				dense
				flat
				class="q-px-md"
				:to="'/bendahara/iuran/santri/' + props.santriId"
			/> -->

			<q-btn-dropdown flat dense dropdown-icon="more_vert" class="q-pl-md" color="green-11">
				<q-list>
					<q-item v-close-popup :to="'/iuran/santri/' + props.santriId">
						<q-item-section>
							<q-item-label>Iuran</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="payments" flat />
						</q-item-section>
					</q-item>
					<q-item v-close-popup :to="'/keamanan/izin-pesantren/santri/' + props.santriId">
						<q-item-section>
							<q-item-label>Izin Pesantren</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="transfer_within_a_station" flat />
						</q-item-section>
					</q-item>
					<q-item v-close-popup :to="'/keamanan/indisipliner/santri/' + props.santriId">
						<q-item-section>
							<q-item-label>Indisipliner</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="directions_run" flat />
						</q-item-section>
					</q-item>
				</q-list>
			</q-btn-dropdown>
		</q-tabs>
		<q-card-section class="q-pa-sm">
			<router-view />

			<!-- <router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view> -->
		</q-card-section>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({ santriId: { default: null } });
const keySantriRelations = ref(0);
</script>
