<template lang="">
	<q-card class="" flat bordered>
		<q-card-section class="q-pa-sm bg-green-7">
			<q-toolbar class="no-padding text-green-11" style="min-height: 0">
				<q-toolbar-title class="text-subtitle1"> Data Mutasi </q-toolbar-title>
				<q-btn icon="sync" dense flat class="q-mr-xs" @click="null" disable />
			</q-toolbar>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<div class="row">
				<q-select
					v-model="input.tingkat_id"
					label=""
					class="col no-padding q-mr-md"
					filled
					outlined
					dense
					disable
				/>
				<q-select v-model="input.kelas" label="" class="col no-padding" filled outlined dense disable />
			</div>
			<input-select-array
				v-model="input.domisili"
				url="domisili"
				label="Domisili Baru"
				class="q-mt-sm no-padding"
			/>
		</q-card-section>
		<q-separator />
		<q-card-section class="q-pa-sm">
			<TableRight :on-loading="loading" />
		</q-card-section>
		<q-separator />
		<q-card-actions class="bg-green-1">
			<div class="text-caption text-italic">
				Total: {{ santri?.length || 0 }} santri<br />
				Teliti kembali data domisili baru!
			</div>
			<q-space />
			<div>
				<q-btn
					label="Simpan"
					no-caps
					icon="save"
					color="green-10"
					class="text-green-11"
					@click="onSubmit"
					:disable="!santri.length > 0"
				/>
			</div>
		</q-card-actions>
	</q-card>
</template>
<script setup>
import { computed, ref } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import TableRight from './RightTable.vue';
import mutasiStore from 'src/stores/mutasi-store';
import { storeToRefs } from 'pinia';
import Mutasi from 'src/models/Mutasi';

const mutasi = mutasiStore();
const { newFilter: input } = storeToRefs(mutasi);
const santri = computed(() => mutasi.getProsesTrue());
const loading = ref(false);

async function onSubmit() {
	const map = santri.value.map((s) => {
		return {
			santri_id: s.santri_id,
			new_domisili: s.new_domisili,
			new_keterangan: s.new_keterangan,
		};
	});
	const data = { santri: map };
	try {
		loading.value = true;
		const create = await Mutasi.create({ data, confirm: true });
		if (create) {
			mutasi.deleteTrueProses();
		}
	} catch (error) {
		console.error('🚀 ~ onSubmit ~ error:', error);
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
