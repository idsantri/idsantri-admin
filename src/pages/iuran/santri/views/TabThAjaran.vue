<template lang="">
	<div class="relative-position">
		<div v-if="iuran?.length > 0" class="row">
			<div class="col bg-green-1" style="max-width: 90px">
				<q-tabs vertical dense="" align="left" no-caps active-bg-color="green-11">
					<div v-for="(th, index) in arrThAjaran" :key="index">
						<q-route-tab :name="th" :label="th" :to="`/iuran/santri/${params.id}/${th}`" />
					</div>
				</q-tabs>
			</div>

			<div class="col">
				<div v-if="!params.thAjaranH" class="q-ma-lg">
					<div class="text-italic text-center">Klik angka tahun disamping, atau tambahkan data!</div>
				</div>
				<div v-else>
					<IuranSantriByTh />
				</div>
			</div>
		</div>
		<div v-else class="q-ma-lg">
			<div class="text-body2 text-italic text-center">Tidak ada data untuk ditampilkan!</div>
			<hr />
			<div class="text-weight-thin text-italic text-center">
				Yang bersangkutan belum pernah melakuan pembayaran.
				<br />
				Silakan klik tombol tambah!
			</div>
		</div>
		<CardLoading :showing="loading" />
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import IuranSantriByTh from './IuranSantriByTh.vue';
import Iuran from 'src/models/Iuran';

const iuran = ref([]);
const loading = ref(false);
const { params } = useRoute();
const arrThAjaran = ref([]);

async function loadData() {
	try {
		loading.value = true;
		const data = await Iuran.bySantri(params.id);
		iuran.value = data.iuran ?? [];
		arrThAjaran.value = iuran.value.map((v) => v.th_ajaran_h);
	} catch (error) {
		console.error('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	if (params.id) {
		await loadData();
	}
});
</script>
<style lang=""></style>
