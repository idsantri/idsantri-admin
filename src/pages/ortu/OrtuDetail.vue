<template>
	<q-page class="q-pa-sm">
		<q-card class="">
			<q-card-section class="bg-green-8 text-green-11 q-pa-sm">
				<div class="flex items-center">
					<div class="text-subtitle1">Data Orang Tua</div>
					<q-space />
					<q-btn
						label="Cari"
						@click="searchOrtu = true"
						size="sm"
						color="green-2"
						class="text-green-10 q-mr-sm"
						icon="search"
					/>
					<q-btn
						no-caps
						size="sm"
						color="green-2"
						class="text-green-10"
						icon="edit"
						label="Edit"
						@click="editOrtu"
					/>
				</div>
			</q-card-section>
			<q-card-section class="no-padding">
				<div class="row" style="max-width: 1024px">
					<div class="col-12 col-md-6 q-pa-sm">
						<card-column :data="identity" :loading="loading" title="Identitas" class="q-mb-sm" />
						<card-column :data="dataAyah" :loading="loading" title="Data Ayah" class="q-mb-sm" />
						<card-column :data="dataIbu" :loading="loading" title="Data Ibu" class="q-mb-sm" />
					</div>
					<div class="col-12 col-md-6 q-pa-sm">
						<card-list-santri
							:data="santri"
							:loading="loading"
							title="Data Santri (Anak)"
							class="q-mb-sm"
						/>
					</div>
				</div>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import CardColumn from '../../components/CardColumn.vue';
import CardListSantri from 'src/components/santri/CardSantriLists.vue';
import ortuStore from 'src/stores/ortu-store.js';
import dialogStore from 'src/stores/dialog-store';
import { storeToRefs } from 'pinia';
import Ortu from 'src/models/Ortu';

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

const identity = computed(() => ({
	ID: ortu.value.id,
	'Jumlah Anak': ortu.value.jumlah_anak,
}));

const dataAyah = computed(() => ({
	Ayah: ortu.value.ayah?.toUpperCase(),
	NIK: ortu.value.a_nik,
	Hidup: ortu.value.a_hidup ? 'Ya' : 'Tidak',
}));

const dataIbu = computed(() => ({
	Ibu: ortu.value.ibu?.toUpperCase(),
	NIK: ortu.value.i_nik,
	Hidup: ortu.value.i_hidup ? 'Ya' : 'Tidak',
}));

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
