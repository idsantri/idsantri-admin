<template lang="">
	<CardPage>
		<CardHeader title="Daftar Transaksi" @on-reload="reload" :show-add="true" @on-add="crudShow = true" />

		<q-card-section class="q-pt-sm q-pb-none q-px-sm">
			<q-card bordered flat class="">
				<q-card-section class="tw:grid tw:sm:flex tw:sm:justify-between tw:gap-2 q-pa-sm">
					<q-select
						dense
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						label="Tahun Ajaran"
						emit-value
						map-options
						v-model="thAjaranH"
						:options="optionsThAjaran"
						:loading="loadingTh"
						clearable
						behavior="menu"
					/>
					<q-input
						type="date"
						dense
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						label="Tanggal Awal"
						v-model="startDate"
						clearable
					/>
					<q-input
						type="date"
						dense
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						label="Tanggal Akhir"
						v-model="endDate"
						clearable
					/>
					<InputSearch
						class="tw:w-full tw:sm:max-w-sm"
						v-model="filter"
						placeholder="Cari data transaksi..."
					/>
				</q-card-section>
				<q-card-section v-show="!realtime" class="bg-warning q-pa-xs text-black">
					<div class="text-caption text-center">
						Data tidak realtime! Klik tombol muat ulang untuk mendapatkan data terbaru.
					</div>
				</q-card-section>
			</q-card>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-table
				bordered
				flat
				:rows="transactions"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				class="dt"
				:columns="columns"
				:filter="filter"
				no-data-label="Tidak ada data untuk ditampilkan!"
				no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
				row-key="name"
			>
				<template v-slot:body-cell-id="props">
					<q-td :props="props">
						<q-btn
							dense
							no-caps
							size="sm"
							outline
							class="text-green-10 q-px-sm"
							:to="`/apb/transactions/${props.value}`"
						>
							<q-icon name="sym_o_info" class="q-mr-xs" />
							{{ props.value }}
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</q-card-section>
		<q-dialog persistent="" v-model="crudShow">
			<ApbTransactionForm
				:data="{}"
				@success-submit="
					(v) => {
						state.add(v);
						$router.push(`/apb/transactions/${v.id}`);
					}
				"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import ApbTransactionForm from 'src/components/forms/ApbTransactionForm.vue';
import InputSearch from 'src/components/inputs/InputSearch.vue';
import apbTransactionsStore from 'src/stores/apb-transactions-store';
import { formatDate } from 'src/utils/format-date';
import { onMounted, ref, watch } from 'vue';

const crudShow = ref(false);
const realtime = ref(false);
const state = apbTransactionsStore();
const { transactions, loadingTh, optionsThAjaran, loading, filter, thAjaranH, startDate, endDate } = storeToRefs(state);

onMounted(async () => {
	realtime.value = false;
	if (!optionsThAjaran.value?.length) {
		await state.listTahun();
	}
});

async function reload() {
	await state.listTahun();
	if (thAjaranH.value) {
		await state.loadByTahun(thAjaranH.value);
		realtime.value = true;
	} else if (startDate.value && endDate.value) {
		await state.loadByDate(startDate.value, endDate.value);
		realtime.value = true;
	}
}

watch(thAjaranH, async (newVal) => {
	if (newVal) {
		startDate.value = '';
		endDate.value = '';
		await state.loadByTahun(newVal);
		realtime.value = true;
	} else {
		transactions.value = [];
	}
});

watch([startDate, endDate], async ([newStart, newEnd]) => {
	if (newStart && newEnd) {
		thAjaranH.value = '';
		await state.loadByDate(newStart, newEnd);
		realtime.value = true;
	} else {
		transactions.value = [];
	}
});

const columns = [
	{
		name: 'id',
		label: 'ID',
		align: 'center',
		field: 'id',
		sortable: true,
	},
	{
		name: 'th_ajaran_h',
		label: 'Th Ajaran',
		field: 'th_ajaran_h',
		align: 'left',
		sortable: true,
	},
	{
		name: 'keterangan',
		label: 'Keterangan',
		align: 'left',
		field: 'keterangan',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'nilai',
		label: 'Nilai',
		align: 'right',
		field: 'nilai',
		format: (val) => `${val ? val.toRupiah() : 0}`,
		sortable: true,
	},
	{
		name: 'created_at',
		label: 'Dibuat Pada',
		align: 'left',
		field: 'created_at',
		format: (val) => formatDate(val, 'dd-MM-yyyy'),
		sortable: true,
	},
	{
		name: 'atas_nama',
		label: 'an.',
		align: 'left',
		field: 'atas_nama',
		sortable: true,
	},
];
</script>
<style lang=""></style>
