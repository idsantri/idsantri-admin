<template>
	<q-page class="q-pa-sm flex column">
		<q-card
			ref="cardRef"
			class="card-page-container col column"
			:style="cardStyle"
		>
			<slot></slot>
		</q-card>
	</q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
	dynamicHeight: {
		type: Boolean,
		default: true,
	},
});

const cardRef = ref(null);
const minHeightPx = ref(0);

function calculateDynamicHeight() {
	if (!props.dynamicHeight) {
		minHeightPx.value = 0;
		return;
	}

	const header = document.querySelector('.q-header') || document.querySelector('header');
	const footer = document.querySelector('.q-footer') || document.querySelector('footer');

	const headerHeight = header ? header.offsetHeight : 0;
	const footerHeight = footer ? footer.offsetHeight : 0;

	// q-pa-sm pada q-page memberi padding 8px atas + 8px bawah = 16px
	const pagePaddingY = 16;
	const offset = headerHeight + footerHeight + pagePaddingY;

	minHeightPx.value = Math.max(0, window.innerHeight - offset);
}

const cardStyle = computed(() => {
	if (!props.dynamicHeight || minHeightPx.value <= 0) {
		return {};
	}
	return {
		minHeight: `${minHeightPx.value}px`,
	};
});

let resizeObserver = null;

onMounted(() => {
	nextTick(() => {
		calculateDynamicHeight();
		setTimeout(calculateDynamicHeight, 100);
		setTimeout(calculateDynamicHeight, 300);
	});

	window.addEventListener('resize', calculateDynamicHeight);

	if (typeof ResizeObserver !== 'undefined') {
		resizeObserver = new ResizeObserver(() => {
			calculateDynamicHeight();
		});
		const header = document.querySelector('.q-header') || document.querySelector('header');
		if (header) resizeObserver.observe(header);
	}
});

onUnmounted(() => {
	window.removeEventListener('resize', calculateDynamicHeight);
	if (resizeObserver) {
		resizeObserver.disconnect();
	}
});
</script>

<style lang="scss" scoped>
.card-page-container {
	background-color: rgb(224, 253, 242);
}
</style>
