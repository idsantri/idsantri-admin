<template lang="">
	<q-card class="">
		<q-card-section class="q-pa-sm bg-green-7">
			<q-toolbar class="no-padding text-green-11" style="min-height: 0">
				<q-toolbar-title class="text-subtitle1">
					Kelas Lama
				</q-toolbar-title>
				<q-btn
					icon="sync"
					dense
					flat
					class="q-mr-xs"
					@click="reload = !reload"
				/>
			</q-toolbar>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<HeadLeft :reload="reload" @on-loading="(v) => (loading = v)" />
		</q-card-section>
		<q-separator />
		<q-card-section class="q-pa-sm">
			<q-markup-table flat bordered style="height: 500px">
				<thead>
					<tr>
						<th class="text-center">No.</th>
						<th class="text-left">Nama</th>
						<th class="text-left">Domisili</th>
						<th class="text-right">
							<q-btn
								icon="keyboard_double_arrow_right"
								dense
								color="green-10"
								glossy
								class="text-green-11"
								:disable="!muridFalse.length"
								@click="trueAll"
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in muridFalse" :key="index">
						<td class="text-center">
							{{
								item.no_absen
									? String(item.no_absen).padStart(2, '0')
									: ''
							}}
						</td>
						<td>
							{{ item.nama }}
						</td>
						<td>{{ item.domisili }}</td>
						<td class="text-right">
							<q-btn
								icon="arrow_right"
								dense
								outline
								color="green-10"
								glossy
								@click="kenaikan.prosesTrue(item.id)"
							/>
						</td>
					</tr>
				</tbody>
				<q-inner-loading :showing="loading">
					<q-spinner-bars size="4em" color="green" />
				</q-inner-loading>
			</q-markup-table>
		</q-card-section>
		<q-separator />
		<q-card-actions class="bg-green-1">
			<div class="text-caption text-italic">
				Total: {{ muridFalse.length }} murid<br />
				Hanya menampilkan murid dengan Kelas = Aktif dan Status = Aktif
			</div>
			<q-space />
			<div>
				<!-- <q-btn
					disabled
					label="Reset"
					no-caps
					icon="history"
					color="green-10"
					class="text-green-11"
					@click="onReset"
					:disable="!muridFalse.length > 0"
				/>-->
			</div>
		</q-card-actions>
	</q-card>
</template>
<script setup>
import { computed, ref } from 'vue';
import HeadLeft from './HeadLeft.vue';
import kenaikanKelasStore from 'src/stores/kenaikan-kelas-store';

const reload = ref(false);
const loading = ref(false);
const kenaikan = kenaikanKelasStore();
const muridFalse = computed(() => kenaikan.getMuridFalse());

function trueAll() {
	const arrLength = muridFalse.value.length;
	if (!arrLength) return;
	let counter = 0;

	loading.value = true;
	muridFalse.value.forEach((m) => {
		// hanya animasi
		setTimeout(() => {
			kenaikan.prosesTrue(m.id);
			counter++;

			// Cek apakah semua proses sudah selesai
			if (counter === arrLength) {
				loading.value = false;
			}
		}, 500);
	});
}

// function onReset() {
// 	alert('Belum siap');
// }
</script>
<style lang=""></style>
