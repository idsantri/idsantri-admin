<template lang="">
	<div>
		<div class="bg-green-1 text-green-10 text-overline text-center">Tabel Asrama (Total)</div>
		<q-markup-table flat bordered class="q-my-sm">
			<thead class="bg-green-2">
				<tr>
					<th>Asrama</th>
					<th class="text-right">Kasus</th>
					<th class="text-right">Point</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in asrama" :key="item.asrama" @click="rowClick(item)">
					<td class="text-center">{{ item.asrama }}</td>
					<td class="text-right">{{ item.total_kasus }}</td>
					<td class="text-right">{{ item.total_point }}</td>
				</tr>
			</tbody>
			<tfoot class="bg-green-1">
				<tr>
					<td class="text-center text-bold">Total</td>
					<td class="text-right text-bold">
						{{ total.totalKasus }}
					</td>
					<td class="text-right text-bold">
						{{ total.totalPoint }}
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

const total = computed(() => {
	const totalKasus = props.asrama.reduce((total, item) => total + parseInt(item.total_kasus), 0);
	const totalPoint = props.asrama.reduce((total, item) => total + parseInt(item.total_point), 0);
	return {
		totalKasus,
		totalPoint,
	};
});

const rowClick = (item) => {
	emit('rowClick', item);
};
</script>
<style lang=""></style>
