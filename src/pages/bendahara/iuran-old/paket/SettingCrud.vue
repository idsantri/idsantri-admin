<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader title="Input Paket Iuran" :is-new="!input.id" />
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
				<q-input
					dense
					class=""
					outlined
					v-model="input.urut"
					label="Nomor Urut"
					:rules="[(val) => !val || !isNaN(val) || 'Hanya angka']"
				/>

				<q-input
					dense
					class="q-mt-sm"
					outlined
					v-model="input.paket"
					required
					label="Nama Paket"
					:rules="[(val) => !!val || 'Harus diisi!']"
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
			</q-card-section>
			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="input.id"
					label="Hapus"
					class="bg-red text-red-1"
					no-caps=""
					@click="deleteData()"
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
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import 'src/utils/rupiah';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
});

const emit = defineEmits(['successSubmit', 'successDelete']);

const input = ref({ qty: 1 });
const loadingCrud = ref(false);
const iuran = ref([]);

onMounted(async () => {
	Object.assign(input.value, props.data);
	iuran.value = listsStore().getByStateName('iuran-old');
});

const setNominal = (val) => {
	const selectedOption = iuran.value.find((item) => item.val0 === val);
	if (selectedOption) {
		input.value.nominal = selectedOption.val1;
	}
};

const submit = async () => {
	const data = JSON.parse(JSON.stringify(input.value));
	delete data.id;
	// return console.log(data);

	let response = null;
	if (input.value.id) {
		response = await apiUpdate({
			endPoint: `iuran-paket/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	} else {
		response = await apiPost({
			endPoint: 'iuran-paket',
			data,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close').click();
		// console.log(response.iuran);
		emit('successSubmit', response?.iuran_paket);
	}
};

const deleteData = async () => {
	const result = await apiDelete({
		endPoint: `iuran-paket/${input.value.id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close').click();
		emit('successDelete');
	}
};
</script>
