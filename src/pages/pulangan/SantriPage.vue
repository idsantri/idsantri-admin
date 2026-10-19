<template lang="">
	<CardPage>
		<CardHeader :show-reload="true" title="Data Santri Pulang" @on-reload="reload">
			<template #more>
				<q-list>
					<q-item clickable v-close-popup to="/info/download" class="">
						<q-item-section avatar class="text-positive">
							<q-icon name="print" />
						</q-item-section>
						<q-item-section>
							<q-item-label overline> Cetak </q-item-label>
							<q-item-label caption> Surat Izin Pulang </q-item-label>
						</q-item-section>
					</q-item>
					<q-item clickable v-close-popup @click="deleteData" class="bg-red-1">
						<q-item-section avatar class="text-negative">
							<q-icon name="delete_forever" />
						</q-item-section>
						<q-item-section>
							<q-item-label overline> Hapus </q-item-label>
							<q-item-label caption> Semua data </q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</template>
		</CardHeader>
		<q-card-section class="q-pa-sm">
			<q-card class="" flat>
				<q-card-section class="bg-green-2 text-green-10 text-center text-subtitle2 q-pa-sm">
					<div>{{ pul.th_ajaran_h }} | {{ pul.nama }}</div>
				</q-card-section>
				<q-card-section class="tw:grid tw:sm:flex tw:sm:justify-between tw:gap-2 q-pa-sm bg-green-11">
					<q-select
						dense
						class="full-width"
						outlined
						label="Filter Domisili"
						emit-value
						map-options
						v-model="filterDomisili"
						:options="optionsDomisili"
						:loading="loading"
						clearable
						behavior="menu"
						style="max-width: 450px"
					/>
					<q-card
						bordered
						flat
						class="q-px-sm bg-transparent flex items-center justify-between full-width"
						style="max-width: 450px"
					>
						<div class="text-caption">Status</div>
						<div class="q-gutter-sm">
							<q-radio
								v-model="filterStatus"
								val="yes"
								label="Pulang"
								color="orange-10"
								checked-icon="task_alt"
								unchecked-icon="panorama_fish_eye"
							/>
							<q-radio
								v-model="filterStatus"
								val="no"
								label="Tidak"
								color="orange-10"
								checked-icon="task_alt"
								unchecked-icon="panorama_fish_eye"
							/>
							<q-radio
								v-model="filterStatus"
								val="all"
								label="Semua"
								color="orange-10"
								checked-icon="task_alt"
								unchecked-icon="panorama_fish_eye"
							/>
						</div>
					</q-card>
					<q-input
						class="full-width"
						outlined
						dense
						debounce="300"
						v-model="filterText"
						placeholder="Cari data ..."
						clearable
						style="max-width: 450px"
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</q-card-section>
			</q-card>
			<q-table
				class="q-mt-sm"
				flat
				bordered
				:rows="filteredPulang"
				:columns="columns"
				:loading="loading"
				row-key="id"
				:rows-per-page-options="[10, 25, 50, 100, 0]"
				:filter="filterText"
			>
				<template v-slot:body-cell-santri_id="props">
					<q-td :props="props">
						<q-btn
							size="sm"
							no-caps
							outline
							class="text-green-10 q-px-sm"
							:to="`/santri/${props.value}`"
							:label="props.value"
						/>
					</q-td>
				</template>
				<template v-slot:body-cell-is_pulang="props">
					<q-td :props="props">
						<q-toggle
							:model-value="props.value"
							:true-value="1"
							:false-value="0"
							checked-icon="check"
							unchecked-icon="clear"
							color="positive"
							@update:model-value="(value, event) => togglePulang(value, props.row.id)"
						/>
					</q-td>
				</template>
			</q-table>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import ArrayCrud from 'src/models/ArrayCrud';
import PulanganSantri from 'src/models/PulanganSantri';
import { usePulanganStore } from 'src/stores/pulangan-store';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const pulang = ref([]);
const id = useRoute().params.id;
const store = usePulanganStore();
const { pulangan } = storeToRefs(store);
const pul = computed(() => pulangan.value.find((p) => p.id == id || p.slug == id));
const loading = ref(false);
const filterDomisili = ref(null);
const filterText = ref(null);
const filterStatus = ref('all');
const router = useRouter();

const optionsDomisili = computed(() => {
	const set = new Set(pulang.value.map((p) => p.domisili));
	return Array.from(set)
		.filter((v) => v !== null)
		.sort((a, b) => a.localeCompare(b));
});

const filteredPulang = computed(() => {
	return pulang.value.filter((p) => {
		const domisiliMatch = !filterDomisili.value || p.domisili === filterDomisili.value;
		const statusMatch =
			filterStatus.value === 'yes' ? p.is_pulang == 1 : filterStatus.value === 'no' ? p.is_pulang == 0 : true;

		return domisiliMatch && statusMatch;
	});
});

const reload = async () => {
	try {
		loading.value = true;
		const data = await PulanganSantri.getAll({ params: { identity: pul.value.slug } });
		pulang.value = data.santri_pulang;
	} catch (error) {
		console.log('🚀 ~ reload ~ error:', error);
	} finally {
		loading.value = false;
	}
};

onMounted(async () => {
	await reload();
});

const togglePulang = async (newValue, id) => {
	try {
		pulang.value = ArrayCrud.update(pulang.value, id, { is_pulang: newValue });
		loading.value = true;
		await PulanganSantri.update({ id, data: { is_pulang: newValue } });
	} catch (error) {
		console.log('🚀 ~ togglePulang ~ error:', error);
		// roll back
		pulang.value = ArrayCrud.update(pulang.value, id, { is_pulang: newValue ? 0 : 1 });
	} finally {
		loading.value = false;
	}
};

const deleteData = async () => {
	try {
		loading.value = true;
		await PulanganSantri.remove({ id: pul.value.slug, message: 'Hapus semua data ini?' });
		router.go(-1);
	} catch (error) {
		console.log('🚀 ~ deleteData ~ error:', error);
	} finally {
		loading.value = false;
	}
};

const columns = [
	{
		name: 'santri_id',
		label: 'ID Santri',
		field: 'santri_id',
		sortable: true,
		align: 'center',
	},
	{
		name: 'nama',
		label: 'Nama',
		field: 'nama',
		sortable: true,
		align: 'left',
	},
	{
		name: 'domisili',
		label: 'Domisili',
		field: 'domisili',
		sortable: true,
		align: 'left',
	},
	{
		name: 'kelas_tk',
		label: 'Kelas',
		field: (row) => (row.tingkat ?? '') + ' ~ ' + (row.kelas ?? ''),
		sortable: true,
		align: 'left',
	},
	{
		name: 'alamat_pendek',
		label: 'Alamat',
		field: 'alamat_pendek',
		sortable: true,
		align: 'left',
	},
	{
		name: 'is_pulang',
		label: 'Pulang',
		field: 'is_pulang',
		sortable: false,
		align: 'center',
	},
];
</script>
<style lang=""></style>
