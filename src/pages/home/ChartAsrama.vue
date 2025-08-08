<template>
	<Pie :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
	asrama: Array,
	total: Number,
});

const emit = defineEmits(['slice-click']);

const chartData = computed(() => {
	const labels = props.asrama.map((item) => item.asrama);
	const data = props.asrama.map((item) => item.jumlah);
	const backgroundColor = generateColors(data.length);

	return {
		labels,
		datasets: [
			{
				label: 'Jumlah per Asrama',
				data,
				backgroundColor,
				borderColor: '#ffffff',
				borderWidth: 2,
			},
		],
	};
});

const chartOptions = computed(() => ({
	responsive: true,
	plugins: {
		title: {
			display: false,
			text: `Jumlah Penghuni: ${props.total}`,
		},
		legend: {
			position: 'right',
			labels: {
				generateLabels: (chart) => {
					const { labels, datasets } = chart.data;
					const data = datasets[0].data;

					return labels.map((label, i) => {
						const value = data[i];
						const percentage = (
							(value / props.total) *
							100
						).toFixed(2);
						return {
							text: `${label}: ${value} (${percentage}%)`,
							fillStyle: datasets[0].backgroundColor[i],
							strokeStyle:
								datasets[0].borderColor?.[i] ||
								datasets[0].backgroundColor[i],
							lineWidth: 1,
							hidden: chart.getDatasetMeta(0).data[i].hidden,
							index: i,
						};
					});
				},
			},
		},
		tooltip: {
			callbacks: {
				title: (context) => {
					return `Asrama ${context[0].label}`;
				},
				label: (context) => {
					const value = context.raw;
					const percentage = ((value / props.total) * 100).toFixed(1);
					return `${value} (${percentage}%)`;
				},
			},
		},
	},
	onHover: (event, elements) => {
		if (elements.length > 0) {
			const index = elements[0].index;
			emit('slice-click', props.asrama[index]);
		} else {
			emit('slice-click', null);
		}
	},
}));

function generateColors(count) {
	return Array.from({ length: count }, (_, i) => {
		const hue = Math.floor((360 / count) * i);
		return `hsl(${hue}, 70%, 60%)`;
	});
}
</script>
