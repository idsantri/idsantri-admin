<template lang="">
	<div>
		<q-card bordered flat>
			<div v-if="!kelas?.length" class="text-italic text-center q-pa-lg">Tidak ada untuk ditampilkan</div>
			<div v-else>
				<q-list v-for="(kelas, index) in kelas" :key="index">
					<q-item :class="kelas.id == params.id ? 'bg-green-1' : ''">
						<q-item-section side>
							<q-btn
								outline
								round
								dense
								glossy
								color="green-6"
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
								{{ kelas.keterangan ? kelas.keterangan : '-' }}
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-separator />
				</q-list>
			</div>
			<CardLoading :showing="loading" />

			<q-dialog v-model="crudShow">
				<KelasForm :data="dataObj" @success-create="(res) => $router.push(`/madrasah/kelas/${res.id}`)" />
			</q-dialog>
		</q-card>
		<div class="absolute-bottom-right q-ma-sm">
			<q-btn
				style=""
				icon="sync"
				round=""
				dense=""
				outline
				color="green-10"
				glossy=""
				class="q-mr-sm"
				@click="getKelas(santri_id)"
			/>
			<q-btn
				style="opacity: 0.8"
				icon="add"
				round=""
				dense=""
				color="green-10"
				glossy=""
				class="text-green-11"
				@click="addData"
			/>
		</div>
	</div>
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
