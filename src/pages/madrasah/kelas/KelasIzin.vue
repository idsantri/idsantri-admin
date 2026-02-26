<template lang="">
	<q-card bordered flat>
		<q-card-section class="bg-green-2 text-subtitle2 q-pa-sm flex items-center">
			<q-btn flat dense icon="sync" @click="loadData" />
			<div class="text-green-10">Riwayat Izin Madrasah</div>
			<q-space />
			<q-btn outline icon="add" @click="handleAdd" label="Tambah" no-caps />
		</q-card-section>
		<CardLoading :showing="loading" />

		<q-list separator="">
			<template v-if="!izin.length">
				<q-item>
					<q-item-section>
						<q-item-label class="text-center text-body2 text-negative text-italic q-pa-lg">
							Tidak ada data untuk ditampilkan.<br />Silakan tambahkan izin terlebih dahulu!
						</q-item-label>
					</q-item-section>
				</q-item>
			</template>
			<template v-else>
				<q-item v-for="item in izin" :key="item.id" class="">
					<q-item-section avatar>
						<q-btn dense glossy="" icon="edit" round="" outline color="green-8" @click="handleEdit(item)" />
					</q-item-section>
					<q-item-section>
						<q-item-label lines="1">
							{{ formatDateShort(item.dari_tgl) + ' | ' + formatHijri(masehiToHijri(item.dari_tgl)) }}
							({{ item.durasi }} hari)
						</q-item-label>
						<q-item-label overline>
							{{ item.keperluan }} {{ item.keterangan ? '(' + item.keterangan + ')' : '' }}
						</q-item-label>
						<q-item-label caption class="text-italic">
							{{ item.catatan ? item.catatan : '' }}
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-btn
							class="bg-green-10 text-green-11"
							dense
							glossy=""
							icon="print"
							round=""
							@click="handlePrint(item)"
						/>
					</q-item-section>
				</q-item>
			</template>
		</q-list>
		<q-dialog v-model="crudShow">
			<IzinMadrasahForm :data="izinObj" @success-submit="loadData" @success-delete="loadData" />
		</q-dialog>
		<q-dialog v-model="showViewer">
			<ReportViewer :url="urlReport" />
		</q-dialog>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateShort } from 'src/utils/format-date';
import { formatHijri, masehiToHijri } from 'src/utils/hijri';
import { getObjectById } from 'src/utils/array-object';
import IzinMadrasahForm from 'src/components/forms/IzinMadrasahForm.vue';
import ReportViewer from 'src/components/ReportViewer.vue';
import IzinMadrasah from 'src/models/IzinMadrasah';

const route = useRoute();
const params = route.params;
const izin = ref([]);
const izinObj = ref({});
const loading = ref(false);
const crudShow = ref(false);
const kelas = ref({});
const urlReport = ref('');

async function loadData() {
	try {
		loading.value = true;
		const data = await IzinMadrasah.riwayat(params.id);
		izin.value = data.izin_madrasah;
		kelas.value = data.kelas;
	} catch (error) {
		console.error('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});

const handleAdd = () => {
	// console.log('add');
	izinObj.value = {};
	izinObj.value.santri_id = kelas.value.santri_id;
	izinObj.value.nama = kelas.value.nama;
	izinObj.value.th_ajaran_h = kelas.value.th_ajaran_h;
	izinObj.value.tingkat_id = kelas.value.tingkat_id;
	izinObj.value.kelas = kelas.value.kelas;
	izinObj.value.kelas_id = kelas.value.id;

	crudShow.value = true;
};

const handleEdit = ({ id }) => {
	// console.log('edit');
	izinObj.value = {};
	izinObj.value = getObjectById(izin, id);
	izinObj.value.santri_id = kelas.value.santri_id;
	izinObj.value.nama = kelas.value.nama;
	izinObj.value.th_ajaran_h = kelas.value.th_ajaran_h;
	izinObj.value.tingkat_id = kelas.value.tingkat_id;
	izinObj.value.kelas = kelas.value.kelas;

	crudShow.value = true;
};

const showViewer = ref(false);
function handlePrint(v) {
	urlReport.value = `reports/izin-madrasah/view?id=${v.id}}`;
	showViewer.value = true;
}
</script>
<style lang=""></style>
