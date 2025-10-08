<template lang="">
	<div class="q-card--bordered">
		<div class="q-px-md">
			<q-toolbar class="no-padding no-margin">
				<q-toolbar-title
					class="text-subtitle1 text-green-10 text-weight-bold"
				>
					Jabatan Madrasah
				</q-toolbar-title>
				<q-btn
					class="q-px-md text-green-10"
					label="Tambah"
					no-caps=""
					icon="add"
					outline
					glossy
					@click="handleAdd"
				/>
			</q-toolbar>
		</div>
		<q-separator class="" />

		<q-list separator class="">
			<div v-if="loading">
				<q-skeleton height="80px" />
			</div>
			<div v-else-if="!am?.length">
				<div class="bg-red-1 text-negative text-center q-pa-md">
					Tidak data data untuk ditampilkan.<br />Silakan tambahkah
					data!
				</div>
			</div>
			<q-item v-else v-for="item in am" :key="item.id" class="">
				<q-item-section>
					<q-item-label overline>
						{{ item.th_ajaran_h }} | {{ item.th_ajaran_m }}
					</q-item-label>
					<q-item-label lines="1">
						<span class="text-bold"> {{ item.jabatan }} </span>;
						{{ item.tingkat
						}}{{ item.kelas ? '; ' + item.kelas : '' }}
						{{ item.ruang ? '(' + item.ruang + ')' : '' }}
					</q-item-label>
					<q-item-label caption class="text-italic">
						{{ item.keterangan || '-' }}
					</q-item-label>
				</q-item-section>

				<q-item-section side>
					<q-btn
						outline
						glossy
						icon="edit"
						round
						dense
						color="green"
						@click="handleEdit(item.id)"
					/>
				</q-item-section>
			</q-item>
		</q-list>
	</div>

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
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import { getObjectById } from 'src/utils/array-object';
import PersonaliaMadrasahForm from 'src/components/forms/PersonaliaMadrasahForm.vue';

const route = useRoute();
const loading = ref(false);
const am = ref([]);
const crudShow = ref(false);
const dataObj = ref({});
const aparatur = inject('aparatur');

async function loadData() {
	if (route.params.id) {
		const data = await apiGet({
			endPoint: `aparatur-madrasah`,
			params: { aparatur_id: route.params.id },
			loading,
		});
		if (data) {
			am.value = data.aparatur_madrasah;
		}
	}
}

onMounted(async () => await loadData());

const handleAdd = () => {
	dataObj.value = {
		aparatur_id: aparatur.value.id,
		nama: aparatur.value.nama,
	};
	crudShow.value = true;
};

const handleEdit = (id) => {
	dataObj.value = getObjectById(am.value, id);
	crudShow.value = true;
};
</script>
<style lang=""></style>
