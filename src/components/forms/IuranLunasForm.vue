<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Set Iuran Lunas" :is-new="false" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					disable
					label="Nama"
					v-model="input.nama"
					dense
					outlined=""
					class="q-my-sm"
				/>
				<q-input
					disable
					label="Tahun Ajaran"
					v-model="input.th_ajaran_h"
					dense
					outlined=""
					class="q-my-sm"
				/>
				<q-input
					disable
					label="Nama Iuran"
					v-model="input.item"
					dense
					outlined=""
					class="q-my-sm"
				/>
				<InputCurrency
					disable
					dense
					class="q-my-sm"
					outlined
					v-model="input.nominal"
					required
					label="Nominal"
				/>
				<InputSelectArray
					v-model="input.via"
					url="metode-pembayaran"
					label="Via"
					class="q-my-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
			</q-card-section>
			<FormActions :btn-delete="false" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import InputCurrency from '../inputs/InputCurrency.vue';
import Iuran from 'src/models/Iuran';

const props = defineProps({
	data: { type: Object, required: true },
});

const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const input = ref({ ...props.data });
const loading = ref(false);

const onSubmit = async () => {
	try {
		loading.value = true;

		const response = await Iuran.setLunas({
			id: props.data.id,
			data: { via: input.value.via },
			message: 'Iuran/tagihan lunas?',
		});

		if (response) {
			document.getElementById('btn-close-form').click();
			emit('successSubmit', response?.iuran);
			emit('successUpdate', response?.iuran);
		}
	} catch (error) {
		console.error('err set lunas ', error);
	} finally {
		loading.value = false;
	}
};
</script>
