<template lang="">
	<CardPage>
		<CardHeader title="Download Nilai" :show-reload="false">
			<template #buttons>
				<q-btn
					label="Nilai Mapel"
					to="/madrasah/nilai-mapel"
					dense
					outline
					no-caps
					class="q-px-sm"
					icon="show_chart"
				/>
				<q-btn
					label="Upload"
					to="/madrasah/nilai-mapel/upload"
					dense
					outline
					no-caps
					icon="upload"
					class="q-px-sm"
				/>
			</template>
		</CardHeader>

		<q-card-section class="q-pa-sm">
			<q-form @submit.prevent="onSubmit">
				<q-card style="max-width: 425px">
					<q-card-section class="q-pa-sm">
						<q-select
							dense
							class=""
							outlined
							label="Tahun Ajaran"
							emit-value
							map-options
							v-model="input.th_ajaran_h"
							:options="lists['th_ajaran']"
							option-value="th_ajaran_h"
							option-label="th_ajaran_h"
							clearable=""
							behavior="menu"
							required
							:rules="[(val) => !!val || 'Harus diisi!']"
						/>
						<q-select
							dense
							class=""
							outlined
							label="Tingkat Pendidikan"
							emit-value
							map-options
							option-value="tingkat_id"
							option-label="tingkat"
							v-model="input.tingkat_id"
							:options="lists['tingkat']"
							:loading="loading['tingkat']"
							clearable=""
							behavior="menu"
							required
							:rules="[(val) => !!val || 'Harus diisi!']"
						/>
						<q-select
							dense
							class=""
							outlined
							label="Kelas"
							emit-value
							map-options
							v-model="input.kelas"
							:options="lists['kelas']"
							:loading="loading['kelas']"
							clearable=""
							behavior="menu"
							required
							:rules="[(val) => !!val || 'Harus diisi!']"
						/>

						<q-select
							dense
							class="q-mt-sm"
							outlined
							label="Kategori Nilai"
							v-model="input.category"
							behavior="menu"
							required
							:options="listsCategory"
							emit-value
							map-options
							:rules="[(val) => !!val || 'Harus diisi!']"
						/>
						<q-input
							dense
							class="q-mt-sm"
							outlined
							label="Ujian Ke"
							v-model="input.ujian_ke"
							required
							type="number"
							:rules="[(val) => (val > 0 && val < 5) || 'antara 1 s.d. 4']"
						/>
					</q-card-section>
					<q-card-actions class="bg-green-6" align="right">
						<q-btn
							class=""
							type="submit"
							label="Download"
							icon="download"
							color="green-11"
							no-caps
							outline
							dense
						/>
					</q-card-actions>
					<CardLoading :showing="loadingForm" />
				</q-card>
			</q-form>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import apiGet from 'src/api/api-get';
import { getListsCustom } from 'src/api/api-get-lists';
import listsMadrasahStore from 'src/stores/lists-madrasah-store';
import { notifyWarning } from 'src/utils/notify';

const loadingForm = ref(false);
const input = ref({});
const loading = ref([]);
const lists = ref([]);
const listsCategory = [
	{
		value: 'ujian',
		label: 'Nilai Ujian',
	},
	{
		value: 'harian',
		label: 'Nilai Harian',
	},
	{
		value: 'rapor',
		label: 'Nilai Rapor',
	},
	{
		value: 'ijazah',
		label: 'Nilai Ijazah',
	},
];

const th = listsMadrasahStore().getThAjaran;
lists.value['th_ajaran'] = th;

onMounted(async () => {
	const th = listsMadrasahStore().getThAjaran;
	lists.value['th_ajaran'] = th;
	if (th.length == 0) {
		const data = await getListsCustom({
			url: 'kelas/lists',
			key: 'th_ajaran',
			loadingArray: loading,
		});
		listsMadrasahStore().setThAjaran(data);
		lists.value['th_ajaran'] = data;
	} else {
		lists.value['th_ajaran'] = th;
	}
	// console.log('t', lists.value['th_ajaran']);
});

async function onSubmit() {
	const params = JSON.parse(JSON.stringify(input.value));
	const data = await apiGet({
		endPoint: 'export/nilai-mapel',
		loading: loadingForm,
		params,
	});

	if (!data) return;
	if (!data.url) return notifyWarning('Url tidak ditemukan');

	const link = document.createElement('a');
	link.href = data.url;
	link.click();
	link.remove();
}

watch(
	() => input.value.th_ajaran_h,
	async (newModel) => {
		input.value.tingkat_id = '';
		input.value.kelas = '';
		if (newModel) {
			const cekTingkat = listsMadrasahStore().getTingkatByTahun(newModel);
			if (cekTingkat.length) {
				lists.value['tingkat'] = cekTingkat;
			} else {
				const data = await getListsCustom({
					url: 'kelas/lists',
					params: { th_ajaran_h: newModel },
					key: 'tingkat',
					loadingArray: loading,
					sort: 'asc',
				});
				listsMadrasahStore().addTingkatToTahun(data, newModel);
				lists.value['tingkat'] = data;
			}
		} else {
			lists.value['tingkat'] = [];
		}
		lists.value['kelas'] = [];
	},
);

watch(
	() => input.value.tingkat_id,
	async (newModel) => {
		input.value.kelas = '';
		if (newModel) {
			const cekKelas = listsMadrasahStore().getKelasByTingkatAndTahun(newModel, input.value.th_ajaran_h);
			if (cekKelas.length) {
				lists.value['kelas'] = cekKelas;
			} else {
				const data = await getListsCustom({
					url: 'kelas/lists',
					params: {
						th_ajaran_h: input.value.th_ajaran_h,
						tingkat_id: newModel,
					},
					key: 'kelas',
					loadingArray: loading,
					sort: 'asc',
				});

				listsMadrasahStore().addKelasToTingkatByTahun(data, newModel, input.value.th_ajaran_h);
				lists.value['kelas'] = data;
			}
		} else {
			lists.value['kelas'] = [];
		}
	},
);
</script>
<style lang=""></style>
