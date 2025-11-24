<template>
	<q-card flat bordered class="container">
		<div class="chart-container" style="position: relative; min-height: 400px">
			<Bar :data="chartData" :options="chartOptions" />
		</div>
	</q-card>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
	asrama: Array,
});
const emit = defineEmits(['slice-click']);

const chartData = computed(() => {
	const labels = props.asrama.map((item) => `Asrama ${item.asrama}`);

	return {
		labels: labels,
		datasets: [
			{
				label: 'Total Terlambat',
				data: props.asrama.map((item) => parseInt(item.total_late)),
				backgroundColor: 'lightcoral', // red
			},
			{
				label: 'Total Disiplin',
				data: props.asrama.map((item) => {
					const totalIzin = parseInt(item.total_izin);
					const totalLate = parseInt(item.total_late);
					return totalIzin - totalLate;
				}),
				backgroundColor: '#00FA9A', // green
			},
		],
	};
});
const title = computed(
	() =>
		'Data Izin dan Keterlambatan per Asrama' +
		(props.asrama?.length > 0 ? ` (${props.asrama[0]?.th_ajaran_h} H)` : ''),
);

const chartOptions = computed(() => ({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: title.value,
		},
		tooltip: {
			callbacks: {
				footer: (tooltipItems) => {
					const index = tooltipItems[0].dataIndex;
					const totalIzin = parseInt(props.asrama[index].total_izin);
					return `Total Izin: ${totalIzin}`;
				},
			},
		},
	},
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
			beginAtZero: true,
			title: {
				display: true,
				text: 'Jumlah',
			},
		},
	},
	onClick: (event, elements) => {
		if (elements.length > 0) {
			const index = elements[0].index;
			// console.log('🚀 ~ props.asrama[index]:', props.asrama[index]);
			emit('slice-click', props.asrama[index]);
		} else {
			emit('slice-click', null);
		}
	},
}));
</script>

<style scoped>
.container {
	width: 100%;
}

.chart-container {
	width: 100%;
}
</style>
