<template>
	<div v-if="loading">
		<q-spinner-cube
			color="green-12"
			size="8em"
			class="flex q-ma-lg q-mx-auto"
		/>
	</div>
	<div v-else>
		<div v-if="iuran.length > 0">
			<q-list>
				<q-item class="q-pa-sm bg-green-11">
					<q-item-section>
						<table>
							<tr>
								<td class="text-caption text-italic">
									Tahun Ajaran
								</td>
								<td class="text-right">{{ thAjaranH }}</td>
							</tr>
							<tr>
								<td class="text-caption text-italic">
									Total Tagihan
								</td>
								<td class="text-right">
									{{ sumNominal().toRupiah() }}
								</td>
							</tr>
							<tr>
								<td class="text-caption text-italic">
									Total Pembayaran
								</td>
								<td class="text-right">
									{{ sumNominalLunas().toRupiah() }}
								</td>
							</tr>
							<tr>
								<td class="text-caption text-italic">
									Sisa Tagihan
								</td>
								<td class="text-right text-weight-bold">
									{{
										(
											sumNominal() - sumNominalLunas()
										).toRupiah()
									}}
								</td>
							</tr>
						</table>
					</q-item-section>
				</q-item>
				<div v-for="(item, index) in iuran" :key="index">
					<q-item
						class="q-px-sm"
						clickable=""
						@click.stop="item.show = !item.show"
					>
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
								<div
									class="q-card--bordered rounded-borders q-px-sm"
								>
									<q-toggle
										label="Lunas"
										color="green"
										class="text-green-10"
										v-model="item.isLunas"
										checked-icon="check"
										unchecked-icon="clear"
										:true-value="true"
										:false-value="false"
										@update:model-value="
											(val, evt) =>
												toggleLunas(
													val,
													evt,
													item,
													index,
												)
										"
									/>
								</div>
								<div
									class="q-card--bordered rounded-borders q-px-sm"
								>
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
										@update:model-value="
											(val, evt) =>
												toggleCetak(
													val,
													evt,
													item,
													index,
												)
										"
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
					<q-item v-if="item.show" class="q-pa-sm -q-mt-lg">
						<q-item-section>
							<q-item-label>
								<em>Tanggal bayar:</em>&nbsp;
								{{ item.lunas ? formatDate(item.lunas) : '-' }}
							</q-item-label>
							<q-item-label caption>
								<em>Kasir:</em>&nbsp;<strong>{{
									item.kasir || '-'
								}}</strong
								>; <em>Via:</em>&nbsp;<strong>{{
									item.via || '-'
								}}</strong
								>; <em>Ket.:</em>&nbsp;<strong>{{
									item.keterangan || '-'
								}}</strong>
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-separator />
				</div>
			</q-list>
		</div>
		<div v-else class="q-ma-lg">
			<div class="text-body2 text-italic text-center">
				Tidak ada data untuk ditampilkan!
			</div>
			<hr />
			<div class="text-weight-thin text-italic text-center">
				Klik angka tahun disamping, atau tambahkan data!
			</div>
		</div>
	</div>
	<!-- <pre>
		{{ iuran }}
	</pre
	> -->
	<q-dialog v-model="crud">
		<!-- edit -->
		<IuranCrud
			:data="dataIuran"
			@success-delete="(id) => onDelete(id)"
			@success-create="(res) => onCreate(res)"
			@success-update="(res) => onUpdate(res)"
			:disable-santri-id="true"
			:disable-th-ajaran="true"
		/>
	</q-dialog>
</template>
<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';
import 'src/utils/rupiah';
import apiUpdate from 'src/api/api-update';
import { formatDate } from 'src/utils/format-date';
import IuranCrud from 'src/components/forms/IuranCrud.vue';
import { deleteById, replaceById } from 'src/utils/array-object';

const { params } = useRoute();
const thAjaranH = ref(params.thAjaranH);
const santriId = ref(params.id);
const loading = ref(false);
const iuran = ref([]);
const crud = ref(false);
const dataIuran = ref({});
const santri = inject('santri');

const onDelete = (id) => {
	deleteById(iuran.value, id);
	assignIuran();
};

const onCreate = (res) => {
	iuran.value.push(res);
	assignIuran();
};
const onUpdate = (res) => {
	replaceById(iuran.value, res.id, res);
	assignIuran();
};

function editIuran(item) {
	dataIuran.value = item;
	dataIuran.value.nama = santri.value.nama;
	dataIuran.value.data_akhir = santri.value.data_akhir;
	crud.value = true;
}

function sumNominalLunas() {
	return iuran.value.reduce((total, item) => {
		// Check if the item is "lunas" (payment completed)
		if (item.lunas !== null) {
			// Add the nominal value to our running total
			return total + item.nominal;
		}
		// If not "lunas", just return the current total without adding
		return total;
	}, 0); // Start with 0 as initial value
}
function sumNominal() {
	return iuran.value.reduce((total, item) => total + item.nominal, 0);
}
async function loadData() {
	if (thAjaranH.value && santriId.value) {
		const data = await apiGet({
			endPoint: `iuran/santri/${santriId.value}`,
			params: { th_ajaran_h: thAjaranH.value },
			loading,
		});
		if (data) {
			iuran.value = data.iuran;
			assignIuran();
		}
	}
}

onMounted(async () => {
	await loadData();
});

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
	const endPoint = `iuran/${item.id}/${val ? 'set-lunas' : 'set-not-lunas'}`;
	const updated = await apiUpdate({
		endPoint,
		message: `Iuran ${val ? 'lunas' : 'TIDAK lunas'}`,
		loading: loading,
	});
	if (updated) {
		iuran.value[index] = updated.iuran;
		assignIuran();
	} else {
		iuran.value[index].isLunas = val == true ? false : true;
	}
}

function assignIuran() {
	iuran.value = sortMapIuran(iuran.value);
}

function sortMapIuran(data) {
	const result = data.sort((a, b) => {
		// Jika kedua nilai lunas adalah null, urutan tetap
		if (a.lunas === null && b.lunas === null) return 0;

		// Jika a.lunas adalah null, b.lunas harus lebih dulu
		if (a.lunas === null) return 1;

		// Jika b.lunas adalah null, a.lunas harus lebih dulu
		if (b.lunas === null) return -1;

		// Bandingkan timestamp jika keduanya tidak null
		return new Date(a.lunas) - new Date(b.lunas);
	});
	return result.map((v) => {
		return {
			...v,
			isLunas: v.lunas ? true : false,
			show: v.hasOwnProperty('show') ? v.show : false,
		};
	});
}
</script>
<style lang=""></style>
