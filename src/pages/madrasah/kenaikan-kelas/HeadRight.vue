<template lang="">
	<div>
		<InputSelectArray
			v-model="filter.th_ajaran_h"
			url="tahun-ajaran"
			label="Tahun Ajaran *"
			sort="desc"
			class="no-padding"
			:disable="filter.th_ajaran_h ? true : false"
		/>

		<InputSelectTingkatPendidikan
			v-model="filter.tingkat_id"
			label="Tingkat Pendidikan *"
			class="q-mt-sm no-padding"
			:hint="null"
			:disable="filter.tingkat_id ? true : false"
		/>
		<input-select-array
			v-model="filter.kelas"
			url="kelas"
			label="Kelas *"
			class="q-mt-sm no-padding"
			:disable="filter.kelas ? true : false"
		/>
	</div>
</template>
<script setup>
import { onMounted } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';
import kenaikanKelasStore from 'src/stores/kenaikan-kelas-store';
import { storeToRefs } from 'pinia';

const { newDataFilter: filter } = storeToRefs(kenaikanKelasStore());

onMounted(async () => {
	// await loadTahun();
	removeBottomRow();
});

function removeBottomRow() {
	const el = document.querySelectorAll(
		'div.q-field__bottom.row.items-start.q-field__bottom',
	);
	// console.log(el);
	el.forEach((e) => e.remove());
}
</script>
<style lang=""></style>
