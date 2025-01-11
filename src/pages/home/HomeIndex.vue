<template>
	<q-page class="q-pa-sm">
		<logo-circle
			:size="150"
			:border="6"
			class="q-mx-auto"
			style="margin-top: 50px"
		/>
		<div class="text-center">
			<div class="text-subtitle1">Selamat Datang</div>
			<p class="text-green-10 text-subtitle2 no-margin">
				di <span class="text-weight-bold">ID Santri</span>
			</p>
			<p class="q-mt-sm q-mb-none text-italic">Sistem Informasi</p>
			<p class="no-margin">
				{{ config.INS_DESC }}
				{{ config.INS_NAME }}
			</p>
		</div>
	</q-page>
</template>
<script setup>
import { onMounted } from 'vue';
import LogoCircle from 'components/LogoCircle.vue';
import config from 'src/config';

onMounted(async () => {});
</script>

<style lang="scss" scoped></style>
