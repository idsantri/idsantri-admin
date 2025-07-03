<template lang="">
	<q-card flat bordered class="">
		<q-card-section class="bg-green-7 no-padding">
			<q-toolbar class="no-padding no-margin">
				<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11">
					Jabatan
				</q-toolbar-title>
				<q-btn
					dense
					class="q-px-md q-mr-sm text-green-10"
					label="Tambah"
					no-caps=""
					icon="add"
					color="green-2"
					@click="handleAdd"
				/>
			</q-toolbar>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<div v-if="loading">
				<q-skeleton height="80px" />
			</div>
			<div v-else>
				<div v-if="!jabatan.length">
					<div class="bg-red-1 text-negative text-center q-pa-md">
						Tidak data data untuk ditampilkan.<br />Silakan
						tambahkah data!
					</div>
				</div>

				<q-list v-else bordered separator>
					<q-item v-for="j in jabatan" :key="j.id" class="q-my-sm">
						<q-item-section>
							<q-item-label overline>
								{{ j.th_ajaran_h }} | {{ j.th_ajaran_m }}
							</q-item-label>
							<q-item-label lines="1">
								<span class="text-bold"> {{ j.jabatan }} </span
								>; {{ j.tingkat
								}}{{ j.kelas ? '; ' + j.kelas : '' }}
								{{ j.ruang ? '( ' + j.ruang + ')' : '' }}
							</q-item-label>
							<q-item-label caption class="text-italic">
								{{ j.keterangan || '-' }}
							</q-item-label>
						</q-item-section>

						<q-item-section side>
							<q-btn
								icon="edit"
								round
								dense
								color="green"
								@click="handleEdit(j.id)"
							/>
						</q-item-section>
					</q-item>
				</q-list>
			</div>
			<!-- <pre>{{ personalia }}</pre> -->
		</q-card-section>
	</q-card>

	<!-- modal -->
	<q-dialog v-model="crudShow">
		<PersonaliaMadrasahForm
			:data="dataObj"
			@success-submit="loadData"
			@success-delete="loadData"
		/>
	</q-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import { getObjectById } from 'src/utils/array-object';
import PersonaliaMadrasahForm from 'src/components/forms/PersonaliaMadrasahForm.vue';

const route = useRoute();
const loading = ref(false);
const jabatan = ref([]);
const aparatur = ref({});
const crudShow = ref(false);
const dataObj = ref({});

async function loadData() {
	if (route.params.id) {
		const data = await apiGet({
			endPoint: `aparatur/${route.params.id}/madrasah`,
			loading,
		});
		jabatan.value = data.aparatur_madrasah;
		aparatur.value = data.aparatur;
	}
}
onMounted(async () => {
	await loadData();
});

const handleAdd = () => {
	dataObj.value = {
		aparatur_id: aparatur.value.id,
		nama: aparatur.value.nama,
	};
	crudShow.value = true;
};

const handleEdit = (id) => {
	dataObj.value = getObjectById(jabatan.value, id);
	dataObj.value.nama = aparatur.value.nama;

	crudShow.value = true;
};
</script>
<style lang=""></style>
