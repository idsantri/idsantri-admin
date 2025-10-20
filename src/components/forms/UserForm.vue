<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Update Profil" :is-new="false" />
			<FormLoading v-if="loading" />
			<q-card-section>
				<q-input
					class="q-my-sm"
					dense
					outlined
					label="Nama"
					v-model="inputs.name"
					hint=""
				/>
				<q-input
					class="q-my-sm"
					dense
					outlined
					label="Username"
					v-model="inputs.username"
					hint="Anda bisa login dengan username atau email"
				/>

				<q-input
					class="q-my-sm"
					dense
					outlined
					label="Nomor Telepon"
					v-model="inputs.phone"
					hint="08123456789"
				/>
			</q-card-section>
			<FormActions :btn-delete="false" />
		</q-form>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import User from 'src/models/User';

const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});
const inputs = ref({ ...props.data });
const loading = ref(false);

async function onSubmit() {
	const data = {
		username: inputs.value.username,
		name: inputs.value.name,
		phone: inputs.value.phone,
	};
	try {
		loading.value = true;

		const response = await User.update(data, true);

		if (response) {
			document.getElementById('btn-close-form')?.click();

			emit('successSubmit', response.user);
			emit('successUpdate', response.user);
		}
	} catch (_error) {
		// console.error('Error updating data:', error);
		// throw error;
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
