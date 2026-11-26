<template>
	<q-btn-dropdown color="green-11" outline label="Cetak" class="q-mr-sm q-px-sm" dense no-caps aria-haspopup="menu">
		<q-list role="menu">
			<q-item v-close-popup @click="$emit('viewSuratTugas')" clickable dense>
				<q-item-section avatar>
					<q-avatar icon="print" color="" text-color="green-10" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Surat Tugas</q-item-label>
				</q-item-section>
			</q-item>
			<q-item v-close-popup @click="$emit('downloadSuratTugas')" clickable dense>
				<q-item-section avatar>
					<q-avatar icon="download" color="" text-color="green-10" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Surat Tugas</q-item-label>
				</q-item-section>
			</q-item>
			<q-separator />
			<q-item v-close-popup @click="null" clickable dense>
				<q-item-section avatar>
					<q-avatar icon="print" color="" text-color="green-10" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Kredensial Login</q-item-label>
				</q-item-section>
			</q-item>
			<q-separator />
			<q-item v-close-popup @click="$emit('viewSertifikat')" clickable dense>
				<q-item-section avatar>
					<q-avatar icon="print" color="" text-color="green-10" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Sertifikat</q-item-label>
				</q-item-section>
			</q-item>
			<q-item v-close-popup @click="$emit('downloadSertifikat')" clickable dense>
				<q-item-section avatar>
					<q-avatar icon="download" color="" text-color="green-10" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Sertifikat</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>
</template>
<script setup>
defineProps({
	gt: { type: Object },
});
</script>
<style lang=""></style>
