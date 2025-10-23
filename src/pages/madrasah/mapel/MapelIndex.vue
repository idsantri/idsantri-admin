<template lang="">
	<q-page class="q-pa-sm">
		<q-card>
			<CardHeader title="Daftar Mata Pelajaran" @on-reload="loadData(tingkatId)" :show-reload="!!tingkatId">
				<template #right>
					<q-btn
						class="text-green-10 q-px-sm q-ml-sm"
						label="Baru"
						icon="add"
						no-caps
						color="green-11"
						@click="addNew"
						dense
					/>
				</template>
			</CardHeader>

			<q-card-actions align="right" class="bg-green-1">
				<div class="text-subtitle2 q-mr-sm text-italic">Pilih Tingkat Pendidikan:</div>
				<InputSelectTingkatPendidikan
					style="width: 300px"
					v-model="tingkatId"
					label="Tingkat Pendidikan"
					:with-hint="false"
				/>
			</q-card-actions>
			<q-card-section class="q-pa-sm">
				<q-markup-table flat>
					<thead>
						<tr class="text-left">
							<th>No</th>
							<th>Kode/ID</th>
							<th>Mata Pelajaran</th>
							<th>Alias</th>
							<th>Status Fan</th>
							<th>Tampil</th>
							<th class="text-center">Edit</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="loading">
							<td colspan="7">
								<q-skeleton height="50px" />
							</td>
						</tr>
						<tr v-else-if="mapel.length == 0">
							<td colspan="7" class="text-center text-green-10 text-italic">
								&mdash; Tidak ada data untuk ditampilkan &mdash;
								<br />
								&mdash; Pilih Tingkat Pendidikan &mdash;
							</td>
						</tr>

						<tr v-else v-for="item in mapel" :key="item.id">
							<td>{{ item.sequence }}</td>
							<td>{{ item.id }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.alias }}</td>
							<td>{{ item.category }}</td>
							<td>
								<q-toggle :model-value="item.show ? true : false" color="green" disable />
							</td>
							<td class="text-center">
								<q-btn icon="edit" flat color="green" @click="onEdit(item)" />
							</td>
						</tr>
					</tbody>
				</q-markup-table>
			</q-card-section>
		</q-card>
		<!-- <pre>{{ mapel }}</pre> -->
		<q-dialog v-model="crudShow">
			<MapelForm
				:data="mapelObj"
				@success-submit="(val) => loadData(val.tingkat_id)"
				@success-delete="(val) => loadData(val.tingkat_id)"
			/>
		</q-dialog>
	</q-page>
</template>
<script setup>
import { ref, watch } from 'vue';
import apiGet from 'src/api/api-get';
import MapelForm from 'src/components/forms/MapelForm.vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';

const mapel = ref([]);
const tingkatId = ref('');
const loading = ref(false);
const mapelObj = ref({});
const crudShow = ref(false);

async function loadData(id) {
	const data = await apiGet({
		endPoint: 'mapel',
		loading,
		params: { tingkat_id: id },
	});
	mapel.value = data.mapel;
}

watch(tingkatId, async (newVal) => {
	if (newVal) {
		await loadData(newVal);
	} else {
		mapel.value = [];
	}
});

function onEdit(item) {
	mapelObj.value = item;
	crudShow.value = true;
}

function addNew() {
	mapelObj.value = { tingkat_id: tingkatId.value };
	crudShow.value = true;
}
</script>
<style lang=""></style>
