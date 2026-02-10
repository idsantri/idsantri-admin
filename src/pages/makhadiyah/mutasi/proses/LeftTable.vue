<template lang="">
	<q-markup-table flat bordered style="height: 530px">
		<thead>
			<tr>
				<th class="text-center">ID Santri</th>
				<th class="text-left">Nama</th>
				<th class="text-left">Domisili</th>
				<th class="text-left">Kelas</th>
				<th class="text-left">Tingkat</th>
				<th class="text-right">
					<q-btn
						icon="keyboard_double_arrow_right"
						dense
						color="green-10"
						glossy
						class="text-green-11"
						:disable="!santri.length"
						@click="trueAll"
					/>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in santri" :key="index">
				<td class="text-center">
					{{ item.id }}
				</td>
				<td>
					{{ item.nama }}
				</td>
				<td>{{ item.domisili }}</td>
				<td>{{ item.kelas }}</td>
				<td>{{ item.tingkat }}</td>
				<td class="text-right">
					<q-btn
						icon="arrow_right"
						dense
						outline
						color="green-10"
						glossy
						@click="mutasi.prosesTrue(item.id)"
					/>
				</td>
			</tr>
		</tbody>
		<q-inner-loading :showing="loading || showing">
			<q-spinner-bars size="4em" color="green" />
		</q-inner-loading>
	</q-markup-table>
</template>

<script setup>
import { computed, ref, toRef } from 'vue';
import mutasiStore from 'src/stores/mutasi-store';

const props = defineProps({
	onLoading: { type: Boolean, default: false },
});

const loading = toRef(() => props.onLoading);
const showing = ref(false);
const mutasi = mutasiStore();
const santri = computed(() => mutasi.getProsesFalse());

function trueAll() {
	const arrLength = santri.value.length;
	if (!arrLength) return;
	let counter = 0;

	showing.value = true;
	santri.value.forEach((m) => {
		// hanya animasi
		setTimeout(() => {
			mutasi.prosesTrue(m.id);
			counter++;
			// Cek apakah semua proses sudah selesai
			if (counter === arrLength) {
				showing.value = false;
			}
		}, 500);
	});
}
</script>

<style lang=""></style>
