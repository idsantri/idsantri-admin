<template lang="">
	<q-page class="q-pa-sm" style="min-width: 1024px">
		<q-card>
			<CardHeader :show-reload="false" title="Modul Tagihan" />
			<q-card-section class="q-pa-sm">
				<FilterKelas
					bordered
					flat
					:show-ujian-ke="false"
					start-url="/iuran/tagihan"
					@data-filter="(v) => (textFilter = v)"
				/>
				<div class="row">
					<div class="col-7 q-mt-sm">
						<q-table
							flat
							bordered
							table-header-class="bg-green-2 text-green-10 text-subtitle1"
							class="dt"
							:rows="murid"
							:columns="columns"
							:loading="loading"
							row-key="id"
							selection="multiple"
							v-model:selected="selected"
							:rows-per-page-options="[0]"
							hide-bottom
							style="height: 635px"
							virtual-scroll
						>
							<template v-slot:header-selection="scope">
								<q-toggle
									v-model="scope.selected"
									color="green-7"
									checked-icon="check"
									unchecked-icon="clear"
								/>
							</template>

							<template v-slot:body-selection="scope">
								<q-toggle
									v-model="scope.selected"
									color="green-5"
									checked-icon="check"
									unchecked-icon="clear"
								/>
							</template>
						</q-table>
					</div>
					<div class="col-5 q-mt-sm">
						<q-card
							bordered
							flat
							class="q-ml-sm scroll"
							style="height: 635px"
						>
							<q-card-section
								class="q-px-sm q-py-md bg-green-2 text-green-10 text-subtitle2"
							>
								Buat Tagihan Massal
							</q-card-section>
							<q-card-section class="q-pa-sm">
								<table>
									<tbody>
										<tr class="vertical-top">
											<td
												class="text-no-wrap text-italic q-pr-md"
											>
												Jumlah Murid
											</td>
											<td>{{ murid.length }}</td>
										</tr>
										<tr class="vertical-top">
											<td
												class="text-no-wrap text-italic q-pr-md"
											>
												Terpilih
											</td>
											<td>
												{{ selected.length }} santri
												{{
													selected.map(
														(s) => s.santri_id,
													)
												}}
											</td>
										</tr>
										<tr class="vertical-top">
											<td
												class="text-no-wrap text-italic q-pr-md"
											>
												VA Group
											</td>
											<td class="">
												<q-toggle
													dense
													v-model="withVA"
													color="green"
													:label="va_group"
													@update:model-value="
														(v) =>
															v
																? (va_group =
																		va_text)
																: (va_group =
																		'')
													"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</q-card-section>
							<q-card-section class="q-pa-sm">
								<q-input
									label="Tahun Ajaran"
									outlined
									dense
									v-model="input.th_ajaran_h"
									disable
								/>
								<InputSelectIuranPaket
									class="q-mt-sm"
									@on-input="iuranPaket = $event"
								/>
							</q-card-section>
							<q-card-actions
								class="q-pa-sm bg-green-6 absolute-bottom"
							>
								<q-btn
									label="Unduh Data"
									glossy
									color="green-9"
									class="text-green-11"
									no-caps
									icon="download"
									to="/iuran/download"
								/>
								<q-space />
								<q-btn
									label="Simpan"
									glossy
									outline
									color="green-10"
									class="bg-green-11 right-0"
									no-caps
									icon="save"
									@click="onSubmit"
								/>
							</q-card-actions>
							<q-inner-loading :showing="loadingPaket">
								<q-spinner-facebook
									color="green-6"
									size="6em"
								/>
							</q-inner-loading>
						</q-card>
					</div>
				</div>
			</q-card-section>
		</q-card>
		<!-- <q-card flat bordered>
			<pre>{{ iuranPaket }}</pre>
		</q-card> -->
	</q-page>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';
import CardHeader from 'src/components/CardHeader.vue';
import FilterKelas from 'src/components/filters/FilterKelas.vue';
import InputSelectIuranPaket from 'src/components/inputs/InputSelectIuranPaket.vue';
import { notifyError } from 'src/utils/notify';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import useAuthStore from 'src/stores/auth-store';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const auth = useAuthStore();
const { email } = auth.getUser;
const withVA = ref(false);
const textFilter = ref('');
const loading = ref(false);
const { params } = useRoute();
const murid = ref([]);
const selected = ref([]);
const iuranPaket = ref([]);
const loadingPaket = ref(false);
const input = ref({ th_ajaran_h: params.th_ajaran_h || '' });
const va_text =
	format(new Date(), 'yyyy-MM-dd HH:mm:ss', {
		locale: id,
	}) +
		' ~ ' +
		email || '';
const va_group = ref('');

async function loadData() {
	const data = await apiGet({
		endPoint: 'kelas',
		params: {
			th_ajaran_h: params.th_ajaran_h,
			tingkat_id: params.tingkat_id,
			kelas: params.kelas,
		},
		loading,
	});
	if (data) {
		murid.value = data.murid;
	}
}

onMounted(async () => {
	if (params.th_ajaran_h && params.tingkat_id && params.kelas) {
		await loadData();
	} else {
		murid.value = [];
	}
});

async function onSubmit() {
	if (!selected.value.length) {
		return notifyError('Pilih murid terlebih dahulu');
	}
	if (!iuranPaket.value.length) {
		return notifyError('Pilih paket terlebih dahulu');
	}
	const data = {
		th_ajaran_h: input.value.th_ajaran_h,
		va_group: va_group.value,
		santri_id: selected.value.map((s) => s.santri_id),
		paket: iuranPaket.value.map((i) => {
			return { item: i.item, nominal: i.nominal };
		}),
	};
	// console.log('🚀 ~ onSubmit ~ data:', data);
	// return;
	await apiPost({
		endPoint: 'iuran/paket-massal',
		loading: loadingPaket,
		data,
		message: `PERHATIAN<br/>
			Jika item iuran sudah terdapat dalam daftar maka akan diabaikan.
			<hr/>
			<span style="color:red">Kesalahan akibat aksi ini sulit ditelusuri dan harus diperbaiki satu per satu.</span>`,
	});
}
const columns = [
	{
		name: 'santri_id',
		label: 'ID Santri',
		align: 'left',
		field: 'santri_id',
		sortable: true,
	},
	{
		name: 'nama',
		label: 'Nama',
		align: 'left',
		field: 'nama',
		sortable: true,
	},
	{
		name: 'domisili',
		label: 'Domisili',
		align: 'left',
		field: 'domisili',
		sortable: true,
	},
	{
		name: 'status',
		label: 'Status',
		align: 'left',
		field: 'status',
		sortable: true,
	},
	{
		name: 'wali',
		label: 'Wali',
		align: 'left',
		field: (row) =>
			`${row.wali_nama} (${row.wali_sex}; ${row.wali_status})`,
		sortable: true,
	},
];
</script>
<style lang=""></style>
