<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="">
			<q-card-section class="bg-green-8 text-green-11 q-pa-sm">
				<q-toolbar
					class="no-padding text-green-11"
					style="min-height: 0"
				>
					<q-toolbar-title class="text-subtitle1">
						Data Mutasi Domisili
					</q-toolbar-title>
					<q-btn
						icon="tune"
						label="Atur Mutasi"
						dense
						outline
						no-caps
						class="q-mr-xs q-px-sm"
						to="/makhadiyah/mutasi/start"
					/>
					<q-btn-dropdown
						flat
						dense
						dropdown-icon="more_vert"
						class="q-ml-md"
						color="green-11"
					>
						<q-list>
							<q-item v-close-popup to="/info/download">
								<q-item-section>
									<q-item-label>Cetak</q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-icon name="print" flat />
								</q-item-section>
							</q-item>

							<q-item
								v-close-popup
								@click="downloadMutasi"
								clickable
							>
								<q-item-section>
									<q-item-label>Unduh/Download</q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-icon name="download" flat />
								</q-item-section>
							</q-item>
							<q-item v-close-popup @click="deleteAll" clickable>
								<q-item-section>
									<q-item-label>Hapus Semua</q-item-label>
								</q-item-section>
								<q-item-section avatar>
									<q-icon name="delete_forever" flat />
								</q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</q-toolbar>
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<q-table
					class="q-pa-sm"
					:rows="santri"
					:loading="loading"
					:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
					flat
					bordered
				>
					<template v-slot:header="props">
						<q-tr :props="props">
							<q-th
								key="santri_id"
								:props="props"
								class="text-left"
							>
								ID Santri
							</q-th>
							<q-th key="nama" :props="props"> Nama </q-th>
							<q-th key="tk" :props="props">
								Tingkat &mdash; Kelas
							</q-th>
							<q-th key="domisili" :props="props">
								Domisili (Asal)
							</q-th>
							<q-th key="new_domisili" :props="props">
								Domisili (Baru)
							</q-th>
							<q-th class="text-center">
								<!-- <q-btn
									icon="edit"
									flat
									color="green-6"
									disable
								/> -->
							</q-th>
						</q-tr>
					</template>
					<template v-slot:body="props">
						<q-tr :props="props">
							<q-td
								key="santri_id"
								:props="props"
								class="text-left"
							>
								<q-btn
									:label="props.row.santri_id"
									outline
									color="green-10"
									class="text-caption q-px-sm"
									dense
									:to="`/santri/${props.row.santri_id}`"
								/>
							</q-td>
							<q-td key="nama" :props="props">
								{{ props.row.nama }}
							</q-td>
							<q-td key="tk" :props="props">
								{{ props.row.tk }}
							</q-td>
							<q-td key="domisili" :props="props">
								{{ props.row.domisili }}
							</q-td>
							<q-td key="new_domisili" :props="props">
								{{ props.row.new_domisili }}
							</q-td>
							<q-td key="id" :props="props" class="text-center">
								<q-btn
									icon="edit"
									flat
									color="green-10"
									@click="edit(props.row)"
								/>
							</q-td>
						</q-tr>
					</template>
				</q-table>
			</q-card-section>
			<q-card-actions class="q-pa-sm bg-green-7 text-green-11 row">
				<div class="col text-italic">
					1) Teliti kembali sebelum Anda menekan tombol Update; 2)
					Lakukan backup data dengan menekan tombol download!;
				</div>
				<q-btn
					style="max-width: 150px"
					class="col bg-green-8 q-ml-md"
					label="Update Domisili"
					glossy
					no-caps
					dense
					outline
					icon="settings_applications"
					:disable="!santri.length > 0"
					@click="updateDomisili"
				/>
			</q-card-actions>
		</q-card>
		<q-dialog v-model="showEdit">
			<EditNewDomisili
				:data="mutasiItem"
				:api="true"
				@on-delete="loadData"
				@on-submit="loadData"
			/>
		</q-dialog>
	</q-page>
</template>
<script setup>
import apiDelete from 'src/api/api-delete';
import apiGet from 'src/api/api-get';
import { onMounted, ref, toRefs } from 'vue';
import EditNewDomisili from 'pages/makhadiyah/mutasi/EditMutasi.vue';
import apiPost from 'src/api/api-post';
import loadingStore from 'src/stores/loading-store';
import { notifyWarning } from 'src/utils/notify';

const santri = ref([]);
const loading = ref(false);
const showEdit = ref(false);
const mutasiItem = ref({});
const { loadingMain } = toRefs(loadingStore());

async function loadData() {
	const data = await apiGet({ endPoint: 'mutasi', loading });
	if (data) {
		santri.value = data.mutasi.map((s) => {
			return { ...s, tk: s.tingkat_id + ' ' + s.kelas };
		});
	}
}

onMounted(async () => {
	await loadData();
});

async function edit(item) {
	mutasiItem.value = item;
	showEdit.value = true;
}

async function updateDomisili() {
	const message = `<hr><span style="color:blue">Update Domisili?</span><hr>
		<em>
			<strong>Peringatan:</strong>
			<ul style="margin:0">
				<li>Pastikan semua keperluan Administrasi (terkait domisili asal) telah selesai!</li>
				<li>Sebaiknya data di-download/ diunduh terlebih dahulu sebagai backup!</li>
				<li>Setelah update selesai, semua data mutasi akan <strong>dihapus</strong>!</li>
			</ul>
		</em>`;
	const post = await apiPost({
		endPoint: 'mutasi/execute',
		data: null,
		loading,
		confirm: true,
		message,
	});
	if (post) {
		await loadData();
	}
}

async function deleteAll() {
	const del = await apiDelete({
		endPoint: 'mutasi/clean',
		loading,
		message: 'Hapus semua data mutasi?',
	});
	if (del) {
		santri.value = [];
	}
}

async function downloadMutasi() {
	const data = await apiGet({
		endPoint: 'export/mutasi',
		loading: loadingMain,
		notify: true,
	});

	if (!data) return;
	if (!data.url) return notifyWarning('Url tidak ditemukan');

	const link = document.createElement('a');
	link.href = data.url;
	link.click();
	link.remove();
}
</script>
<style lang=""></style>
