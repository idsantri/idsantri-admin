<template lang="">
	<CardPage>
		<CardHeader title="Detail Pulangan" :show-reload="false" />
		<q-card-section class="tw:grid tw:grid-cols-1 tw:sm:flex tw:sm:justify-between tw:gap-2 q-pa-sm">
			<q-card bordered flat class="full-width">
				<q-form @submit.prevent="onSubmit">
					<FormLoading v-if="loading" />
					<q-card-section class="q-pa-sm">
						<q-input dense class="q-my-sm" outlined label="Pulangan" v-model="inputs.slug" filled disable />
						<q-input dense class="q-my-sm" outlined label="Nomor Surat" v-model="inputs.no_surat" />

						<q-input
							dense
							:hint="
								isDate(inputs.tgl_surat_m) ? formatDate(inputs.tgl_surat_m, 'cccc, dd MMMM yyyy') : ''
							"
							class="q-my-sm"
							outlined
							label="Tanggal Surat (M)*"
							v-model="inputs.tgl_surat_m"
							type="date"
							@change="
								isDate(inputs.tgl_surat_m)
									? (inputs.tgl_surat_h = masehiToHijri(inputs.tgl_surat_m))
									: (inputs.tgl_surat_h = '')
							"
							:rules="[(val) => !!val || 'Harus diisi!']"
							error-color="negative"
						/>
						<q-input
							dense
							:hint="inputs.tgl_surat_h?.length ? bacaHijri(inputs.tgl_surat_h) : ''"
							class="q-my-sm"
							outlined
							label="Tanggal Surat (H)*"
							v-model="inputs.tgl_surat_h"
							:rules="[(val) => !!val || 'Harus diisi!', (val) => val?.length == 8 || '8 digit angka!']"
							error-color="negative"
							mask="####-##-##"
						/>
						<q-input dense class="q-my-sm" outlined label="Jabatan" v-model="inputs.p_jabatan" />
						<q-input dense class="q-my-sm" outlined label="Nama" v-model="inputs.p_nama" />
					</q-card-section>
					<q-card-actions align="right" class="bg-green-7">
						<q-btn label="Simpan" type="submit" no-caps icon="save" class="bg-green-11" />
					</q-card-actions>
				</q-form>
			</q-card>
			<q-card bordered flat class="full-width">
				<DetailTeken :p_tt_url="pul?.p_tt_url || ''" :id="pul?.id" />
			</q-card>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-card bordered flat>
				<q-card-section class="q-pa-sm bg-green-7 text-green-11">Keterangan Surat Izin</q-card-section>
				<q-card-section class="q-pa-sm">
					<q-editor
						v-model="inputs.keterangan"
						min-height="12rem"
						:disable="loading"
						:definitions="{
							save: {
								tip: 'Save your work',
								icon: 'save',
								label: 'Simpan',
								handler: onSubmitKeterangan,
							},
						}"
						:toolbar="[
							['bold', 'italic', 'underline'],
							['undo', 'redo'],
							['unordered', 'ordered', 'outdent', 'indent'],
							['save'],
						]"
					/>
				</q-card-section>
			</q-card>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePulanganStore } from 'src/stores/pulangan-store';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { masehiToHijri, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDate } from 'src/utils/format-date';
import DetailTeken from './DetailTeken.vue';

const { id } = useRoute().params;
const store = usePulanganStore();
const { pulangan, loading } = storeToRefs(store);

const pul = computed(() => pulangan.value.find((p) => p.id == id || p.slug == id));
const inputs = ref(pul.value);

const onSubmit = async () => {
	const data = {
		no_surat: inputs.value.no_surat,
		tgl_surat_m: inputs.value.tgl_surat_m,
		tgl_surat_h: inputs.value.tgl_surat_h,
		p_jabatan: inputs.value.p_jabatan,
		p_nama: inputs.value.p_nama,
	};
	return await store.updateById(id, data);
};

const onSubmitKeterangan = async () => {
	return await store.updateById(id, { keterangan: inputs.value.keterangan });
};

watch(
	() => inputs.value.tgl_surat_h,
	(newValue, _oldValue) => {
		if (newValue?.length) {
			inputs.value.tgl_surat_h = newValue.replace(/-/g, '');
		}
	},
);
</script>
<style lang=""></style>
