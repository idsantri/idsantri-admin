<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader title="Modul Paket" :is-new="true" />
			<FormLoading v-if="loadingCrud" />
			<q-card-section>
				<input-select-santri-id
					:active-only="true"
					@emit-input="(val) => Object.assign(input, val)"
					:data="props.data"
				/>
				<input-select-array
					v-model="input.th_ajaran_h"
					url="tahun-ajaran"
					label="Tahun Ajaran"
					sort="desc"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:selected="input.th_ajaran_h"
					:disable="props.disableThAjaran"
				/>
				<InputSelectIuranPaket
					class="q-mt-sm"
					@on-input="(v) => (paketIuran = v)"
				/>
				<q-input
					label="Keterangan"
					v-model="input.keterangan"
					dense
					outlined=""
					class="q-mt-sm"
				/>
			</q-card-section>
			<FormActions />
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import listsStore from 'src/stores/lists-store';
import apiPost from 'src/api/api-post';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import InputSelectIuranPaket from '../inputs/InputSelectIuranPaket.vue';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
	title: { type: String, default: () => 'Input' },
});

const emit = defineEmits(['successSubmit', 'successCreate']);

const input = ref({});
const loadingCrud = ref(false);
const tahunAjaran = ref([]);
const paketIuran = ref([]);
onMounted(async () => {
	Object.assign(input.value, props.data);
	tahunAjaran.value = listsStore().getByStateName('tahun-ajaran');
});

const submit = async () => {
	// console.log(paketIuran.value);
	const paket = paketIuran.value.map((o) => {
		return { item: o.item, nominal: o.nominal };
	});
	// console.log(paket);
	// return;

	const data = {
		santri_id: input.value.santri_id,
		th_ajaran_h: input.value.th_ajaran_h,
		keterangan: input.value.keterangan || '',
		paket: paket,
	};
	// console.log(data);
	// return;

	const response = await apiPost({
		endPoint: 'iuran/paket',
		data,
		loading: loadingCrud,
		message:
			'PERHATIAN<br/>Jika item iuran sudah terdapat dalam daftar maka akan diabaikan.',
	});
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.iuran);
		emit('successCreate', response?.iuran);
	}
};
</script>

<style lang="scss"></style>
