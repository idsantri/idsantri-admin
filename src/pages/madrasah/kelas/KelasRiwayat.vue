<template lang="">
	<q-card bordered flat>
		<q-card-section class="bg-green-2 text-subtitle2 q-pa-sm flex items-center">
			<q-btn flat dense icon="sync" @click="getKelas(santri_id)" />
			<div class="text-green-10">Riwayat Kelas</div>
			<q-space />
			<q-btn outline icon="add" @click="addData" label="Tambah" no-caps />
		</q-card-section>
		<CardLoading :showing="loading" />
		<q-list separator="">
			<template v-if="!kelas?.length">
				<q-item>
					<q-item-section>
						<q-item-label class="text-center text-body2 text-negative text-italic q-pa-lg">
							Tidak ada untuk ditampilkan.<br />Silakan tambahkan kelas terlebih dahulu!
						</q-item-label>
					</q-item-section>
				</q-item>
			</template>
			<template v-else>
				<q-item v-for="(kelas, index) in kelas" :key="index" :class="kelas.id == params.id ? 'bg-green-1' : ''">
					<q-item-section avatar>
						<q-btn
							outline
							round
							dense
							glossy
							color="green-7"
							icon="info"
							:to="`/madrasah/kelas/${kelas.id}/riwayat`"
							:disable="kelas.id == params.id"
						/>
					</q-item-section>
					<q-item-section>
						<q-item-label overline class="flex">
							{{ kelas.th_ajaran_h }}
							|
							{{ kelas.th_ajaran_m }}
							<q-space />
							{{ kelas.id }}
						</q-item-label>
						<q-item-label>
							{{ kelas.tingkat }} &mdash;
							{{ kelas.kelas }}
							{{ kelas.no_absen ? '(' + String('0' + kelas.no_absen).slice(-2) + ')' : '' }}
						</q-item-label>
						<q-item-label caption class="text-italic">
							{{ kelas.keterangan ?? '' }}
						</q-item-label>
					</q-item-section>
				</q-item>
			</template>
		</q-list>
		<q-dialog v-model="crudShow">
			<KelasForm :data="dataObj" @success-create="(res) => $router.push(`/madrasah/kelas/${res.id}`)" />
		</q-dialog>
	</q-card>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import KelasForm from 'src/components/forms/KelasForm.vue';
import Kelas from 'src/models/Kelas';

const props = defineProps({ santri_id: { type: [String, Number] } });
const crudShow = ref(false);
const { params } = useRoute();
const loading = ref(false);
const dataObj = ref({});
const kelas = ref([]);
const santri = ref({});

function addData() {
	dataObj.value = {
		nama: santri.value.nama || '',
		santri_id: santri.value.id || '',
	};
	crudShow.value = true;
}

async function getKelas(santri_id) {
	try {
		loading.value = true;
		const data = await Kelas.santri(santri_id);
		kelas.value = data.kelas;
		santri.value = data.santri;
	} catch (error) {
		console.error('🚀 ~ getKelas ~ error:', error);
	} finally {
		loading.value = false;
	}
}

watch(
	() => props.santri_id,
	(newId) => {
		if (newId) {
			getKelas(newId);
			// console.log('watch');
		} else {
			kelas.value = [];
		}
	},
	{ immediate: true },
);
</script>
<style lang=""></style>
