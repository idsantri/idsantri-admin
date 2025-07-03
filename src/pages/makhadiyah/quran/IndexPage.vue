<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="">
			<CardHeader
				title="Modul Pendidikan Tajwid al-Quran"
				:showReload="false"
			>
				<!-- <template v-slot:left>
					<q-btn
						dense
						color="green-11"
						glossy
						class="q-px-sm q-mr-sm text-green-10"
						label="Cetak"
						no-caps=""
						icon="print"
						to="/info/download"
					/>
				</template> -->
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
					<q-route-tab
						label="Muallim"
						to="/quran/muallim"
						exact
						no-caps
						disable
						title="Fitur belum siap!"
					/>
					<q-space />
					<q-btn
						dense
						color="green-11"
						glossy
						class="q-px-sm text-green-10"
						label="Cetak"
						no-caps=""
						icon="print"
						to="/info/download"
					/>
					<!-- <q-btn label="Pengaturan" no-caps outline disabled /> -->
				</q-tabs>
			</q-card-section>
			<q-separator />
			<q-card-section class="q-pa-sm">
				<router-view />
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import CardHeader from 'src/components/CardHeader.vue';
</script>
<style lang=""></style>
