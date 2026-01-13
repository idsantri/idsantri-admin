<template lang="">
	<q-card class="" flat bordered>
		<q-card-section class="q-pa-sm bg-green-7">
			<q-toolbar class="no-padding text-green-11" style="min-height: 0">
				<q-toolbar-title class="text-subtitle1"> Kelas Baru </q-toolbar-title>
				<q-btn icon="sync" dense flat class="q-mr-xs" @click="resetRight" />
			</q-toolbar>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<HeadRight />
		</q-card-section>
		<q-separator />
		<q-card-section class="q-pa-sm">
			<q-markup-table flat bordered style="height: 500px">
				<thead>
					<tr>
						<th class="text-left">
							<q-btn
								icon="keyboard_double_arrow_left"
								dense
								color="green-10"
								glossy
								class="text-green-11"
								:disable="!muridTrue.length"
								@click="falseAll"
							/>
						</th>
						<th class="text-left">Nama</th>
						<th class="text-left">Domisili</th>
						<th class="text-left">Tingkat*</th>
						<th class="text-left">Kelas*</th>
						<th class="text-left">Keterangan</th>
						<th class="text-right">
							<q-btn icon="edit" dense flat disable color="green-10" />
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in muridTrue" :key="index">
						<td class="text-left">
							<q-btn
								icon="arrow_left"
								dense
								outline
								color="green-10"
								glossy
								@click="kenaikan.prosesFalse(item.id)"
							/>
						</td>
						<td>{{ item.nama }}</td>
						<td>{{ item.domisili }}</td>
						<td>
							{{ item.new_tingkat_id }}
						</td>
						<td>
							{{ item.new_kelas }}
						</td>
						<td>
							{{ item.new_keterangan || '-' }}
						</td>
						<td class="text-right">
							<q-btn icon="edit" dense flat color="green-10" @click="edit(item)" />
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
				Total: {{ muridTrue.length }} murid<br />
				Pastikan data sudah benar-benar valid (kesalahan akan sulit diperbaiki).
			</div>
			<q-space />
			<div>
				<q-btn
					label="Proses"
					no-caps
					icon="save"
					color="green-10"
					class="text-green-11"
					:disable="!muridTrue.length > 0"
					@click="onSubmit"
				/>
			</div>
		</q-card-actions>
	</q-card>
	<q-dialog v-model="showEdit">
		<EditNewMurid :data="muridItem" />
	</q-dialog>
</template>
<script setup>
import { computed, ref } from 'vue';
import HeadRight from './HeadRight.vue';
import kenaikanKelasStore from 'src/stores/kenaikan-kelas-store';
import EditNewMurid from './EditNewMurid.vue';
import { notifyConfirm } from 'src/utils/notify';
import Kelas from 'src/models/Kelas';

const kenaikan = kenaikanKelasStore();
const muridTrue = computed(() => kenaikan.getMuridTrue());
const loading = ref(false);
const showEdit = ref(false);
const muridItem = ref({});

function falseAll() {
	const arrLength = muridTrue.value.length;
	if (!arrLength) return;
	let counter = 0;

	loading.value = true;
	muridTrue.value.forEach((m) => {
		// hanya animasi
		setTimeout(() => {
			kenaikan.prosesFalse(m.id);
			counter++;

			// Cek apakah semua proses sudah selesai
			if (counter === arrLength) {
				loading.value = false;
			}
		}, 500);
	});
}

function resetRight() {
	kenaikan.resetNewFilter();
	falseAll();
}

function edit(item) {
	// console.log(item);
	muridItem.value = item;
	showEdit.value = true;
}

async function onSubmit() {
	let msg = '';
	msg += '<hr/>';
	msg += '<p style="margin:0">Tahun Ajaran Baru: <strong>' + muridTrue.value[0].new_th_ajaran_h + '</strong></p>';
	msg += '<hr/>';
	msg += 'Pastikan Anda sudah meneliti dengan seksama:';
	msg += `<ul style="margin:0">
		<li>— Tingkat Pendidikan</li>
		<li>— Kelas</li>
		</ul>
		`;
	msg += '<strong>Pada setiap barisnya!</strong>';
	const confirmed = await notifyConfirm(msg, true);
	if (!confirmed) {
		return;
	}
	const murid = muridTrue.value.map((v) => {
		return {
			santri_id: v.santri_id,
			th_ajaran_h: v.new_th_ajaran_h,
			tingkat_id: v.new_tingkat_id,
			kelas: v.new_kelas,
			keterangan: v.new_keterangan,
		};
	});

	try {
		loading.value = true;
		await Kelas.kenaikan({ murid });
		kenaikan.deleteTrueProses();
		kenaikan.newDataFilter.tingkat_id = '';
		kenaikan.newDataFilter.kelas = '';
	} catch (error) {
		console.error('🚀 ~ onSubmit ~ error:', error);
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
