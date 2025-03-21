<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Set Iuran Lunas" :is-new="false" />
			<q-card-section>
				<div v-if="loadingCrud">
					<q-dialog v-model="loadingCrud" persistent="">
						<q-spinner-cube
							color="green-12"
							size="8em"
							class="flex q-ma-lg q-mx-auto"
						/>
					</q-dialog>
				</div>
				<q-input
					disable
					label="Nama"
					v-model="input.nama"
					dense
					outlined=""
				/>
				<q-input
					disable
					label="Tahun Ajaran"
					v-model="input.th_ajaran_h"
					dense
					outlined=""
					class="q-mt-sm"
				/>
				<InputCurrency
					disable
					dense
					class="q-mt-sm"
					outlined
					v-model="input.nominal"
					required
					label="Nominal"
				/>
				<InputSelectArray
					v-model="input.via"
					url="metode-pembayaran"
					label="Via"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
			</q-card-section>
			<FormActions :btn-delete="false" />
		</q-form>
		<!-- <pre>{{ props.santri }}</pre> -->
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiUpdate from 'src/api/api-update';
import FormHeader from './FormHeader.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import FormActions from './FormActions.vue';
import InputCurrency from '../inputs/InputCurrency.vue';

const props = defineProps({
	data: { type: Object, required: true },
});

const emit = defineEmits(['successSubmit', 'successUpdate']);

const input = ref({});
const loadingCrud = ref(false);

onMounted(async () => {
	Object.assign(input.value, props.data);
	console.log('🚀 ~ onMounted ~ props.data:', props.data);
});

const onSubmit = async () => {
	const data = {
		via: input.value.via,
	};
	const response = await apiUpdate({
		endPoint: `iuran/${input.value.id}/lunas`,
		data,
		message: 'Iuran/tagihan lunas?',
		notify: true,
		loading: loadingCrud,
	});
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.iuran);
		emit('successUpdate', response?.iuran);
	}
};
</script>
