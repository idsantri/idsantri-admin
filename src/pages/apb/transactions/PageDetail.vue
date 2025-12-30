<template lang="">
	<CardPage>
		<CardHeader
			title="Detail Transaksi"
			:show-reload="true"
			@on-reload="reload"
			:show-edit="true"
			@on-edit="showForm = true"
		/>
		<q-card-section class="q-pa-sm q-gutter-y-sm" style="max-width: 1024px">
			<q-card bordered flat class="">
				<q-markup-table>
					<CardLoading :showing="loading" />

					<tbody class="">
						<tr>
							<td class="label">ID</td>
							<td>{{ transaction?.id }}</td>
						</tr>
						<tr>
							<td class="label">Tanggal</td>
							<td>{{ formatDate(transaction?.created_at, "dd MMMM yyyy', Pukul 'HH:mm") }}</td>
						</tr>
						<tr>
							<td class="label">Tahun Ajaran</td>
							<td>{{ transaction?.th_ajaran_h }}</td>
						</tr>
						<tr>
							<td class="label">Keterangan</td>
							<td>{{ transaction?.description }}</td>
						</tr>
						<tr>
							<td class="label">Nilai</td>
							<td>{{ transaction?.amount?.toRupiah() }}</td>
						</tr>
						<tr>
							<td class="label">Atas Nama</td>
							<td>{{ transaction?.by_name }}</td>
						</tr>
						<tr>
							<td class="label">Catatan</td>
							<td>{{ transaction?.note }}</td>
						</tr>
					</tbody>
				</q-markup-table>
			</q-card>
			<CardJournal
				:transactionId="params.id"
				:thAjaranH="transaction?.th_ajaran_h || ''"
				@update:is-saved="(totalDebit) => (transaction.nilai = totalDebit)"
			/>
		</q-card-section>
		<q-dialog persistent="" v-model="showForm">
			<ApbTransactionForm
				:data="transaction"
				@success-submit="(v) => state.add(v)"
				@success-delete="
					() => {
						state.remove(transaction.id);
						$router.go(-1);
					}
				"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { formatDate } from 'src/utils/format-date';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CardJournal from './journals/CardJournal.vue';
import apbTransactionsStore from 'src/stores/apb-transactions-store';
import { storeToRefs } from 'pinia';
import ApbTransactionForm from 'src/components/forms/ApbTransactionForm.vue';

const params = useRoute().params;
const state = apbTransactionsStore();
const { loading, transactions } = storeToRefs(state);
const showForm = ref(false);
const transaction = computed(() => transactions.value.find((item) => item.id == params.id));
const reload = async () => await state.loadById(params.id);

onMounted(async () => {
	if (!transaction.value) await reload();
});
</script>
<style lang="scss" scoped>
td {
	white-space: normal;
	word-wrap: break-word;
	// height: 42px !important;
}
.label {
	font-style: italic;
	width: 120px;
}
</style>
