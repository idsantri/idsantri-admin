<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
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
					v-model="input.item"
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
			</q-card-section>
			<FormActions
				:btn-delete="input.id ? true : false"
				@on-delete="onDelete"
			/>
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
import FormHeader from 'src/components/forms/FormHeader.vue';
import InputCurrency from 'src/components/inputs/InputCurrency.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
});

const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const input = ref({});
const loadingCrud = ref(false);
const iuran = ref([]);

onMounted(async () => {
	Object.assign(input.value, props.data);
	iuran.value = listsStore().getByStateName('iuran');
});

const setNominal = (val) => {
	const selectedOption = iuran.value.find((item) => item.val0 === val);
	if (selectedOption) {
		input.value.nominal = selectedOption.val1;
	}
};

const onSubmit = async () => {
	const data = JSON.parse(JSON.stringify(input.value));
	delete data.id;
	// return console.log(data);

	let response = null;
	const isNew = !input.value.id;
	if (isNew) {
		response = await apiPost({
			endPoint: 'iuran-paket',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `iuran-paket/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.iuran_paket);
		if (isNew) {
			emit('successCreate', response?.iuran_paket);
		} else {
			emit('successUpdate', response?.iuran_paket);
		}
	}
};

const onDelete = async () => {
	const id = input.value.id;
	const result = await apiDelete({
		endPoint: `iuran-paket/${id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close-form').click();
		emit('successDelete', id);
	}
};
</script>
