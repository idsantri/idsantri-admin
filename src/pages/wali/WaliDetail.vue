<template>
	<CardPage>
		<CardHeader title="Data Wali" @on-reload="loadData">
			<template #buttons>
				<q-btn
					:label="$q.screen.lt.sm ? '' : 'Cari'"
					@click="searchWali = true"
					color="green-2"
					no-caps
					dense
					class="q-px-sm text-green-10"
					icon="search"
				/>
				<q-btn
					no-caps
					color="green-2"
					dense
					class="q-px-sm text-green-10"
					icon="edit"
					:label="$q.screen.lt.sm ? '' : 'Edit'"
					@click="editWali"
				/>
			</template>
		</CardHeader>

		<q-card-section class="no-padding">
			<div class="row" style="max-width: 1024px">
				<div class="col-12 col-md-6 q-pa-sm">
					<CardListTabel :data="identity" :loading="loading" title="Identitas" class="q-mb-sm" />
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
import { formatDateFull } from '../../utils/format-date';
import CardListSantri from 'src/components/santri/CardSantriLists.vue';
import waliStore from 'src/stores/wali-store';
import { formatAlamatLengkap } from 'src/utils/format-text';
import dialogStore from 'src/stores/dialog-store';
import Wali from 'src/models/Wali';
import { storeToRefs } from 'pinia';
import CardListTabel from 'src/components/cards/CardListTabel.vue';

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

const identity = computed(() => {
	return [
		{ label: 'ID', value: wali.value.id },
		{
			label: 'Nama',
			value: `${wali.value?.nama || ''} (${wali.value?.sex?.toUpperCase() ?? ''})`,
		},
		{ label: 'NIK', value: wali.value?.nik || '-' },
		{
			label: 'Alamat',
			value: formatAlamatLengkap(
				wali.value.jl,
				wali.value.rt,
				wali.value.rw,
				wali.value.desa,
				wali.value.kecamatan,
				wali.value.kabupaten,
				wali.value.provinsi,
				wali.value.kode_pos,
			),
		},
		{ label: 'Kelahiran', value: `${wali.value?.tmp_lahir || ''}, ${formatDateFull(wali.value?.tgl_lahir)}` },
		{ label: 'Pekerjaan', value: wali.value?.pekerjaan || '-' },
		{ label: 'Kontak', value: `${wali.value?.telepon || ''}; ${wali.value?.email || ''}` },
	];
});

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
