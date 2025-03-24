<template lang="">
	<HeadFilterSantri
		start-url="/iuran/santri"
		@data-filter="(val) => (dataFilter = val)"
		:active-only="false"
		bordered
		flat
		class=""
	/>
	<div class="q-mt-sm">
		<CardSantriSimple
			v-if="params.id"
			:id="params.id"
			@loaded="(r) => (santri = r)"
		/>
		<q-card bordered flat v-else>
			<q-card-section class="q-pa-sm bg-green-11 text-subtitle2">
				No data
			</q-card-section>

			<q-card-section class="q-pa-lg text-body1 text-center">
				Pilih Santri
			</q-card-section>
		</q-card>
	</div>
	<q-card flat bordered class="q-mt-sm">
		<q-card-section
			class="q-pa-sm text-subtitle1 bg-green-6 text-green-11 flex items-center"
		>
			Data Iuran
			<q-space />
			<q-btn
				icon="sync"
				outline
				dense
				@click="tabKey++"
				class="q-px-sm q-mr-sm"
			/>
			<ButtonAdd @on-add="onAdd" @show-paket="showPaket" />
		</q-card-section>
		<q-card-section class="no-padding">
			<TabThAjaran :key="tabKey" />
		</q-card-section>
	</q-card>
	<q-dialog v-model="crud">
		<!-- edit -->
		<IuranForm
			:data="dataIuran"
			@success-create="onCreate"
			:disable-santri-id="true"
		/>
	</q-dialog>
	<q-dialog v-model="crudPaket">
		<!-- edit -->
		<IuranPaketSantriForm :data="dataIuran" @success-submit="tabKey++" />
	</q-dialog>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { provide, ref } from 'vue';
import TabThAjaran from './views/TabThAjaran.vue';
import ButtonAdd from './views/ButtonAdd.vue';
import IuranForm from 'src/components/forms/IuranForm.vue';
import HeadFilterSantri from 'src/components/filters/FilterSantri.vue';
import CardSantriSimple from 'src/components/santri/CardSantriSimple.vue';
import IuranPaketSantriForm from 'src/components/forms/IuranPaketSantriForm.vue';

const { params } = useRoute();
const router = useRouter();
const dataFilter = ref({});
const tabKey = ref(0);
const dataIuran = ref({});
const crud = ref(false);
const crudPaket = ref(false);
const santri = ref({});
provide('santri', santri);

function makeDataIuran() {
	dataIuran.value = {
		santri_id: santri.value.id,
		nama: santri.value.nama,
		data_akhir: santri.value.data_akhir,
		th_ajaran_h: params.thAjaranH || '',
	};
}

function onAdd() {
	makeDataIuran();
	crud.value = true;
}

function showPaket() {
	makeDataIuran();
	crudPaket.value = true;
}

const onCreate = (res) => {
	if (res.th_ajaran_h == params.thAjaranH) {
		tabKey.value++;
	}
	router.push(`/iuran/santri/${res.santri_id}/${res.th_ajaran_h}`);
};
</script>
<style lang=""></style>
