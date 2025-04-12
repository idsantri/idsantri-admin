<template lang="">
	<q-form @submit.prevent="onSubmit">
		<q-card class="">
			<q-card-section
				class="q-pa-sm text-subtitle2 text-italic bg-green-11"
			>
				Tentukan iuran yang ingin Anda unduh!
			</q-card-section>

			<q-card-section class="q-pa-sm">
				<select-tahun-ajaran
					v-model="input.th_ajaran_h"
					required
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-select
					dense
					class="q-mt-sm"
					outlined
					label="Iuran"
					emit-value
					map-options
					v-model="input.iuran"
					:options="lists['iuran-old']"
					:loading="loading['iuran-old']"
					clearable=""
					behavior="menu"
				/>
				<q-select
					dense
					class="q-mt-sm"
					outlined
					label="Kasir"
					emit-value
					map-options
					v-model="input.kasir"
					:options="lists['kasir']"
					:loading="loading['kasir']"
					clearable=""
					behavior="menu"
				/>
				<q-select
					dense
					class="q-mt-sm"
					outlined
					label="Via"
					emit-value
					map-options
					v-model="input.via"
					:options="lists['via']"
					:loading="loading['via']"
					clearable=""
					behavior="menu"
				/>
			</q-card-section>
			<q-card-actions class="q-pa-sm bg-green-6" align="right">
				<q-btn
					label="Unduh"
					icon="download"
					no-caps
					class="bg-green-10 text-green-11"
					type="submit"
				/>
			</q-card-actions>
		</q-card>
	</q-form>
</template>
<script setup>
import { onMounted, ref, toRefs, watch } from 'vue';
import loadingStore from 'src/stores/loading-store';
import listsIuranStore from 'src/stores/lists-iuran-store';
import apiGet from 'src/api/api-get';
import { getListsCustom } from 'src/api/api-get-lists';
import { notifyWarning } from 'src/utils/notify';
import SelectTahunAjaran from 'pages/bendahara/SelectTahunAjaran.vue';

const { loadingMain } = toRefs(loadingStore());
const input = ref({});
const lists = ref([]);
const loading = ref([]);

onMounted(async () => {});

async function fetchList(th_ajaran_h, listKey) {
	const checkLists = listsIuranStore().getItemByTahun(listKey, th_ajaran_h);
	if (checkLists.length > 0) {
		lists.value[listKey] = checkLists;
	} else {
		const data = await getListsCustom({
			loadingArray: loading,
			key: listKey,
			url: 'iuran-old/lists',
			params: { th_ajaran_h, key: listKey },
			sort: true,
		});
		listsIuranStore().addItemToTahun(data, listKey, th_ajaran_h);
		lists.value[listKey] = data;
	}
}

async function onSubmit() {
	const params = JSON.parse(JSON.stringify(input.value));
	const data = await apiGet({
		endPoint: 'export/iuran-old',
		loading: loadingMain,
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
	async (newValue, oldValue) => {
		if (newValue && newValue != oldValue) {
			input.value.iuran = '';
			await fetchList(newValue, 'iuran-old');

			input.value.kasir = '';
			await fetchList(newValue, 'kasir');

			input.value.via = '';
			await fetchList(newValue, 'via');
		}
	},
);
</script>
<style lang=""></style>
