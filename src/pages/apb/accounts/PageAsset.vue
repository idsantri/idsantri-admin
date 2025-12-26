<template lang="">
	<CardPage>
		<CardHeader title="Saldo Aktiva" @on-reload="reload" :show-add="false"> </CardHeader>
		<q-card-section class="q-pa-sm">
			<q-card bordered flat style="min-height: 300px">
				<CardLoading :showing="loading" />

				<q-list bordered separator>
					<q-item class="bg-green-11">
						<q-item-section>
							<q-item-label class="text-bold">Total</q-item-label>
						</q-item-section>
						<q-item-section class="text-right">
							<q-item-label class="text-bold"> {{ total.toRupiah() }} </q-item-label>
						</q-item-section>
						<q-item-section avatar> </q-item-section>
					</q-item>
					<q-item v-for="asset in assets" :key="asset.account_id">
						<q-item-section>
							<q-item-label overline>{{ asset.account_id }}</q-item-label>
							<q-item-label>{{ asset.account_group }}: {{ asset.account_nama }}</q-item-label>
						</q-item-section>
						<q-item-section class="text-right">
							<q-item-label caption> Saldo </q-item-label>
							<q-item-label class="">
								{{ asset.saldo.toRupiah() }}
							</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-btn color="info" icon="sym_o_info" dense flat :to="`/apb/accounts/${asset.account_id}`">
							</q-btn>
						</q-item-section>
					</q-item>
				</q-list>
			</q-card>
		</q-card-section>

		<!-- <pre>{{ assets }}</pre> -->
	</CardPage>
</template>
<script setup>
import ApbAccount from 'src/models/ApbAccount';
import { computed, onMounted, ref } from 'vue';

const assets = ref([]);
const loading = ref(false);
const total = computed(() => {
	return assets.value.reduce((acc, cur) => acc + Number(cur.saldo), 0);
});
async function reload() {
	try {
		loading.value = true;
		const data = await ApbAccount.assets();
		assets.value = data.assets;
	} catch (error) {
		console.error('🚀 ~ reload ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await reload();
});
</script>
<style lang=""></style>
