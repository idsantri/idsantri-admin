<template lang="">
	<div>
		<div class="bg-green-1 text-green-10 text-overline text-center">Tabel Kamar (Total)</div>
		<q-markup-table flat bordered class="q-my-sm">
			<thead class="bg-green-2">
				<tr>
					<th class="text-left">Kamar</th>
					<th class="text-right">Kasus</th>
					<th class="text-right">Point</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in kamar" :key="item.kamar" @click="rowClick(item)">
					<td class="text-center">{{ item.kamar }}</td>
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
	</div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
	kamar: Array,
});
const emit = defineEmits(['rowClick']);

const total = computed(() => {
	const totalKasus = props.kamar.reduce((total, item) => total + parseInt(item.total_kasus), 0);
	const totalPoint = props.kamar.reduce((total, item) => total + parseInt(item.total_point), 0);
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
