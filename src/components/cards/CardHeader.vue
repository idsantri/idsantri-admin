<template lang="">
	<q-card-section class="bg-green-8 text-green-11 q-pa-sm">
		<div class="tw:flex tw:items-center tw:justify-between tw:gap-2">
			<!-- child 1 -->
			<div class="text-subtitle2 tw:flex tw:items-center">
				<q-btn
					v-if="showReload"
					icon="sync"
					no-caps
					@click="$emit('onReload')"
					dense
					flat
					class="q-mr-xs"
					title="Muat ulang"
				/>
				<img v-else src="/idsantri.svg" class="q-mr-xs" style="height: 24px" title="ID Santri" />
				<div v-html="title"></div>
			</div>
			<!-- child 2 -->
			<div class="tw:flex tw:items-center tw:gap-2 tw:justify-end">
				<div class="tw:flex tw:items-center tw:gap-2">
					<slot name="buttons"> </slot>
				</div>
				<q-btn
					v-if="showBack"
					no-caps
					:label="$q.screen.lt.sm ? '' : 'Kembali'"
					icon="reply"
					dense
					class="q-px-sm"
					outline
					@click="$router.go(-1)"
					title="Kembali"
				/>
				<q-btn-dropdown
					flat
					no-caps
					class="text-green-11"
					dense
					dropdown-icon="more_vert"
					:disabled="!slotMore"
					title="Lainnya"
				>
					<slot name="more"></slot>
				</q-btn-dropdown>
			</div>
		</div>
	</q-card-section>
</template>
<script setup>
import { useSlots } from 'vue';

defineProps({
	showReload: { type: Boolean, default: true },
	showBack: { type: Boolean, default: true },
	title: { type: String, required: true },
});
const slots = useSlots();
const slotMore = !!slots.more;
</script>
<style lang=""></style>
