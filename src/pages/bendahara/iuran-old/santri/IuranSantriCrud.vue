<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader :title="props.title" :is-new="isNew" />
			<q-card-section>
				<div v-if="loadingCrud">
					<q-dialog v-model="loadingCrud" persistent="">
						<q-spinner-cube
							color="green-12"
							size="8em"
							class="flex q-ma-lg q-mx-auto"
						/>
					</q-dialog>
				</div>
				<InputSelectSantriId
					:active-only="true"
					@emit-input="(val) => Object.assign(input, val)"
					:data="props.data"
				/>
				<InputSelectArray
					v-model="input.th_ajaran_h"
					url="tahun-ajaran"
					label="Tahun Ajaran"
					sort="desc"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:selected="input.th_ajaran_h"
					:disable="props.disableThAjaran"
				/>
				<InputSelectArray
					v-model="input.iuran"
					url="iuran"
					label="Iuran"
					class="q-mt-sm"
					@update:model-value="setNominal"
				/>
				<InputCurrency
					dense
					class="q-mt-sm"
					outlined
					v-model="input.nominal"
					required
					label="Nominal"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
				<q-input
					hint="Untuk pecahan: awali/gunakan titik (.25 atau 0.25, .5 atau 0.5, …)"
					dense
					class="q-mt-sm"
					outlined
					v-model="input.qty"
					required
					label="Quantity"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) => !val || !isNaN(val) || 'Hanya angka',
						(val) => val > 0 || 'Harus lebih besar dari 0',
					]"
				/>
				<q-input
					disable=""
					filled=""
					dense
					class="q-mt-sm"
					outlined
					label="Sub Total"
					:model-value="
						(Number(input.qty) * Number(input.nominal)).toRupiah()
					"
				/>
				<InputSelectArray
					v-model="input.via"
					url="metode-pembayaran"
					label="Via"
					class="q-mt-sm"
				/>
				<InputSelectArray
					v-model="input.keterangan"
					url="keterangan-iuran"
					label="Keterangan"
					class="q-mt-sm"
				/>
			</q-card-section>
			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="!props.isNew"
					label="Hapus"
					class="bg-red text-red-1"
					no-caps=""
					@click="del(input.id)"
				/>
				<q-space />
				<q-btn
					label="Tutup"
					v-close-popup
					class="bg-green-11"
					no-caps=""
					id="btn-close"
				/>
				<q-btn
					type="submit"
					label="Simpan"
					class="bg-green-10 text-green-11"
					no-caps=""
				/>
			</q-card-actions>
		</q-form>
		<!-- <pre>{{ props.santri }}</pre> -->
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import listsStore from 'src/stores/lists-store';
import apiDelete from 'src/api/api-delete';
import apiUpdate from 'src/api/api-update';
import apiPost from 'src/api/api-post';
import FormHeader from 'src/components/FormHeader.vue';
import InputCurrency from 'src/components/inputs/InputCurrency.vue';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import 'src/utils/rupiah';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
	isNew: { type: Boolean, default: true },
	title: { type: String, default: () => 'Input' },
	disableSantriId: { type: Boolean, default: false },
	disableThAjaran: { type: Boolean, default: false },
});

const emit = defineEmits(['successSubmit', 'successDelete']);

const input = ref({ qty: 1 });
const loadingCrud = ref(false);
const tahunAjaran = ref([]);
const iuran = ref([]);

onMounted(async () => {
	Object.assign(input.value, props.data);
	tahunAjaran.value = listsStore().getByStateName('tahun-ajaran');
	iuran.value = listsStore().getByStateName('iuran-old');
});

const setNominal = (val) => {
	const selectedOption = iuran.value.find((item) => item.val0 === val);
	if (selectedOption) {
		input.value.nominal = selectedOption.val1;
	}
};

const submit = async () => {
	const data = {
		santri_id: input.value.santri_id,
		th_ajaran_h: input.value.th_ajaran_h,
		iuran: input.value.iuran,
		nominal: input.value.nominal,
		qty: input.value.qty,
		via: input.value.via || '',
		keterangan: input.value.keterangan || '',
	};
	let response = null;
	if (props.isNew) {
		response = await apiPost({
			endPoint: 'iuran-old',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `iuran-old/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close').click();
		// console.log(response.iuran);
		emit('successSubmit', response?.iuran);
	}
};

const del = async (id) => {
	const result = await apiDelete({
		endPoint: `iuran-old/${id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close').click();
		emit('successDelete');
	}
};
</script>
