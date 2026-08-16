<template>
	<CardPage>
		<CardHeader title="Transaksi via Payment Gateway" @onReload="fetchPayments" />
		<q-card-section class="bg-green-1 q-pa-sm tw:grid tw:sm:flex tw:sm:justify-between tw:sm:items-center tw:gap-2">
			<q-select
				dense
				outlined
				class="full-width bg-white"
				style="max-width: 400px; min-width: 250px"
				v-model="PGModel"
				:options="PGOptions"
				label="Payment Gateway"
				emit-value
				map-options
				:loading="loading"
				clearable
				behavior="menu"
			/>
			<InputSearch
				v-model="filter"
				class="full-width"
				bg-color="white"
				style="max-width: 400px; min-width: 250px"
			/>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-table
				:rows="rows"
				row-key="id"
				:loading="loading"
				:columns="columns"
				:filter="filter"
				flat
				bordered
				class="q-pa-sm"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
			>
				<template v-slot:header="props">
					<q-tr :props="props">
						<q-th auto-width />
						<q-th v-for="col in props.cols" :key="col.name" :props="props">
							{{ col.label }}
						</q-th>
					</q-tr>
				</template>

				<template v-slot:body="props">
					<q-tr :props="props">
						<q-td auto-width>
							<q-btn
								size="sm"
								color="green-8"
								round
								dense
								@click="props.expand = !props.expand"
								:icon="props.expand ? 'remove' : 'add'"
							/>
						</q-td>
						<q-td v-for="col in props.cols" :key="col.name" :props="props">
							<span v-if="col.name != 'santri_nama'">
								{{ col.value }}
							</span>
							<span v-else>
								<router-link :to="`/iuran/santri/${props.row.santri_id}`" class="text-green-10">
									{{ col.value }}
								</router-link>
							</span>
						</q-td>
					</q-tr>
					<q-tr v-show="props.expand" :props="props">
						<q-td colspan="100%" class="tw:p-0">
							<q-markup-table class="tw:w-max" flat bordered>
								<thead class="bg-green-1">
									<tr>
										<th class="text-left">Th Ajaran H</th>
										<th class="text-left">Item</th>
										<th class="text-right">Nominal</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in props.row.item_details" :key="item.id">
										<td class="text-left">{{ item?.th_ajaran_h }}</td>
										<td class="text-left">
											{{ item?.item }}
										</td>
										<td class="text-right">{{ item?.nominal?.toRupiah() }}</td>
									</tr>
								</tbody>
								<tfoot class="bg-green-11">
									<tr>
										<td colspan="2" class="text-right text-italic">Total</td>
										<td class="text-right text-bold">
											{{
												props.row?.item_details?.reduce((a, b) => a + b?.nominal, 0)?.toRupiah()
											}}
										</td>
									</tr>
								</tfoot>
							</q-markup-table>
							<!-- <pre>
									{{ props.row.item_details }}
								</pre
							> -->
						</q-td>
					</q-tr>
				</template>
			</q-table>
		</q-card-section>
		<!-- <pre>{{ iuran_payments }}</pre> -->
	</CardPage>
</template>
<script setup>
import InputSearch from 'src/components/inputs/InputSearch.vue';
import IuranPayment from 'src/models/IuranPayment';
import { formatDate } from 'src/utils/format-date';
import { computed, onMounted, ref } from 'vue';
const iuran_payments = ref([]);
const loading = ref(false);
const filter = ref('');

const PGOptions = computed(() => {
	const pgSet = new Set();
	iuran_payments.value.forEach((item) => {
		if (item.payment_gateway) {
			pgSet.add(item.payment_gateway);
		}
	});
	return Array.from(pgSet).sort((a, b) => a.localeCompare(b));
});
const PGModel = ref('');

const rows = computed(() => {
	return iuran_payments.value.filter((item) => {
		if (PGModel.value) {
			return item.payment_gateway == PGModel.value;
		}
		return true;
	});
});

async function fetchPayments() {
	try {
		loading.value = true;
		const response = await IuranPayment.getAll();
		// console.log('response', response);
		iuran_payments.value = response.iuran_payments;
	} catch (error) {
		console.error(error);
	} finally {
		loading.value = false;
	}
}

onMounted(() => {
	fetchPayments();
});

const columns = [
	// { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
	{
		name: 'cr_at',
		label: 'Tanggal',
		field: 'created_at',
		align: 'right',
		sortable: true,
		format: (val) => `${formatDate(val, 'yyyy-MM-dd HH:mm')}`,
	},
	{
		name: 'gross_amount',
		label: 'Total',
		field: 'gross_amount',
		align: 'right',
		format: (val) => `${val?.toRupiah()}`,
		sortable: true,
	},
	{
		name: 'count',
		label: 'Jumlah',
		field: (row) => row?.item_details?.length,
		align: 'right',
		format: (val) => `${val} item`,
		sortable: true,
	},
	{
		name: 'transaction_status',
		label: 'Status',
		field: 'transaction_status',
		align: 'left',
		sortable: true,
	},
	{
		name: 'payment_gateway',
		label: 'Payment Gateway',
		field: 'payment_gateway',
		align: 'left',
		sortable: true,
	},
	{
		name: 'payment_type',
		label: 'Payment Type',
		field: 'payment_type',
		align: 'left',
		sortable: true,
	},
	{
		name: 'santri_nama',
		label: 'Nama Santri',
		field: (row) => row?.santri_nama + ' (' + row?.santri_id + ')',
		align: 'left',
		sortable: true,
	},
	{
		name: 'order_id',
		label: 'Order ID',
		field: 'order_id',
		align: 'left',
		sortable: true,
	},
];
</script>
<style lang=""></style>
