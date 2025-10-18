<template>
	<q-page class="q-pa-sm">
		<q-card class="">
			<q-card-section class="bg-green-8 text-green-11 q-pa-sm">
				<div class="flex items-center">
					<div class="text-subtitle1">Data Wali</div>
					<q-space />
					<q-btn
						label="Cari"
						@click="searchWali = true"
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
						@click="editWali"
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
		<!-- <pre>{{ wali }}</pre> -->
	</q-page>
</template>
<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateFull } from '../../utils/format-date';
import CardColumn from '../../components/CardColumn.vue';
import CardListSantri from 'src/components/santri/CardSantriLists.vue';
import waliStore from 'src/stores/wali-store';
import { formatAlamatLengkap } from 'src/utils/format-text';
import dialogStore from 'src/stores/dialog-store';
import Wali from 'src/models/Wali';
import { storeToRefs } from 'pinia';

const { wali } = storeToRefs(waliStore());
const route = useRoute();
const waliId = route.params.id;

const dialog = dialogStore();
const { searchWali, crudWali } = toRefs(dialog);
const santri = ref([]);
const loading = ref(false);

async function loadData() {
	waliStore().$reset();
	try {
		loading.value = true;
		const data = await Wali.getById({
			id: waliId,
		});
		if (data) {
			waliStore().setWali(data.wali);
			santri.value = wali.value.santri;
		}
	} catch (_err) {
		// console.error('err ', _err);
	} finally {
		loading.value = false;
	}
}

const identity = computed(() => ({
	ID: wali.value.id,
	Nama: `${wali.value.nama?.toUpperCase()} (${wali.value.sex.toUpperCase()})`,
	NIK: wali.value.nik || '-',
	Alamat: formatAlamatLengkap(
		wali.value.jl,
		wali.value.rt,
		wali.value.rw,
		wali.value.desa,
		wali.value.kecamatan,
		wali.value.kabupaten,
		wali.value.provinsi,
		wali.value.kode_pos,
	),
	Kelahiran: `${wali.value.tmp_lahir || '-'}, ${formatDateFull(wali.value.tgl_lahir)}`,
	Pekerjaan: wali.value.pekerjaan || '-',
	Kontak: (wali.value.telepon || '-') + '; ' + (wali.value.email || '-'),
}));

onMounted(async () => {
	await loadData();
});

/**
 * send to modal edit
 */
function editWali() {
	waliStore().setEdit();
	crudWali.value = true;
}
</script>
