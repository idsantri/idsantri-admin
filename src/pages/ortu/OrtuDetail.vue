<template>
	<CardPage>
		<CardHeader title="Data Orang Tua" @on-reload="loadData" :show-edit="true" @on-edit="editOrtu">
			<template #buttons>
				<q-btn
					:label="$q.screen.lt.sm ? '' : 'Cari'"
					@click="searchOrtu = true"
					color="green-2"
					no-caps
					dense
					class="q-px-sm text-green-10"
					icon="search"
				/>
			</template>
		</CardHeader>

		<q-card-section class="no-padding">
			<div class="row" style="max-width: 1024px">
				<div class="col-12 col-md-6 q-pa-sm">
					<CardListTabel :data="identity" :loading="loading" title="Identitas" class="q-mb-sm" />
					<CardListTabel :data="dataAyah" :loading="loading" title="Data Ayah" class="q-mb-sm" />
					<CardListTabel :data="dataIbu" :loading="loading" title="Data Ibu" class="q-mb-sm" />
				</div>
				<div class="col-12 col-md-6 q-pa-sm">
					<card-list-santri :data="santri" :loading="loading" title="Data Santri (Anak)" class="q-mb-sm" />
				</div>
			</div>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import CardListSantri from 'src/components/santri/CardSantriLists.vue';
import ortuStore from 'src/stores/ortu-store.js';
import dialogStore from 'src/stores/dialog-store';
import { storeToRefs } from 'pinia';
import Ortu from 'src/models/Ortu';
import CardListTabel from 'src/components/cards/CardListTabel.vue';

const { ortu } = storeToRefs(ortuStore());
const route = useRoute();
const ortuId = route.params.id;

const dialog = dialogStore();
const { searchOrtu, crudOrtu } = toRefs(dialog);
const santri = ref({});
const loading = ref(false);

async function loadData() {
	ortuStore().$reset();
	try {
		loading.value = true;
		const data = await Ortu.getById({
			id: ortuId,
		});
		if (data) {
			ortuStore().setOrtu(data.ortu);
			santri.value = ortu.value.santri;
		}
	} catch (_err) {
		// console.error('err ', _err);
	} finally {
		loading.value = false;
	}
}

const identity = computed(() => {
	return [
		{ label: 'ID', value: ortu.value.id },
		{ label: 'Jumlah Anak', value: ortu.value.jumlah_anak },
	];
});

const dataAyah = computed(() => {
	return [
		{ label: 'Ayah', value: ortu.value.ayah?.toUpperCase() },
		{ label: 'NIK', value: ortu.value.a_nik },
		{ label: 'Hidup', value: ortu.value.a_hidup ? 'Ya' : 'Tidak' },
	];
});

const dataIbu = computed(() => {
	return [
		{ label: 'Ibu', value: ortu.value.ibu?.toUpperCase() },
		{ label: 'NIK', value: ortu.value.i_nik },
		{ label: 'Hidup', value: ortu.value.i_hidup ? 'Ya' : 'Tidak' },
	];
});

onMounted(async () => {
	await loadData();
});

/**
 * send to modal edit
 */
function editOrtu() {
	ortuStore().setEdit();
	crudOrtu.value = true;
}
</script>
