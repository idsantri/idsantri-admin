<template lang="">
	<div>
		<div class="bg-green-1 text-green-10 text-overline text-center">Tabel Asrama (Total)</div>
		<q-markup-table flat bordered class="q-my-sm">
			<thead class="bg-green-2">
				<tr>
					<th>Asrama</th>
					<th class="text-right">Izin</th>
					<th class="text-right">Disiplin</th>
					<th class="text-right">Terlambat</th>
					<th class="text-right">% Terlambat</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in tableData" :key="item.asrama" @click="rowClick(item)">
					<td class="text-center">{{ item.asrama }}</td>
					<td class="text-right">{{ item.totalIzin }}</td>
					<td class="text-right">{{ item.totalDisiplin }}</td>
					<td class="text-right">{{ item.totalLate }}</td>
					<td class="text-right">{{ item.persenLate }}%</td>
				</tr>
			</tbody>
			<tfoot class="bg-green-1">
				<tr>
					<td class="text-center text-bold">Total</td>
					<td class="text-right text-bold">
						{{ total.totalIzin }}
					</td>
					<td class="text-right text-bold">
						{{ total.totalDisiplin }}
					</td>
					<td class="text-right text-bold">
						{{ total.totalLate }}
					</td>
					<td class="text-right text-bold">
						{{ total.totalPersenLate }}
						%
					</td>
				</tr>
			</tfoot>
		</q-markup-table>
		<div class="q-pa-sm bg-green-2 text-center text-green-10">Klik baris untuk filter kamar</div>
	</div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
	asrama: Array,
});
const emit = defineEmits(['rowClick']);
const tableData = computed(() => {
	return props.asrama.map((item) => {
		const totalIzin = parseInt(item.total_izin);
		const totalLate = parseInt(item.total_late);
		const totalDisiplin = totalIzin - totalLate;
		const persenLate = totalIzin > 0 ? ((totalLate / totalIzin) * 100).toFixed(1) : 0;

		return {
			asrama: item.asrama,
			totalIzin,
			totalDisiplin,
			totalLate,
			persenLate,
		};
	});
});

const total = computed(() => {
	const totalLate = tableData.value.reduce((total, item) => total + item.totalLate, 0);
	const totalIzin = tableData.value.reduce((total, item) => total + item.totalIzin, 0);
	const totalDisiplin = totalIzin - totalLate;
	const totalPersenLate = totalIzin > 0 ? ((totalLate / totalIzin) * 100).toFixed(1) : 0;
	return {
		totalLate,
		totalIzin,
		totalDisiplin,
		totalPersenLate,
	};
});

const rowClick = (item) => {
	emit('rowClick', item);
};
</script>
<style lang=""></style>
