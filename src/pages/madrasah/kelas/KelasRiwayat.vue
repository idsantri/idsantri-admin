<template lang="">
	<div>
		<q-card bordered flat>
			<div v-if="loading">
				<q-spinner-cube
					color="green-12"
					size="8em"
					class="flex q-ma-lg q-mx-auto"
				/>
			</div>
			<div
				v-else-if="!kelas?.length"
				class="text-italic text-center q-pa-lg"
			>
				Tidak ada untuk ditampilkan
			</div>
			<div v-else>
				<q-list v-for="(kelas, index) in kelas" :key="index">
					<q-item :class="kelas.id == params.id ? 'bg-green-1' : ''">
						<q-item-section side>
							<q-btn
								round
								dense
								glossy
								color="green-6"
								icon="play_arrow"
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
								{{
									kelas.no_absen
										? '(' +
											String('0' + kelas.no_absen).slice(
												-2,
											) +
											')'
										: ''
								}}
							</q-item-label>
							<q-item-label caption class="text-italic">
								{{ kelas.keterangan ? kelas.keterangan : '-' }}
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-separator />
				</q-list>
			</div>
			<q-dialog v-model="crudShow">
				<KelasForm
					:data="dataObj"
					@success-create="
						(res) => $router.push(`/madrasah/kelas/${res.id}`)
					"
				/>
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
				@click="getKelas(santri.id)"
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
import { inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import KelasForm from 'src/components/forms/KelasForm.vue';

const crudShow = ref(false);
const { params } = useRoute();
const loading = ref(false);
const dataObj = ref({});
const kelas = ref([]);
const santri = inject('santri');

function addData() {
	dataObj.value = {
		nama: santri.value.nama || '',
		santri_id: santri.value.id || '',
	};
	crudShow.value = true;
}

async function getKelas(santri_id) {
	const data = await apiGet({
		endPoint: 'kelas',
		loading: loading,
		params: { santri_id },
	});
	if (data.kelas) {
		kelas.value = data.kelas;
	}
}

watch(
	() => santri.value,
	(newSantri) => {
		if (newSantri && newSantri.id) {
			getKelas(newSantri.id);
			// console.log('watch');
		} else {
			kelas.value = [];
		}
	},
	{ immediate: true },
);
</script>
<style lang=""></style>
