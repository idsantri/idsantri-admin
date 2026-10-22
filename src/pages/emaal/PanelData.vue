<template>
	<q-card bordered flat>
		<q-card-section class="q-pa-sm bg-green-1 text-green-10 flex flex-center justify-between">
			<div class="tw:flex tw:items-center tw:gap-x-2">
				<q-radio
					v-model="filterAktif"
					checked-icon="task_alt"
					unchecked-icon="panorama_fish_eye"
					val="all"
					label="Semua"
					color="green-10"
				/>
				<q-radio
					v-model="filterAktif"
					checked-icon="task_alt"
					unchecked-icon="panorama_fish_eye"
					val="aktif"
					label="Aktif"
					color="green-10"
				/>
				<q-radio
					v-model="filterAktif"
					checked-icon="task_alt"
					unchecked-icon="sym_o_panorama_fish_eye"
					val="not-aktif"
					label="Non Aktif"
					color="green-10"
				/>
			</div>
			<div>
				<input-search v-model="filter" />
			</div>
		</q-card-section>
		<q-table
			:rows="filtered"
			:columns="columns"
			:filter="filter"
			row-key="id"
			:loading="loading"
			:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
			flat
			bordered
			class="q-pa-sm"
			@row-click="(e, r) => $router.push({ query: { tab: 'santri', santri_id: r.santri_id } })"
		>
			<template v-slot:body-cell-no_emaal="props">
				<q-td :props="props">
					<span class="q-mr-md">
						<q-icon
							:name="props.row.aktif ? 'task_alt' : 'close'"
							:color="props.row.aktif ? 'green-10' : 'negative'"
							size="xs"
						/>
					</span>
					<span :class="props.row.aktif ? 'text-black' : 'text-negative'">{{ props.row.no_emaal }}</span>
				</q-td>
			</template>
		</q-table>

		<!-- <q-card-section class="q-pa-sm">
			<pre>
				{{ emaal }}
			</pre>
		</q-card-section> -->
	</q-card>
</template>
<script setup>
import InputSearch from 'src/components/inputs/InputSearch.vue';
import Emaal from 'src/models/Emaal';
import { computed, onMounted, ref } from 'vue';

const emaal = ref([]);
const loading = ref(false);
const filter = ref('');
const filterAktif = ref('aktif');
const filtered = computed(() => {
	return emaal.value.filter((item) => {
		if (filterAktif.value == 'aktif') {
			return item.aktif == true;
		} else if (filterAktif.value == 'not-aktif') {
			return item.aktif == false;
		}
		return true;
	});
});

async function getData() {
	try {
		loading.value = true;
		const response = await Emaal.getAll({ params: { all: true } });
		if (response) emaal.value = response.emaal;
	} catch (error) {
		console.error('error get emaal', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await getData();
});

const columns = [
	{ name: 'no_emaal', label: 'Nomor Emaal', align: 'left', field: 'no_emaal', sortable: true },
	{ name: 'santri_nama', label: 'Nama', align: 'left', field: 'santri_nama', sortable: true },
	{ name: 'santri_data_akhir', label: 'Data Akhir', align: 'left', field: 'santri_data_akhir', sortable: true },
];
</script>
<style lang=""></style>
