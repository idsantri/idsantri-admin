<template lang="">
	<div class="flex justify-between items-center">
		<div>
			<div class="text-italic text-weight-light">Nomor WA Customer Service:</div>
			<div v-if="isEdit">
				<q-form @submit.prevent="onSubmit" class="flex items-start q-gutter-x-sm">
					<q-input
						v-model="inputCs"
						outlined
						dense
						label="Nomor WA"
						:disable="loading"
						clearable
						placeholder="628xxxx"
						:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
					/>
					<q-btn
						type="submit"
						color="green-10"
						outline
						no-caps
						:disabled="loading"
						class="q-px-sm"
						:loading="loading"
						icon="save"
						label="Simpan"
					/>
				</q-form>
			</div>
			<div v-else>
				<div v-if="loading">
					<q-skeleton />
				</div>
				<div v-else-if="cs === '' || cs === null">
					<div class="">Belum diatur</div>
				</div>
				<div v-else>
					<div class="text-weight-bold">
						{{ cs.replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, '$1 $2-$3-$4') }}
					</div>
				</div>
			</div>
		</div>
		<q-btn
			dense
			class="q-px-sm"
			:icon="isEdit ? 'close' : 'edit'"
			outline
			:label="isEdit ? 'Batal' : 'Edit'"
			no-caps
			@click="onEdit"
		/>
	</div>
</template>
<script setup>
import ConfigApp from 'src/models/ConfigApp';
import { onMounted, ref } from 'vue';

const isEdit = ref(false);
const inputCs = ref('');
const loading = ref(false);
const cs = ref('');

async function fetchData() {
	try {
		loading.value = true;
		const data = await ConfigApp.getAppWali('cs');
		cs.value = data?.cs || '';
	} catch (_err) {
		console.error('🚀 ~ fetchData ~ _err:', _err);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await fetchData();
});

const onSubmit = async () => {
	try {
		loading.value = true;
		await ConfigApp.setAppWali({ cs: inputCs.value }, 'cs');
		cs.value = inputCs.value;
		isEdit.value = false;
	} catch (error) {
		console.error('🚀 ~ onSubmit ~ error:', error);
	} finally {
		loading.value = false;
	}
};

const onEdit = () => {
	inputCs.value = cs.value;
	isEdit.value = !isEdit.value;
};
</script>
<style lang=""></style>
