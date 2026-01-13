<template lang="">
	<CardPage>
		<CardHeader title="Daftar Grup Akun" @on-reload="reload" :show-add="true" @on-add="onAdd">
			<template #more>
				<q-list>
					<ToAccount />
					<ToAccountAsset />
					<ToBudget />
					<ToBudgetConfig />
				</q-list>
			</template>
		</CardHeader>
		<CardLoading :showing="loading" />
		<q-card-section class="q-pt-sm q-pb-none q-px-sm">
			<q-card bordered flat>
				<q-card-section class="tw:grid tw:sm:flex tw:sm:justify-between tw:gap-2 q-pa-sm">
					<q-select
						dense
						class="full-width"
						style="max-width: 400px"
						outlined
						label="Kategori"
						emit-value
						map-options
						v-model="filterCategory"
						:options="optionsCategory"
						:loading="loading"
						clearable
						behavior="menu"
					/>

					<q-input
						class="full-width"
						style="max-width: 400px"
						type="search"
						outlined
						dense
						debounce="300"
						v-model="filterText"
						placeholder="Cari data ..."
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
				:rows="filteredGroups"
				:columns="columns"
				:loading="loading"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				class="dt"
				:filter="filterText"
				no-data-label="Tidak ada data untuk ditampilkan!"
				no-results-label="Tidak ditemukan kata kunci yang sesuai dengan pencarian Anda!"
				row-key="id"
			>
				<template v-slot:body-cell-id="props">
					<q-td :props="props">
						<q-btn no-caps flat icon="edit" color="primary" @click="onEdit(props.row)" />
					</q-td>
				</template>
				<template v-slot:body-cell-accounts="props">
					<q-td :props="props" class="text-italic text-primary">
						<router-link
							v-for="item in props.row.accounts"
							:key="item.id"
							:to="`/apb/accounts/${item.id}`"
							class="tw:text-xs"
						>
							{{ item.id }}: {{ item.name }}; &nbsp;
						</router-link>
					</q-td>
				</template>
				<template v-slot:body-cell-active="props">
					<q-td :props="props">
						<q-toggle
							:model-value="props.value"
							:true-value="true"
							:false-value="false"
							checked-icon="check"
							unchecked-icon="clear"
							color="positive"
							@update:model-value="(value, event) => toggle(value, props.row)"
						/>
					</q-td>
				</template>
			</q-table>
		</q-card-section>
		<q-dialog persistent="" v-model="showForm">
			<ApbAccountGroupForm
				:data="group"
				@success-create="onCreated"
				@success-update="onUpdated"
				@success-delete="onDeleted"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import ApbAccountGroupForm from 'src/components/forms/ApbAccountGroupForm.vue';
import { useAccountGroupStore } from 'stores/apb-account-groups-store';
import { onMounted, ref, watch } from 'vue';
import ToAccount from '../more/ToAccount.vue';
import ToAccountAsset from '../more/ToAccountAsset.vue';
import ToBudgetConfig from '../more/ToBudgetConfig.vue';
import ToBudget from '../more/ToBudget.vue';

const realtime = ref(false);
const showForm = ref(false);
const state = useAccountGroupStore();
const { loading, groups, filterText, filterCategory, optionsCategory, filteredGroups } = storeToRefs(state);
const group = ref({});

const onAdd = () => {
	group.value = {};
	showForm.value = true;
};

const onEdit = (data) => {
	group.value = data;
	showForm.value = true;
};

const reload = async () => {
	await state.loadAll();
	realtime.value = true;
};

onMounted(async () => {
	if (!groups.value.length) {
		await reload();
		realtime.value = true;
	}
});

watch(filterCategory, () => {
	filterText.value = '';
});

const toggle = async (newValue, group) => {
	await state.updateActive(newValue, group);
};

const onCreated = async (group) => {
	state.create(group);
	showForm.value = false;
};

const onUpdated = async (group) => {
	state.update(group.id, group);
	showForm.value = false;
};

const onDeleted = async (id) => {
	state.remove(id);
	showForm.value = false;
};

const columns = [
	{
		name: 'id',
		label: 'Edit',
		align: 'center',
		field: 'id',
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
		name: 'name',
		label: 'Nama Grup (Instansi)',
		align: 'left',
		field: 'name',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
	},
	{
		name: 'accounts',
		label: 'Daftar Akun',
		align: 'left',
		field: 'accounts',
		sortable: false,
		style: 'white-space: normal; word-wrap: break-word; min-width: 300px;',
	},
	{
		name: 'active',
		label: 'Aktif',
		align: 'center',
		field: 'active',
		sortable: false,
	},
];
</script>
<style lang=""></style>
