<template lang="">
	<CardPage>
		<CardHeader
			title="Detail Transaksi"
			:show-reload="true"
			@on-reload="loadData"
			:show-edit="true"
			@on-edit="null"
		/>
		<q-card-section class="q-pa-sm">
			<q-card bordered flat class="">
				<q-markup-table>
					<CardLoading :showing="loading" />

					<tbody class="">
						<tr>
							<td>ID</td>
							<td>{{ transaction?.id }}</td>
						</tr>
						<tr>
							<td>Tanggal</td>
							<td>{{ formatDate(transaction?.created_at, 'dd MMMM yyyy HH:mm') }}</td>
						</tr>
						<tr>
							<td>Tahun Ajaran</td>
							<td>{{ transaction?.th_ajaran_h }}</td>
						</tr>
						<tr>
							<td>Keterangan</td>
							<td>{{ transaction?.keterangan }}</td>
						</tr>
						<tr>
							<td>Nilai</td>
							<td>{{ transaction?.nilai?.toRupiah() }}</td>
						</tr>
						<tr>
							<td>Atas Nama</td>
							<td>{{ transaction?.atas_nama }}</td>
						</tr>
						<tr>
							<td>Catatan</td>
							<td>{{ transaction?.catatan }}</td>
						</tr>
					</tbody>
				</q-markup-table>
			</q-card>
		</q-card-section>
		<!-- <pre>{{ transaction }}</pre> -->
		<q-card-section class="q-pa-sm">
			<CardJournal
				:transactionId="params.id"
				@update:is-saved="(totalDebit) => (transaction.nilai = totalDebit)"
			/>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import ApbTransaction from 'src/models/ApbTransaction';
import { formatDate } from 'src/utils/format-date';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CardJournal from './journals/CardJournal.vue';

const loading = ref(false);
const transaction = ref(null);
const params = useRoute().params;

async function loadData() {
	try {
		loading.value = true;
		const data = await ApbTransaction.getById({ id: params.id });
		transaction.value = data.transaction;
	} catch (_err) {
		console.error('🚀 ~ loadData ~ _err:', _err);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});
</script>
<style lang=""></style>
