<template lang="">
	<q-list>
		<q-item clickable v-close-popup @click="$emit('showPaket')">
			<q-item-section avatar>
				<q-icon name="local_atm" color="green" />
			</q-item-section>
			<q-item-section>
				<q-item-label>Pembayaran Paket</q-item-label>
				<!-- <q-item-label caption>Santri Baru Lunas</q-item-label> -->
			</q-item-section>
		</q-item>

		<!-- <q-item clickable v-close-popup to="/bendahara/iuran-old/atur-paket">
			<q-item-section avatar>
				<q-icon name="settings" color="green" />
			</q-item-section>
			<q-item-section>
				<q-item-label>Pengaturan</q-item-label>
			</q-item-section>
		</q-item> -->
	</q-list>
</template>
<script setup></script>
<style lang=""></style>
