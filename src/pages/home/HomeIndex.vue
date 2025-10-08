<template>
	<q-page class="q-pa-sm">
		<div
			class="tw:flex tw:items-center tw:justify-center tw:flex-col tw:sm:flex-row tw:my-2 tw:text-xl"
		>
			<logo-circle :border="6" class="q-mr-sm" :size="150" />
			<div class="tw:text-center tw:sm:text-left tw:my-2">
				<div class="tw:font-light">Selamat Datang</div>
				<div class="text-green-10 tw:text-xl tw:-mt-1.5">
					di <span class="tw:font-semibold">ID Santri </span>
				</div>
				<div class="tw:text-lg tw:font-extralight">
					Sistem Informasi
				</div>
				<div class="tw:font-semibold tw:-mt-1.5">
					{{ config.INS_DESC }}
					{{ config.INS_NAME }}
				</div>
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
