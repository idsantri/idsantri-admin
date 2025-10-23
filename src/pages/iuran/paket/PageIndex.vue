<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="">
			<CardHeader title="Pengaturan Paket Iuran" @onReload="getData" />

			<q-card-section class="q-pa-sm">
				<q-card style="max-width: 800px" flat bordered>
					<q-card-section class="q-pa-sm flex justify-between">
						<q-select
							label="Pilih nama paket"
							dense
							outlined
							:options="groupPaket()"
							:loading="loading"
							v-model="filterModel"
							clearable
							style="width: 250px; min-width: 200px"
						/>
						<q-btn
							dense
							icon="add"
							label="Baru"
							color="green-10"
							no-caps
							outline
							class="q-px-sm"
							title="Buat/tambahkan data baru"
							@click="addPaket()"
						/>
					</q-card-section>
					<q-card-section class="q-pa-sm">
						<q-markup-table flat bordered>
							<thead>
								<tr>
									<th class="text-center">No</th>
									<th class="text-left">Nama Paket</th>
									<th class="text-left">Iuran</th>
									<th class="text-right">Nominal</th>
									<th class="text-center">Edit</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="loading">
									<td colspan="7" class="text-center bg-grey-1 no-padding">
										<q-spinner-facebook
											color="green"
											size="md"
											class="text-center flex flex-center q-mx-auto"
										/>
									</td>
								</tr>

								<tr v-else-if="!iuranPaket.length && !loading">
									<td colspan="7" class="text-center text-italic text-negative bg-red-2">
										Tidak ada data untuk ditampikan!<br />
										Silakan Tambahkan data baru!
									</td>
								</tr>

								<tr v-else-if="!filterModel">
									<td colspan="7" class="text-center text-italic text-negative bg-red-1">
										Pilih filter!
									</td>
								</tr>

								<tr v-else v-for="(item, index) in filterPaket()" :key="index">
									<td class="text-center">{{ item.urut }}</td>
									<td class="text-left">{{ item.paket }}</td>
									<td class="text-left">{{ item.item }}</td>
									<td class="text-right">
										{{ item.nominal.toRupiah() }}
									</td>
									<td class="text-center">
										<q-btn icon="edit" flat color="green-10" @click="editPaket(item)" />
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr class="bg-green-1">
									<td class="text-right text-italic" colspan="3">Total</td>
									<td class="text-right text-bold">
										{{ calculateTotal().toRupiah() }}
									</td>
									<td class="text-center"></td>
								</tr>
							</tfoot>
						</q-markup-table>
					</q-card-section>
				</q-card>
			</q-card-section>
		</q-card>
		<q-dialog v-model="crudShow">
			<!-- add new -->
			<IuranPaketForm :data="dataPaket" @success-submit="getData()" @success-delete="getData()" />
		</q-dialog>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiGet from 'src/api/api-get';
import IuranPaketForm from 'src/components/forms/IuranPaketForm.vue';

const loading = ref(false);
const iuranPaket = ref([]);
const filterModel = ref('');
const crudShow = ref(false);
const dataPaket = ref({});

async function getData() {
	const data = await apiGet({ endPoint: 'iuran-paket', loading });
	if (data) {
		iuranPaket.value = data.iuran_paket;
	}
}

onMounted(async () => {
	await getData();
});

function groupPaket() {
	const arrPaket = iuranPaket.value.map((obj) => obj.paket);
	return Array.from(new Set(arrPaket));
}

function filterPaket() {
	return iuranPaket.value.filter((obj) => obj.paket == filterModel.value);
}

function calculateTotal() {
	return filterPaket().reduce(function (acc, obj) {
		return acc + Number(obj.nominal);
	}, 0);
}

function addPaket() {
	dataPaket.value = { paket: filterModel.value };
	crudShow.value = true;
}

function editPaket(paket) {
	dataPaket.value = paket;
	crudShow.value = true;
}
</script>
<style lang=""></style>
