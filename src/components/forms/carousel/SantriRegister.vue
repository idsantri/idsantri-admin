<template>
	<div class="text-subtitle2">
		{{ props.title }}
	</div>
	<q-input
		dense
		hint="Kosongkan jika ingin diisi otomatis!"
		class="q-mt-sm"
		outlined
		label="ID"
		v-model="id"
		:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
		error-color="negative"
	/>

	<q-input
		dense
		:hint="isDate(tgl_daftar_m) ? formatDateFull(tgl_daftar_m) : ''"
		class="q-mt-sm"
		outlined
		label="Tanggal Daftar (M)*"
		v-model="tgl_daftar_m"
		type="date"
		@change="isDate(tgl_daftar_m) ? (tgl_daftar_h = m2h(tgl_daftar_m)) : ''"
		:rules="[(val) => !!val || 'Harus diisi!']"
		error-color="negative"
	/>
	<q-input
		dense
		:hint="tgl_daftar_h?.length ? bacaHijri(tgl_daftar_h) : ''"
		class="q-mt-sm"
		outlined
		label="Tanggal Daftar (H)*"
		v-model="tgl_daftar_h"
		mask="####-##-##"
		:rules="[
			(val) => !!val || 'Harus diisi!',
			(val) => val?.length == 8 || '8 digit angka!',
		]"
		error-color="negative"
	/>
</template>
<script setup>
import { onMounted, toRefs, watch } from 'vue';
import santriState from 'src/stores/santri-store';
import { m2h, bacaHijri } from 'src/utils/hijri';
import { isDate, formatDateFull } from 'src/utils/format-date';

const props = defineProps({
	title: { type: String, default: '' },
});

const { santri } = santriState();
const { id, tgl_daftar_m, tgl_daftar_h } = toRefs(santri);

onMounted(async () => {});

watch(tgl_daftar_h, (newValue, oldValue) => {
	// Menghapus karakter "-" dari tgl_daftar_h
	if (newValue !== oldValue) {
		tgl_daftar_h.value = newValue.replace(/-/g, '');
	}
});
</script>
