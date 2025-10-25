<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Permohonan Berhenti" :is-new="true" />

			<q-card-section class="q-pa-sm">
				<q-input dense class="q-my-sm" outlined label="Santri ID" v-model="santri.id" filled disable />
				<q-input dense class="q-my-sm" outlined label="Nama" v-model="santri.nama" filled disable />
				<q-select
					dense
					class="q-my-sm"
					outlined
					label="Tunggakan*"
					v-model="input.tunggakan"
					:options="['Lunas', 'Belum Lunas']"
					clearable
					use-input
					new-value-mode="add"
					behavior="menu"
				/>
				<q-select
					dense
					class="q-my-sm"
					outlined
					label="Jenis Permohonan*"
					v-model="input.jenis_permohonan"
					:options="['Berhenti', 'Cuti/Istirahat']"
					clearable
					use-input
					new-value-mode="add"
					behavior="menu"
				/>
				<q-input dense class="q-my-sm" outlined label="Alasan*" v-model="input.alasan" autogrow />
				<q-card class="" flat bordered>
					<q-card-section class="q-py-none q-px-sm">
						<div class="text-subtitle2 q-my-sm">Identitas Pemohon (Wali)</div>
						<q-input dense class="" outlined label="Nama*" v-model="input.wali_nama" />
						<q-input dense class="q-my-sm" outlined label="Nomor Telepon" v-model="input.wali_no_telepon" />
						<q-select
							dense
							class="q-my-sm"
							outlined
							label="Bukti Diri"
							v-model="input.wali_bukti_diri"
							:options="['KTP', 'SIM']"
							clearable
							use-input
							new-value-mode="add"
							behavior="menu"
						/>
						<q-input
							dense
							class="q-my-sm"
							outlined
							label="Nomor / ID Bukti Diri"
							v-model="input.wali_bukti_diri_id"
						/>
						<q-select
							dense
							class="q-my-sm"
							outlined
							label="Status*"
							v-model="input.wali_status"
							:options="['Wali', 'Wakil Wali']"
							clearable
							use-input
							new-value-mode="add"
							behavior="menu"
						/>
						<input-select-array
							v-model="input.wali_hubungan"
							url="hubungan-wali"
							label="Hubungan*"
							class="q-my-sm"
							use-input=""
							new-value-mode="add"
						/>
					</q-card-section>
				</q-card>
			</q-card-section>
			<FormActions :btn-delete="false" labelSubmit="Cetak" iconSubmit="print" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import { notifyError } from 'src/utils/notify';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const emit = defineEmits(['successSubmit']);
const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});

const input = ref({ jenis_permohonan: 'Berhenti', tunggakan: 'Lunas' });
const santri = ref({ ...props.data });

async function onSubmit() {
	const obj = JSON.parse(JSON.stringify(input.value));
	if (
		!obj.tunggakan ||
		!obj.jenis_permohonan ||
		!obj.alasan ||
		!obj.wali_nama ||
		!obj.wali_status ||
		!obj.wali_hubungan
	) {
		return notifyError('Isian tidak lengkap');
	}
	obj.id = santri.value.id;

	emit('successSubmit', obj);
	document.getElementById('btn-close-form')?.click();
}
</script>
<style lang=""></style>
