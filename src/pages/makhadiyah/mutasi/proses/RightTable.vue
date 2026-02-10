<template lang="">
	<q-markup-table flat bordered style="height: 530px">
		<thead>
			<tr>
				<th class="text-left">
					<q-btn
						icon="keyboard_double_arrow_left"
						dense
						color="green-10"
						glossy
						class="text-green-11"
						:disable="!santri.length"
						@click="falseAll"
					/>
				</th>
				<!-- <th class="text-center">ID Santri</th> -->
				<th class="text-left">Nama</th>
				<th class="text-left">Domisili Asal</th>
				<th class="text-left">Domisili Baru *</th>
				<th class="text-left">Keterangan</th>
				<th class="text-right">
					<q-btn icon="edit" dense flat disable color="green-10" />
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in santri" :key="index">
				<td class="text-left">
					<q-btn
						icon="arrow_left"
						dense
						outline
						color="green-10"
						glossy
						@click="mutasi.prosesFalse(item.id)"
					/>
				</td>
				<!-- <td class="text-center">
					{{ item.id }}
				</td> -->
				<td>
					{{ item.nama }}
				</td>
				<td>{{ item.domisili }}</td>
				<td>{{ item.new_domisili }}</td>
				<td>{{ item.new_keterangan ?? '-' }}</td>
				<td class="text-right">
					<q-btn icon="edit" dense flat color="green-10" @click="edit(item)" />
				</td>
			</tr>
		</tbody>
		<q-inner-loading :showing="loading || showing">
			<q-spinner-bars size="4em" color="green" />
		</q-inner-loading>
	</q-markup-table>
	<q-dialog v-model="showEdit">
		<EditNewDomisili :data="mutasiItem" />
	</q-dialog>
</template>
<script setup>
import { computed, ref, toRef } from 'vue';
import mutasiStore from 'src/stores/mutasi-store';
import EditNewDomisili from './EditMutasi.vue';

const props = defineProps({
	onLoading: { type: Boolean, default: false },
});

const mutasi = mutasiStore();
const santri = computed(() => mutasi.getProsesTrue());
const showing = ref(false);
const loading = toRef(() => props.onLoading);

const mutasiItem = ref({});
const showEdit = ref(false);

function falseAll() {
	const arrLength = santri.value.length;
	if (!arrLength) return;
	let counter = 0;

	showing.value = true;
	santri.value.forEach((m) => {
		// hanya animasi
		setTimeout(() => {
			mutasi.prosesFalse(m.id);
			counter++;
			// Cek apakah semua proses sudah selesai
			if (counter === arrLength) {
				showing.value = false;
			}
		}, 500);
	});
}

function edit(item) {
	// console.log(item);
	mutasiItem.value = item;
	showEdit.value = true;
}
</script>
<style lang=""></style>
