<template>
	<div class="tw:border tw:rounded-md tw:overflow-hidden">
		<div
			class="tw:text-center tw:font-light tw:text-2xl tw:py-2 bg-green-7 text-green-11"
		>
			Diagram Domisili Santri Aktif
		</div>
		<div v-if="!loading && asrama.length">
			<div
				class="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:max-w-md tw:mx-auto overflow-x-scroll tw:flex-wrap tw:md:flex-nowrap"
			>
				<ChartAsrama
					:asrama="asrama"
					:total="total"
					@slice-click="handleSliceClick"
				/>

				<ChartKamar :kamar="filtered" :total="total" />
			</div>
		</div>
		<p v-else>
			<q-spinner-cube
				color="green-12"
				size="10em"
				class="flex q-ma-lg q-mx-auto"
			/>
		</p>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import apiGet from 'src/api/api-get';
import ChartAsrama from './ChartAsrama.vue';
import ChartKamar from './ChartKamar.vue';

const loading = ref(false);
const asrama = ref([]);
const kamar = ref([]);
const filter = ref('');

const total = computed(() => {
	return asrama.value.reduce((sum, val) => sum + val.jumlah, 0);
});

onMounted(async () => {
	loading.value = true;
	const data = await apiGet({ endPoint: 'statistik/domisili', loading });
	if (data?.asrama) {
		asrama.value = data.asrama;
		kamar.value = data.kamar;
	}
	loading.value = false;
});

const filtered = computed(() => {
	if (!filter.value) return kamar.value;
	return kamar.value.filter((item) => item.kamar.startsWith(filter.value));
});

function handleSliceClick(item) {
	// console.log(item);
	filter.value = item?.asrama || '';
}
</script>
