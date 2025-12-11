<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form>
			<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
				<q-toolbar class="q-px-sm" style="min-height: 0">
					<q-toolbar-title class="text-subtitle1 text-green-11">
						Data Domisili Baru &mdash;
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
					:model-value="input.tingkat + ' &mdash; ' + input.kelas"
					class="q-mt-sm"
					disable
					filled
					dense
					outlined
					label="Tingkat &mdash; Kelas"
				/>

				<q-input
					:model-value="input.domisili"
					class="q-mt-sm"
					disable
					filled
					dense
					outlined
					label="Domisili (Asal)"
				/>
				<input-select-array
					v-model="input.new_domisili"
					url="domisili"
					label="Domisili (Baru) *"
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
			<q-card-actions class="bg-green-6 flex">
				<q-space />
				<q-btn label="Tutup" v-close-popup class="bg-green-11" no-caps="" id="btn-close" />
			</q-card-actions>
			<q-inner-loading :showing="loading">
				<q-spinner-tail size="4em" color="green" />
			</q-inner-loading>
		</q-form>
	</q-card>
</template>
<script setup>
/**
 * TODO:
 * use pop up input
 * delete this file after use pop up input
 */
import { onMounted, ref } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});
const input = ref({});
const loading = ref(false);

onMounted(() => {
	input.value = props.data;
});
</script>
<style lang=""></style>
