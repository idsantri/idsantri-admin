<template lang="">
	<CardPage>
		<CardHeader title="Limitasi/Target Anggaran" @on-reload="reload"> </CardHeader>
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
						v-model="filterTahun"
						:options="thAjaranH"
						:loading="loadingTh"
						clearable
						behavior="menu"
					/>
					<q-select
						dense
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						label="Kategori Akun"
						emit-value
						map-options
						v-model="filterCategory"
						:options="categories"
						:loading="loading"
						clearable
						behavior="menu"
					/>
					<q-input
						class="tw:w-full tw:sm:max-w-sm"
						outlined
						dense
						debounce="300"
						placeholder="Cari data anggaran..."
						clearable
						v-model="filterText"
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</q-card-section>
				<q-card-section
					class="tw:grid tw:sm:flex tw:sm:justify-between tw:gap-2 q-pa-sm bg-green-11 text-green-10"
				>
					<q-card
						bordered
						flat
						class="tw:w-full tw:sm:max-w-sm tw:flex tw:items-center tw:justify-between bg-green-12 q-pa-sm"
					>
						<span class="text-italic">Anggaran Pendapatan</span> &nbsp;
						<span class="text-subtitle2">{{ total_budget.budget_4?.toRupiah() }}</span>
					</q-card>
					<q-card
						bordered
						flat
						class="tw:w-full tw:sm:max-w-sm tw:flex tw:items-center tw:justify-between bg-green-12 q-pa-sm"
					>
						<span class="text-italic">Anggaran Biaya</span> &nbsp;
						<span class="text-subtitle2">{{ total_budget.budget_5?.toRupiah() }}</span>
					</q-card>
				</q-card-section>
				<q-card-section v-show="!realtime && configs.length" class="bg-warning q-pa-xs text-black">
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
				:rows="getConfigs"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				:columns="columns"
				:filter="filterText"
				no-data-label="Tidak ada data untuk ditampilkan!"
				no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
				row-key="id"
			>
				<template v-slot:body-cell-expand="props">
					<q-td :props="props">
						<q-btn-dropdown
							menu-self="top start"
							color="info"
							dense
							size="sm"
							outline
							class="q-px-sm"
							:disabled="!props.row.total_budget_group > 0"
						>
							<ConfigMenus :config="props.row" />
						</q-btn-dropdown>
					</q-td>
				</template>

				<template v-slot:body-cell-limit="props">
					<q-td :props="props">
						<span class="text-pre-wrap">{{ props.value }}</span>
						<q-icon name="edit" color="primary" class="q-ml-xs" />
						<q-popup-edit
							v-model="props.row.limit"
							buttons
							v-slot="scope"
							@save="
								(newVal, oldVal) =>
									saveLimit(props.row.id, { newValue: Number(newVal), oldValue: Number(oldVal) })
							"
						>
							<q-input
								type="number"
								v-model="scope.value"
								dense
								outline
								autofocus
								hint="% dari anggaran pendapatan"
							/>
						</q-popup-edit>
					</q-td>
				</template>
				<template v-slot:body-cell-locked="props">
					<q-td :props="props">
						<q-toggle
							:model-value="props.value"
							:true-value="true"
							:false-value="false"
							color="negative"
							unchecked-icon="lock_open"
							checked-icon="lock"
							@update:model-value="(value) => toggle(props.row.id, value)"
						/>
					</q-td>
				</template>
				<template v-slot:body-cell-limit_rp="props">
					<q-td :props="props">
						<q-tooltip v-if="props.row.category == 'BIAYA'">
							Pendapatan ({{ total_budget.budget_4?.toRupiah() }}) x {{ props.row.limit }}%
						</q-tooltip>
						<q-tooltip v-if="props.row.category == 'PENDAPATAN'">
							Biaya ({{ total_budget.budget_5?.toRupiah() }}) x {{ props.row.limit }}%
						</q-tooltip>
						{{ props.value }}
					</q-td>
				</template>
				<template v-slot:bottom-row v-if="filterCategory">
					<q-tr
						:class="['text-bold', totalLimit > 100 ? 'bg-red-2 text-red-10' : 'bg-green-11 text-green-10']"
					>
						<q-td style="padding: 0; height: 40px" class=""> </q-td>
						<q-td style="padding: 0; height: 40px" class=""> </q-td>
						<q-td style="padding: 0; height: 40px" class=""> </q-td>
						<q-td style="padding: 0; height: 40px" class=""> </q-td>
						<q-td style="padding-y: 0; height: 40px" class="text-right">
							{{ totalLimit }}% <span class="q-pl-md"></span>
						</q-td>
						<q-td style="padding: 0; height: 40px" class=""> </q-td>
						<q-td style="padding: 0; height: 40px" class=""> </q-td>
					</q-tr>
				</template>
			</q-table>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useBudgetConfigStore } from 'src/stores/apb-budget-configs-store';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ConfigMenus from './ConfigMenus.vue';

const state = useBudgetConfigStore();
const realtime = ref(false);
const {
	loading,
	loadingTh,
	configs,
	total_budget,
	getConfigs,
	filterText,
	filterTahun,
	filterCategory,
	totalLimit,
	thAjaranH,
	categories,
} = storeToRefs(state);
const { query } = useRoute();
const router = useRouter();

const reload = async () => {
	await state.loadListTahun();
	if (filterTahun.value) {
		await state.loadByTahun(filterTahun.value);
		realtime.value = true;
	}
};

const toggle = async (id, value) => {
	await state.toggleLock(id, value);
};

const saveLimit = async (id, { oldValue, newValue }) => {
	await state.updateLimit(id, { oldValue, newValue });
};

onMounted(async () => {
	if (!thAjaranH.value?.length) {
		await state.loadListTahun();
	}
	// console.log(query);
	if (query.th) filterTahun.value = query.th;
	if (query.text) filterText.value = query.text;
});

watch(filterTahun, async (newTh) => {
	if (newTh) {
		router.replace({ query: { th: newTh } });
		await state.loadByTahun(newTh);
		realtime.value = true;
	} else {
		router.replace({ query: {} });
		configs.value = [];
		total_budget.value = {};
	}
});

watch(filterText, async (text) => {
	router.replace({ query: { text } });
});

const columns = [
	{
		name: 'expand',
		label: '!',
		align: 'center',
		field: '',
		sortable: false,
	},
	{
		name: 'locked',
		label: 'Kunci',
		align: 'center',
		field: 'locked',
		sortable: false,
	},
	{
		name: 'th_ajaran_h',
		label: 'Tahun Ajaran',
		align: 'left',
		field: 'th_ajaran_h',
		sortable: false,
	},
	{
		name: 'category',
		label: 'Kategori',
		align: 'left',
		field: 'category',
		sortable: true,
	},
	{
		name: 'group',
		label: 'Grup',
		align: 'left',
		field: 'group',
		sortable: true,
	},
	{
		name: 'limit',
		label: 'Limit/Target (%)',
		align: 'right',
		field: (row) => Number(row.limit),
		format: (val) => `${val?.toFixed(2) ?? 0}%`,
		sortable: true,
		// classes: 'bg-yellow-1',
		// headerClasses: 'bg-yellow-2',
	},
	{
		name: 'limit_rp',
		label: 'Limit/Target (Rp)',
		align: 'right',
		field: 'limit_rp',
		format: (val) => `${val ? val.toRupiah(true, 2) : 0}`,
		sortable: true,
		// classes: 'bg-yellow-1',
		// headerClasses: 'bg-yellow-2',
	},
	{
		name: 'total_budget_group',
		label: 'Dianggarkan (Rp)',
		align: 'right',
		field: 'total_budget_group',
		format: (val) => `${val ? val.toRupiah(true, 2) : 0}`,
		sortable: true,
		classes: (row) => {
			if (row.category == 'BIAYA') {
				return Number(row.total_budget_group) > Number(row.limit_rp) ? 'text-negative' : 'text-primary';
			} else {
				return Number(row.total_budget_group) < Number(row.limit_rp) ? 'text-negative' : 'text-primary';
			}
		},
		// headerClasses: 'bg-yellow-2',
	},
];
</script>
<style lang=""></style>
