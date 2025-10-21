<template lang="">
	<q-page class="q-pa-sm">
		<q-form @submit.prevent="onSubmit">
			<q-card class="q-mt-sm" style="max-width: 600px">
				<CardHeader title="Virtual Account Iuran Santri" @onReload="loadData" />

				<q-card-section class="q-pa-sm">
					<q-input
						dense
						class=""
						outlined
						label="Nama Bank (Singkatan)"
						placeholder="Contoh: BSI, BRI, BCA, Mandiri"
						v-model="va.bank"
						:loading="loading"
					/>
					<q-input
						dense
						class="q-mt-sm"
						outlined
						label="Prefix (Awalan) Nomor VA"
						v-model="va.prefix"
						:loading="loading"
						type="number"
					/>
					<q-input
						dense
						class="q-mt-sm"
						outlined
						label="Link Petunjuk Pembayaran VA"
						v-model="va.link_info_pembayaran"
						:loading="loading"
						type="url"
					/>
					<div class="text-caption q-mt-md">Informasi Tambahan</div>
					<q-editor
						v-model="va.info"
						min-height="10rem"
						:toolbar="[
							['left', 'center', 'right', 'justify'],
							['bold', 'italic', 'underline'],
						]"
						class="q-mt-sm"
						placeholder="Informasi Tambahan"
					/>
				</q-card-section>
				<q-card-actions align="right" class="bg-green-7">
					<q-btn label="Simpan" type="submit" no-caps icon="save" class="bg-green-11" />
				</q-card-actions>
				<CardLoading :showing="loading" />
			</q-card>
		</q-form>
	</q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';

const loading = ref(false);
// init data
const va = ref({});

async function loadData() {
	const data = await apiGet({
		endPoint: 'config/va',
		loading: loading,
	});
	Object.assign(va.value, data.va);
	// console.log(profile.value);
}

onMounted(async () => {
	await loadData();
});
async function onSubmit() {
	const data = JSON.parse(JSON.stringify(va.value));
	// console.log(data);
	const res = await apiPost({
		endPoint: 'config/va',
		data,
		loading,
	});
	if (!res) {
		await loadData();
	}
}
</script>
<style lang=""></style>
