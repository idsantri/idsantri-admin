<template lang="">
	<CardPage>
		<CardHeader title="Pengaturan Virtual Account Iuran Santri" :showReload="false" />
		<q-card-section class="q-pa-sm">
			<q-form @submit.prevent="onSubmit">
				<q-card class="" style="max-width: 600px" flat bordered>
					<q-card-section class="q-pa-sm bg-green-7 text-green-1"> Input VA</q-card-section>
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
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import ConfigApp from 'src/models/ConfigApp';

const loading = ref(false);
// init data
const va = ref({});

async function loadData() {
	try {
		loading.value = true;
		const data = await ConfigApp.getVA();
		va.value = data.va;
	} catch (err) {
		console.error('🚀 ~ loadData ~ _err:', err);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});

async function onSubmit() {
	try {
		loading.value = true;
		const data = JSON.parse(JSON.stringify(va.value));
		await ConfigApp.setVA(data);
	} catch (err) {
		console.error('🚀 ~ onSubmit ~ err:', err);
	} finally {
		loading.value = false;
	}
}
</script>
<style lang=""></style>
