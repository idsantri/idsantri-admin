<template>
	<div class="relative-position">
		<div v-if="iuran.length > 0">
			<q-list>
				<q-item class="q-pa-sm bg-green-11">
					<q-item-section class="flex">
						<table class="" style="min-width: 250px; max-width: 300px">
							<tbody>
								<tr>
									<td class="text-caption text-italic q-pr-md">Total Tagihan</td>
									<td class="text-right">
										{{ sumNominal(iuran).toRupiah() }}
									</td>
								</tr>
								<tr>
									<td class="text-caption text-italic q-pr-md">Total Pembayaran</td>
									<td class="text-right">
										{{ sumLunas(iuran).toRupiah() }}
									</td>
								</tr>
								<tr>
									<td class="text-caption text-italic q-pr-md">Sisa Tagihan</td>
									<td class="text-right text-weight-bold">
										{{ sumNotLunas(iuran).toRupiah() }}
									</td>
								</tr>
							</tbody>
						</table>
					</q-item-section>
				</q-item>
				<div v-for="(item, index) in iuran" :key="index">
					<q-item class="q-px-sm" clickable="" @click.stop="item.show = !item.show">
						<q-item-section>
							<q-item-label overline>
								{{ item.item }}
							</q-item-label>
							<q-item-label>
								{{ item.nominal.toRupiah() }}
							</q-item-label>
						</q-item-section>
						<q-item-section side>
							<div class="flex items-center q-gutter-x-sm">
								<div class="q-card--bordered rounded-borders q-px-sm">
									<q-toggle
										label="Lunas"
										color="green"
										class="text-green-10"
										v-model="item.isLunas"
										checked-icon="check"
										unchecked-icon="clear"
										:true-value="true"
										:false-value="false"
										@update:model-value="(value, event) => toggleLunas(value, event, item, index)"
									/>
								</div>
								<div class="q-card--bordered rounded-borders q-px-sm">
									<q-toggle
										:disable="!item.lunas"
										label="Cetak"
										color="green"
										class="text-green-10"
										v-model="item.cetak"
										checked-icon="check"
										unchecked-icon="clear"
										:true-value="1"
										:false-value="0"
										@update:model-value="(val, evt) => toggleCetak(val, evt, item, index)"
									/>
								</div>
								<q-btn
									icon="edit"
									glossy
									outline
									dense
									round=""
									color="green-8"
									unelevated=""
									@click.stop="editIuran(item)"
								/>
							</div>
						</q-item-section>
					</q-item>
					<q-item v-if="item.show" class="q-px-sm q-pb-sm q-pt-none">
						<q-item-section>
							<q-item-label>
								<em>Lunas:</em>&nbsp;
								{{
									item.lunas
										? formatDate(item.lunas, "'hari' EEEE, 'tanggal' dd MMMM yyyy, 'pukul' HH:mm")
										: '-'
								}}
							</q-item-label>
							<q-item-label caption>
								<em>Kasir:</em>&nbsp;<strong>{{ item.kasir || '-' }}</strong
								>; <em>Via:</em>&nbsp;<strong>{{ item.via || '-' }}</strong
								>; <em>Ket.:</em>&nbsp;<strong>{{ item.keterangan || '-' }}</strong>
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-separator />
				</div>
				<q-item class="q-pa-sm bg-green-8">
					<q-item-section class="text-green-11">
						<q-item-label overline class="text-green-1">
							TOTAL CETAK
							<span class="text-subtitle1 text-weight-bold">
								{{ sumCetak(iuran).toRupiah() }}
							</span>
						</q-item-label>
					</q-item-section>
					<q-item-section side class="">
						<div class="flex flex-center">
							<DropDownPrint
								:data="{
									santri_id: santriId,
									th_ajaran_h: thAjaranH,
								}"
							/>
						</div>
					</q-item-section>
				</q-item>
			</q-list>
		</div>
		<div v-else class="q-ma-lg">
			<div class="text-body2 text-italic text-center">Tidak ada data untuk ditampilkan!</div>
			<hr />
			<div class="text-weight-thin text-italic text-center">Klik angka tahun disamping, atau tambahkan data!</div>
		</div>

		<CardLoading :showing="loading" />
		<!-- edit -->
		<q-dialog v-model="crud">
			<IuranForm
				:data="dataIuran"
				@success-delete="(id) => deleteById(iuran, id)"
				@success-create="(res) => iuran.push(res)"
				@success-update="(res) => replaceById(iuran, res.id, res)"
				:disable-santri-id="true"
				:disable-th-ajaran="true"
			/>
		</q-dialog>

		<!-- Lunas -->
		<q-dialog v-model="crudLunas">
			<IuranLunasForm :data="dataIuran" @success-update="(res) => replaceById(iuran, res.id, res)" />
		</q-dialog>
	</div>
</template>
<script setup>
import { inject, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import apiUpdate from 'src/api/api-update';
import { formatDate } from 'src/utils/format-date';
import IuranForm from 'src/components/forms/IuranForm.vue';
import { deleteById, replaceById } from 'src/utils/array-object';
import { sumNominal, sumLunas, sumNotLunas, sumCetak } from '../../utils';
import DropDownPrint from './DropDownPrint.vue';
import IuranLunasForm from 'src/components/forms/IuranLunasForm.vue';

const { params } = useRoute();
const thAjaranH = ref(params.thAjaranH);
const santriId = ref(params.id);
const loading = ref(false);
const iuran = ref([]);
const crud = ref(false);
const dataIuran = ref({});
const santri = inject('santri');
const crudLunas = ref(false);

function editIuran(item) {
	dataIuran.value = item;
	dataIuran.value.nama = santri.value.nama;
	dataIuran.value.data_akhir = santri.value.data_akhir;
	crud.value = true;
}

async function loadData() {
	if (thAjaranH.value && santriId.value) {
		const data = await apiGet({
			endPoint: `iuran/santri/${santriId.value}`,
			params: { th_ajaran_h: thAjaranH.value },
			loading,
		});
		if (data) {
			iuran.value = sortMapIuran(data.iuran);
		}
	}
}

onMounted(async () => await loadData());

async function toggleCetak(val, evt, item, index) {
	const updated = await apiUpdate({
		endPoint: `iuran/${item.id}/cetak`,
		confirm: false,
		notify: false,
	});
	if (!updated) {
		iuran.value[index].cetak = val == 1 ? 0 : 1;
	}
}

async function toggleLunas(val, evt, item, index) {
	if (val) {
		return setLunas(item, index);
	}
	const updated = await apiUpdate({
		endPoint: `iuran/${item.id}/not-lunas`,
		message: 'Iuran/tagihan TIDAK lunas?',
		loading: loading,
	});
	if (updated) {
		iuran.value[index] = updated.iuran;
	} else {
		iuran.value[index].isLunas = val == true ? false : true;
	}
}

async function setLunas(item, index) {
	dataIuran.value = item;
	dataIuran.value.nama = santri.value.nama;
	dataIuran.value.data_akhir = santri.value.data_akhir;

	crudLunas.value = true;
	iuran.value[index].isLunas = false;
}

// Watch untuk sorting tanpa loop
watch(
	iuran,
	async (newValue, oldValue) => {
		await nextTick(); // Pastikan update UI selesai sebelum sorting

		const sortedData = sortMapIuran([...newValue]); // Buat salinan agar tidak mengubah langsung
		if (JSON.stringify(sortedData) !== JSON.stringify(oldValue)) {
			iuran.value = sortedData; // Update hanya jika ada perubahan nyata
		}
	},
	{ deep: true },
);

function sortMapIuran(data) {
	return data
		.sort((a, b) => {
			if (a.lunas === null && b.lunas === null) return 0;
			if (a.lunas === null) return 1;
			if (b.lunas === null) return -1;
			return new Date(a.lunas) - new Date(b.lunas);
		})
		.map((v) => ({
			...v,
			isLunas: !!v.lunas,
			show: Object.prototype.hasOwnProperty.call(v, 'show') ? v.show : false,
		}));
}
</script>
<style lang=""></style>
