<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Modul Paket" :is-new="true" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<input-select-santri-id
					:active-only="true"
					@emit-input="(val) => Object.assign(inputs, val)"
					:data="props.data"
					class="q-my-sm"
				/>
				<InputSelectTahunAjaran
					v-model="inputs.th_ajaran_h"
					:rules="[(val) => !!val || 'Harus diisi!']"
					class="q-my-sm"
					:disable="props.disableThAjaran"
					ref="firstInput"
				/>
				<InputSelectIuranPaket class="q-my-sm" @on-input="(v) => (paketIuran = v)" />
				<q-input label="Keterangan" v-model="inputs.keterangan" dense outlined="" class="q-my-sm" />
			</q-card-section>
			<FormActions :btn-delete="false" />
		</q-form>
	</q-card>
</template>
<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectIuranPaket from '../inputs/InputSelectIuranPaket.vue';
import Iuran from 'src/models/Iuran';
import InputSelectTahunAjaran from '../inputs/InputSelectTahunAjaran.vue';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
	title: { type: String, default: () => 'Input' },
});

const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ ...props.data });
const loading = ref(false);
const paketIuran = ref([]);
const firstInput = useTemplateRef('firstInput');

onMounted(async () => {
	await nextTick();
	if (firstInput.value) firstInput.value.focus();
});

const onSubmit = async () => {
	const paket = paketIuran.value.map((o) => {
		return { item: o.item, nominal: o.nominal };
	});

	const data = {
		santri_id: inputs.value.santri_id,
		th_ajaran_h: inputs.value.th_ajaran_h,
		keterangan: inputs.value.keterangan || '',
		paket: paket,
	};

	try {
		loading.value = true;

		const response = await Iuran.storePaketSantri({
			data,
			message: 'PERHATIAN<br/>Jika item iuran sudah terdapat dalam daftar maka akan diabaikan.',
		});

		if (response) {
			document.getElementById('btn-close-form').click();
			emit('successSubmit', response?.iuran);
			emit('successCreate', response?.iuran);
		}
	} catch (error) {
		console.error('err set paket iuran', error);
	} finally {
		loading.value = false;
	}
};
</script>

<style lang="scss"></style>
