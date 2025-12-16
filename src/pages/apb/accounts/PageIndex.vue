<template lang="">
	<CardPage>
		<CardHeader title="Daftar Akun" @on-reload="loadData" :show-add="true" @on-add="crudShow = true" />

		<q-card-section class="q-pt-sm q-pb-none q-px-sm">
			<q-card bordered flat class="q-pa-sm">
				<div class="text-subtitle2 q-pb-sm">Filter Data</div>
				<div class="tw:grid tw:sm:flex tw:gap-2">
					<q-select
						dense
						class="full-width"
						outlined
						label="Kategori Akun"
						emit-value
						map-options
						v-model="kategori"
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
						v-model="group"
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
						v-model="filter"
						placeholder="Cari data akun/rekening..."
						clearable
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</div>
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
				:filter="filter"
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
							:true-value="1"
							:false-value="0"
							checked-icon="check"
							unchecked-icon="clear"
							color="green-7"
							@update:model-value="(value, event) => toggleHidden(value, props.row.id)"
						/>
					</q-td>
				</template>
			</q-table>
		</q-card-section>
		<q-dialog persistent="" v-model="crudShow">
			<!-- <UgtPjgtForm
				:data="{}"
				@success-submit="(v) => $router.push(`/ugt/pjgt/${v.id}`)"
				@success-delete="$router.go(-1)"
			/> -->
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { ref, onMounted, computed, shallowRef, watch } from 'vue';
import ApbAccount from 'src/models/ApbAccount';
import ArrayCrud from 'src/models/ArrayCrud';

const loading = ref(false);
const filter = ref('');
const crudShow = ref(false);
const accounts = shallowRef([]);
const kategori = ref('');
const group = ref('');

const toggleHidden = async (value, id) => {
	try {
		accounts.value = ArrayCrud.update(accounts.value, id, { hidden: value });
		loading.value = true;
		await ApbAccount.toggleHidden(id);
	} catch (err) {
		accounts.value = ArrayCrud.update(accounts.value, id, { hidden: value ? 0 : 1 });
		console.error('🚀 ~ toggleHidden ~ err:', err);
	} finally {
		loading.value = false;
	}
};

async function loadData() {
	try {
		loading.value = true;
		const data = await ApbAccount.getAll();
		accounts.value = data.accounts;
	} catch (_err) {
		console.error('🚀 ~ loadData ~ _err:', _err);
	} finally {
		loading.value = false;
	}
}

const optionsKategori = computed(() => {
	const kategori = accounts.value.map((account) => account.kategori).filter((group) => group !== null);
	return [...new Set(kategori)];
});

const optionsGroup = computed(() => {
	if (!kategori.value) {
		const group = accounts.value.map((account) => account.group);
		return [...new Set(group)].sort();
	} else {
		const group = accounts.value
			.filter((account) => account.kategori === kategori.value)
			.map((account) => account.group);
		return [...new Set(group)].sort();
	}
});

const filteredAccounts = computed(() => {
	const filterGroup = accounts.value.filter((account) => {
		return group.value ? account.group === group.value : true;
	});
	const filterKategori = filterGroup.filter((account) => {
		return kategori.value ? account.kategori === kategori.value : true;
	});
	return filterKategori;
});

onMounted(async () => {
	await loadData();
});

watch(kategori, () => {
	group.value = '';
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
