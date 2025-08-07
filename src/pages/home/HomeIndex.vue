<template>
	<q-page class="q-pa-sm">
		<div class="flex flex-center q-my-md">
			<logo-circle :border="6" class="q-mr-sm" :size="150" />
			<div class="q-ml-sm">
				<div style="font-size: 1.5em">Selamat Datang</div>
				<p class="text-green-10 no-margin" style="font-size: 2em">
					di <span class="text-weight-bold">ID Santri</span>
				</p>
				<p class="text-italic no-margin" style="font-size: 1.2em">
					Sistem Informasi
				</p>
				<p class="no-margin" style="font-size: 1.5em">
					{{ config.INS_DESC }}
					{{ config.INS_NAME }}
				</p>
			</div>
		</div>
		<StatistikDomisili />
	</q-page>
</template>
<script setup>
import LogoCircle from 'components/LogoCircle.vue';
import config from 'src/config';
import StatistikDomisili from './StatistikDomisili.vue';
</script>

<style lang="scss" scoped></style>
