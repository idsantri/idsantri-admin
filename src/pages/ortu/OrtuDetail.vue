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
						<card-column
							:data="identity"
							:loading="loading"
							title="Identitas"
							class="q-mb-sm"
						/>
						<card-column
							:data="dataAyah"
							:loading="loading"
							title="Data Ayah"
							class="q-mb-sm"
						/>
						<card-column
							:data="dataIbu"
							:loading="loading"
							title="Data Ibu"
							class="q-mb-sm"
						/>
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
		<!-- <pre>{{ ortu }}</pre> -->
	</q-page>
</template>
<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import CardColumn from '../../components/CardColumn.vue';
import CardListSantri from 'src/components/santri/CardSantriLists.vue';
import ortuStore from 'src/stores/ortu-store.js';
import dialogStore from 'src/stores/dialog-store';
import apiGet from 'src/api/api-get';

const ortu = reactive({});
const route = useRoute();
const ortuId = route.params.id;

const dialog = dialogStore();
const { searchOrtu, crudOrtu } = toRefs(dialog);
const identity = ref({});
const dataAyah = ref({});
const dataIbu = ref({});
const santri = ref({});
const loading = ref(false);

onMounted(async () => {
	const data = await apiGet({ endPoint: `ortu/${ortuId}`, loading });
	Object.assign(ortu, data.ortu);

	// identity
	identity.value = {
		ID: ortu.id,
		'Jumlah Anak': ortu.jumlah_anak,
	};
	// ayah
	dataAyah.value = {
		Ayah: ortu.ayah?.toUpperCase(),
		NIK: ortu.a_nik,
		Hidup: ortu.a_hidup ? 'Ya' : 'Tidak',
	};
	// ibu
	dataIbu.value = {
		Ibu: ortu.ibu?.toUpperCase(),
		NIK: ortu.i_nik,
		Hidup: ortu.i_hidup ? 'Ya' : 'Tidak',
	};

	// santri
	santri.value = ortu.santri;
	ortuStore().setOrtu(ortu);
});

/**
 * send to modal edit
 */
function editOrtu() {
	ortuStore().setEdit();
	crudOrtu.value = true;
}
</script>
