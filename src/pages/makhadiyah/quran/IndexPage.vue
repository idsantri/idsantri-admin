<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="">
			<CardHeader
				title="Modul Pendidikan Tajwid al-Quran"
				:showReload="false"
			>
			</CardHeader>
			<q-card-section class="q-pa-sm">
				<q-tabs dense align="left">
					<q-route-tab
						label="Santri"
						to="/quran/santri"
						exact
						no-caps
					/>
					<q-route-tab
						label="Mutaallim"
						to="/quran/mutaallim"
						exact
						no-caps
					/>
					<q-space />
					<q-btn label="Pengaturan" no-caps outline disabled />
				</q-tabs>
			</q-card-section>
			<q-card-section class="no-padding">
				<router-view />
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import CardHeader from 'src/components/CardHeader.vue';
</script>
<style lang=""></style>
