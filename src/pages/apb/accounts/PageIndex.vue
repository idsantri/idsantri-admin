<template lang="">
	<CardPage>
		<CardHeader title="Daftar Akun" @on-reload="reload" :show-add="true" @on-add="showForm = true">
			<template #more>
				<q-list>
					<q-item clickable v-close-popup to="/apb/accounts/assets">
						<q-item-section avatar>
							<q-icon name="sym_o_business_center" />
						</q-item-section>
						<q-item-section>
							<q-item-label> Aset </q-item-label>
							<q-item-label caption> Data Aktiva </q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</template>
		</CardHeader>

		<q-card-section class="q-pt-sm q-pb-none q-px-sm">
			<q-card bordered flat>
				<q-card-section class="tw:grid tw:sm:flex tw:sm:justify-between tw:gap-2 q-pa-sm">
					<q-select
						dense
						class="full-width"
						outlined
						label="Kategori Akun"
						emit-value
						map-options
						v-model="filterKategori"
						:options="optionsKategori"
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
						class="full-width"
						outlined
						dense
						debounce="300"
						v-model="filterText"
						placeholder="Cari data akun/rekening..."
						clearable
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
				:rows="filteredAccounts"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				class="dt"
				:columns="columns"
				:filter="filterText"
				no-data-label="Tidak ada data untuk ditampilkan!"
				no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
				row-key="id"
			>
				<template v-slot:body-cell-id="props">
					<q-td :props="props">
						<q-btn
							:label="props.value"
							no-caps
							size="sm"
							outline
							class="text-green-10"
							:to="`/apb/accounts/${props.value}`"
						/>
					</q-td>
				</template>
				<template v-slot:body-cell-hidden="props">
					<q-td :props="props">
						<q-toggle
							:model-value="props.value"
							:true-value="true"
							:false-value="false"
							checked-icon="check"
							unchecked-icon="clear"
							color="negative"
							@update:model-value="(value, event) => toggle(value, props.row.id)"
						/>
					</q-td>
				</template>
			</q-table>
		</q-card-section>
		<q-dialog persistent="" v-model="showForm">
			<ApbAccountForm
				:data="{}"
				@success-submit="
					(v) => {
						addToState(v);
						$router.push(`/apb/accounts/${v.id}`);
					}
				"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import apbAccountsStore from 'src/stores/apb-accounts-store';
import { storeToRefs } from 'pinia';
import ApbAccountForm from 'src/components/forms/ApbAccountForm.vue';

const showForm = ref(false);
const realtime = ref(false);
const state = apbAccountsStore();
const { accounts, loading, optionsKategori, optionsGroup, filterText, filterKategori, filterGroup, filteredAccounts } =
	storeToRefs(state);
const { toggleHidden, loadAll, add } = state;

const addToState = (data) => {
	data.hidden = 0;
	add(data);
};

const reload = async () => {
	await loadAll();
	filterGroup.value = '';
	filterKategori.value = '';
	filterText.value = '';
};

const toggle = async (value, id) => {
	await toggleHidden(value, id);
};

onMounted(async () => {
	realtime.value = false;
	if (accounts.value?.length == 0) {
		await reload();
		realtime.value = true;
	}
});

watch(filterKategori, () => {
	filterGroup.value = '';
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
		name: 'group',
		label: 'Group',
		field: 'group',
		align: 'left',
		sortable: true,
	},
	{
		name: 'nama',
		label: 'Nama Akun',
		align: 'left',
		field: 'nama',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'kategori_normal',
		label: 'Kategori',
		align: 'left',
		field: (row) => `${row.kategori} (${row.saldo_normal})`,
		sortable: true,
	},
	{
		name: 'hidden',
		label: 'Hidden',
		field: 'hidden',
		format: (val) => val,
		align: 'center',
		sortable: true,
	},
];
</script>
<style lang=""></style>
