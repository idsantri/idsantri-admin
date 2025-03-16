<template>
	<q-page class="q-pa-sm">
		<q-toolbar class="bg-green-8 text-green-11 shadow-2 rounded-borders">
			<!-- <q-btn flat label="Homepage" /> -->
			<div class="text-subtitle1">Cari &hellip;</div>
			<q-space />
			<q-btn
				label="Excel"
				outline=""
				class="q-px-md"
				no-caps=""
				icon="download"
				dense
				to="/santri/export"
			/>
			<div class="q-px-sm"></div>
			<q-tabs shrink stretch class="text-green-11">
				<q-route-tab name="santri" label="Santri" to="santri" exact />
				<q-route-tab name="wali" label="Wali" to="wali" exact />
				<q-route-tab name="ortu" label="Ortu" to="ortu" exact />
			</q-tabs>
		</q-toolbar>

		<router-view class="q-mt-sm" />
		<!-- <q-tab-panels
			animated
			v-model="tab"
			class="bg-green-1 rounded-borders q-card--bordered q-pa-sm"
		>
			<q-tab-panel name="santri" class="no-padding">
				<santri-search />
			</q-tab-panel>

			<q-tab-panel name="wali" class="no-padding">
				<wali-search />
			</q-tab-panel>

			<q-tab-panel name="ortu" class="no-padding">
				<ortu-search />
			</q-tab-panel>
		</q-tab-panels> -->
	</q-page>
</template>

<script setup></script>
