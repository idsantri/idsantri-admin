<template>
	<CardPage>
		<CardHeader title="Modul Laporan" :show-reload="false">
			<!-- <template #buttons>
				<q-tabs no-caps class="shadow-2 bg-green-9" dense rounded shrink stretch>
					<q-route-tab :to="{ path: 'config' }" replace label="Pengaturan" />
					<q-route-tab :to="{ path: 'gt' }" replace label="Guru Tugas" />
				</q-tabs>
			</template> -->
		</CardHeader>
		<q-card-section class="q-pa-sm"> <router-view /> </q-card-section>
	</CardPage>
</template>
<script>
export default {};
</script>
<style lang=""></style>
