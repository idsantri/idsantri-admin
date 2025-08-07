<template>
	<Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
);

const props = defineProps({
	kamar: Array,
});

const total = computed(() => {
	return props.kamar.reduce((acc, item) => acc + item.jumlah, 0);
});

const chartData = computed(() => {
	const labels = props.kamar.map((item) => item.kamar);
	const data = props.kamar.map((item) => item.jumlah);
	const backgroundColor = generateColors(data.length);
	const total = props.kamar.reduce((acc, item) => acc + item.jumlah, 0);
	return {
		labels,
		datasets: [
			{
				label: 'Jumlah per Kamar',
				data,
				backgroundColor,
				borderColor: '#333',
				borderWidth: 1,
			},
		],
	};
});

const chartOptions = computed(() => ({
	responsive: true,
	plugins: {
		title: {
			display: true,
			text: `Jumlah Penghuni: ${total.value}`,
		},
		legend: {
			display: false,
		},
		tooltip: {
			callbacks: {
				title: (context) => `Kamar ${context[0].label}`,
				label: (context) => {
					const value = context.raw;
					const percentage = ((value / total.value) * 100).toFixed(1);
					return `${value} (${percentage}%)`;
				},
			},
		},
	},
	scales: {
		x: {
			title: {
				display: true,
				text: 'Kamar',
			},
		},
		y: {
			beginAtZero: true,
			title: {
				display: true,
				text: 'Jumlah Penghuni',
			},
		},
	},
}));

function generateColors(count) {
	return Array.from({ length: count }, (_, i) => {
		const hue = Math.floor((360 / count) * i);
		return `hsl(${hue}, 70%, 60%)`;
	});
}
</script>
