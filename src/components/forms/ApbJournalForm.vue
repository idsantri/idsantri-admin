<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Jurnal" :is-new="isNew" />
			<q-card-section>
				<InputSelectAccount
					dense
					class="q-my-sm"
					outlined
					label="Jenis Akun"
					v-model="inputs.account_id"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<InputCurrency
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.debit"
					required
					label="Debit"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<InputCurrency
					dense
					class="q-my-sm"
					outlined
					v-model="inputs.kredit"
					required
					label="Kredit"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
			</q-card-section>
			<FormActions :btn-delete="false" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import InputCurrency from 'src/components/inputs/InputCurrency.vue';
import { notifyWarning } from 'src/utils/notify';
import InputSelectAccount from 'src/components/inputs/InputSelectAccount.vue';

const props = defineProps({
	data: { type: Object, required: true },
});
const emit = defineEmits(['successDelete', 'successSubmit', 'successUpdate', 'successCreate']);

const inputs = ref({ debit: 0, kredit: 0, ...props.data });
const isNew = !props.data?.temp_id;

const onSubmit = async () => {
	// select one debit or kredit
	if ((!inputs.value.debit && !inputs.value.kredit) || (inputs.value.debit && inputs.value.kredit)) {
		notifyWarning('Harap isi salah satu antara debit atau kredit!');
		return;
	}

	document.getElementById('btn-close-form')?.click();
	emit(isNew ? 'successCreate' : 'successUpdate', inputs.value);
};
</script>
