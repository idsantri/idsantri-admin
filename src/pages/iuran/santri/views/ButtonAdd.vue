<template lang="">
	<q-btn-dropdown
		split
		dense
		label="Tambah"
		no-caps=""
		icon="add"
		color="green-10"
		padding="xs sm"
		text-color="green-11"
		@click="$emit('onAdd')"
	>
		<q-list>
			<q-item clickable v-close-popup @click="$emit('showPaket')" disable>
				<q-item-section avatar>
					<q-icon name="local_atm" color="green" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Pembayaran Paket</q-item-label>
					<!-- <q-item-label caption>Santri Baru Lunas</q-item-label> -->
				</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>
</template>
<script setup></script>
<style lang=""></style>
