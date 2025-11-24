<template lang="">
	<div class="q-card--bordered rounded-borders">
		<q-tabs
			shrink
			stretch
			dense
			no-caps
			active-bg-color="green-6"
			active-color="green-11"
			indicator-color="green-8"
		>
			<q-route-tab
				name="santri"
				label="Santri"
				to="/keamanan/indisipliner/santri"
				:class="$route.path.startsWith('/keamanan/indisipliner/santri') ? 'bg-green-6 text-green-11' : ''"
			/>
			<q-route-tab
				name="thAjaran"
				label="Tahun Ajaran"
				to="/keamanan/indisipliner/th-ajaran"
				:class="$route.path.startsWith('/keamanan/indisipliner/th-ajaran') ? 'bg-green-6 text-green-11' : ''"
			/>
			<q-route-tab
				name="tanggal"
				label="Tanggal"
				to="/keamanan/indisipliner/tanggal"
				:class="$route.path.startsWith('/keamanan/indisipliner/tanggal') ? 'bg-green-6 text-green-11' : ''"
			/>
		</q-tabs>
	</div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
