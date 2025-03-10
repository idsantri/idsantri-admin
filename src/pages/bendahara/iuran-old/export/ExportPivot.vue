<template lang="">
	<q-form @submit.prevent="onSubmit">
		<q-card>
			<q-card-section
				class="q-pa-sm text-subtitle2 text-italic bg-green-11"
			>
				Tentukan Tahun Ajaran Iuran dan status santri yang ingin Anda
				unduh!
			</q-card-section>

			<q-card-section class="q-pa-sm">
				<select-tahun-ajaran
					v-model="input.th_ajaran_h"
					required
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<div class="row">
					<div
						v-for="(item, index) in status"
						:key="index"
						class="col-6"
					>
						<q-radio
							v-model="input.status"
							:val="item"
							:label="item"
						/>
					</div>
				</div>
			</q-card-section>
			<q-card-actions align="right" class="bg-green-6 q-pa-sm">
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
import { onMounted, ref, toRefs } from 'vue';
import apiGet from 'src/api/api-get';
import loadingStore from 'src/stores/loading-store';
import SelectTahunAjaran from 'pages/bendahara/SelectTahunAjaran.vue';
import { notifyError } from 'src/utils/notify';

const { loadingMain } = toRefs(loadingStore());
const status = ref([]);
const input = ref({});

async function onSubmit() {
	const params = JSON.parse(JSON.stringify(input.value));
	if (!params.th_ajaran_h || !params.status)
		return notifyError('Tentukan tahun ajaran dan status!');
	// console.log(params);
	const { url } = await apiGet({
		endPoint: 'export/iuran-old-pivot',
		loading: loadingMain,
		params,
	});

	if (!url) return notifyWarning('Url tidak ditemukan');

	let link = document.createElement('a');
	link.href = url;
	link.click();
	link.remove();
}

async function loadData() {
	const data = await apiGet({
		endPoint: 'status/lists',
		loading: loadingMain,
	});
	// console.log(data);
	status.value = data.status;
}
onMounted(async () => {
	await loadData();
});
</script>
<style lang=""></style>
