<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
			<q-toolbar class="q-px-sm" style="min-height: 0">
				<q-toolbar-title class="text-subtitle1 text-green-11">
					Data Kelas Baru &mdash;
					<span class="text-italic">Edit</span>
				</q-toolbar-title>
				<span class="text-italic text-caption"> Auto Update </span>
			</q-toolbar>
		</q-card-section>
		<q-card-section>
			<q-input
				:model-value="input.nama + ' (' + input.santri_id + ')'"
				class=""
				disable
				filled
				dense
				outlined
				label="Nama (ID)"
			/>
			<q-input
				:model-value="input.new_th_ajaran_h"
				class="q-mt-sm"
				disable
				filled
				dense
				outlined
				label="Tahun Ajaran (Baru) *"
			/>
			<InputSelectTingkatPendidikan
				v-model="input.new_tingkat_id"
				label="Tingkat Pendidikan (Baru) *"
				class="q-mt-sm"
				:selected="input.new_tingkat_id"
				:rules="[(val) => !!val || 'Harus diisi!']"
				:clearable="false"
			/>
			<input-select-array
				v-model="input.new_kelas"
				url="kelas"
				label="Kelas (Baru) *"
				class="q-mt-sm"
				:rules="[(val) => !!val || 'Harus diisi!']"
				:clearable="false"
			/>
			<q-input
				v-model="input.new_keterangan"
				class="q-mt-sm"
				dense
				outlined
				label="Keterangan (Baru)"
				:autogrow="true"
			/>
		</q-card-section>
		<q-card-actions align="right" class="bg-green-6">
			<q-btn
				label="Tutup"
				color="green-11"
				no-caps
				outline
				v-close-popup
			/>
		</q-card-actions>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});
const input = ref(props.data);
</script>
<style lang=""></style>
