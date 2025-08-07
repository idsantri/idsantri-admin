<template>
	<div style="max-width: 500px; margin: auto">
		<div v-if="!loading && asrama.length">
			<ChartAsrama
				:asrama="asrama"
				:total="total"
				@slice-click="handleSliceClick"
			/>
			<ChartKamar :kamar="filtered" :total="total" />
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
const total = ref(0);
const filter = ref('');

onMounted(async () => {
	loading.value = true;
	const data = await apiGet({ endPoint: 'statistik/domisili', loading });
	if (data?.asrama) {
		asrama.value = data.asrama;
		kamar.value = data.kamar;
		total.value = data.asrama.reduce((sum, val) => sum + val.jumlah, 0);
	}
	loading.value = false;
});

const filtered = computed(() => {
	if (!filter.value) return kamar.value;
	return kamar.value.filter((item) => item.kamar.startsWith(filter.value));
});

function handleSliceClick(item) {
	filter.value = item.asrama;
}
</script>
