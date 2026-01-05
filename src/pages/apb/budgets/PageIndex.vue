<template lang="">
	<CardPage>
		<CardHeader title="Daftar Anggaran" @on-reload="reload">
			<template #more>
				<q-list>
					<!-- input -->
					<q-item clickable v-close-popup @click="showForm = true">
						<q-item-section avatar>
							<q-icon color="green" name="sym_o_create_new_folder" />
						</q-item-section>
						<q-item-section>
							<q-item-label overline> Buat Anggaran </q-item-label>
							<q-item-label caption> tahun ajaran baru </q-item-label>
						</q-item-section>
					</q-item>
					<q-item clickable v-close-popup to="/apb/budgets/configs">
						<q-item-section avatar>
							<q-icon color="green" name="sym_o_readiness_score" />
						</q-item-section>
						<q-item-section>
							<q-item-label overline> Pengaturan </q-item-label>
							<q-item-label caption> Limitasi Anggaran </q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</template>
		</CardHeader>

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
					<q-select
						dense
						class="full-width"
						outlined
						label="Kategori Akun"
						emit-value
						map-options
						v-model="filterCategory"
						:options="optionsCategory"
						:loading="loading"
						clearable
						behavior="menu"
					/>
					<q-select
						dense
						class="full-width"
						outlined
						label="Group"
						emit-value
						map-options
						v-model="filterGroup"
						:options="optionsGroup"
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
				:rows="filteredData"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				class="dt"
				:filter="filterText"
				no-data-label="Tidak ada data untuk ditampilkan!"
				no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
				row-key="id"
				:columns="columns"
			>
				<template v-slot:body-cell-actions="props">
					<q-td :props="props" title="Detail Anggaran">
						<q-btn
							no-caps
							outline
							size="sm"
							class="q-px-none"
							color="green-7"
							:to="`/apb/budgets/${props.row.id}`"
						>
							<q-icon name="info" class="q-mx-xs" />
							<span class="q-mx-xs"> Detail </span>
						</q-btn>
					</q-td>
				</template>
				<template v-slot:body-cell-account_id="props">
					<q-td :props="props">
						<q-btn
							size="sm"
							no-caps
							class="q-px-sm"
							:label="props.row.account_id"
							outline
							color="negative"
							:to="`/apb/accounts/${props.row.account_id}`"
						/>
					</q-td>
				</template>
				<template v-slot:body-cell-locked="props">
					<q-td :props="props">
						<q-toggle
							:model-value="props.value || false"
							:true-value="true"
							:false-value="false"
							color="negative"
							:unchecked-icon="props.value === false ? 'lock_open' : 'clear'"
							checked-icon="lock"
							disable
							keep-color
						/>
					</q-td>
				</template>
				<template v-slot:body-cell-delete="props">
					<q-td :props="props">
						<q-btn icon="delete" flat color="negative" @click="handleDelete(props.row)" />
					</q-td>
				</template>
			</q-table>
		</q-card-section>
		<q-dialog persistent="" v-model="showForm">
			<ApbBudgetForm :data="{}" @success-submit="(v) => handleSuccessSubmit(v)" />
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import ApbBudgetForm from 'src/components/forms/ApbBudgetForm.vue';
import { useBudgetStore } from 'src/stores/apb-budgets-store';
import { onMounted, ref, watch } from 'vue';

const realtime = ref(false);
const showForm = ref(false);
const state = useBudgetStore();
const {
	thAjaranH,
	budgets,
	loading,
	loadingTh,
	optionsThAjaran,
	optionsCategory,
	optionsGroup,
	filterText,
	filterCategory,
	filterGroup,
	filteredData,
} = storeToRefs(state);

const reload = async () => {
	await state.listTahun();
	filterCategory.value = '';
	filterGroup.value = '';
	filterText.value = '';
	if (thAjaranH.value) {
		await state.loadByTahun(thAjaranH.value);
		realtime.value = true;
	}
};

const handleDelete = async (row) => {
	await state.removeData(row.id);
};

const handleSuccessSubmit = (v) => {
	budgets.value = v;
	realtime.value = true;
	filterCategory.value = '';
	filterGroup.value = '';
	filterText.value = '';
	optionsThAjaran.value.push(v[0].th_ajaran_h);
	thAjaranH.value = v[0].th_ajaran_h;
};

onMounted(async () => {
	realtime.value = false;
	if (!optionsThAjaran.value?.length) {
		await state.listTahun();
	}
});

watch(thAjaranH, async (val) => {
	filterGroup.value = '';
	filterCategory.value = '';
	filterText.value = '';
	if (val) {
		await state.loadByTahun(val);
		realtime.value = true;
	} else {
		budgets.value = [];
	}
});

watch(filterCategory, () => {
	filterGroup.value = '';
});

const columns = [
	{
		name: 'actions',
		label: '!',
		align: 'center',
	},
	{
		name: 'account_id',
		label: 'Akun ID',
		align: 'left',
		field: 'account_id',
		sortable: true,
	},
	{
		name: 'group_name',
		label: 'Akun ',
		field: (row) => `${row.group}: ${row.name}`,
		align: 'left',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},

	{
		name: 'total_budget',
		label: 'Total Anggaran',
		field: 'total_budget',
		format: (val) => `${val ? val.toRupiah() : 0}`,
		align: 'right',
		sortable: true,
		classes: (row) => (row.status == 'unbudgeted' ? 'bg-negative text-white	' : ''),
	},
	{
		name: 'total_absorbed',
		label: 'Total Serapan',
		field: 'total_absorbed',
		format: (val) => `${val ? val.toRupiah() : 0}`,
		align: 'right',
		sortable: true,
	},
	{
		name: 'sisa',
		label: 'Sisa',
		field: 'sisa',
		format: (val) => `${val ? (Number(val) >= 0 ? '+' : '-') + Math.abs(val).toRupiah() : 0}`,
		align: 'right',
		sortable: true,
		classes: (row) => (Number(row.sisa) > 0 ? 'text-primary' : 'text-negative'),
	},
	{
		name: 'percentage',
		label: '%',
		field: 'percentage',
		format: (val) => `${val}%`,
		align: 'right',
		sortable: true,
	},
	{
		name: 'locked',
		label: 'Kunci',
		field: 'locked',
		align: 'center',
	},
	{
		name: 'delete',
		label: 'Hapus',
		align: 'center',
	},
];
</script>
<style lang=""></style>
