<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader title="Input Iuran" :is-new="input.id ? false : true" />
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
			<FormActions
				:btn-delete="input.id ? true : false"
				@on-delete="deleteIuran"
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
import FormHeader from './FormHeader.vue';
import InputCurrency from 'src/components/inputs/InputCurrency.vue';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import 'src/utils/rupiah';
import FormActions from './FormActions.vue';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
	disableSantriId: { type: Boolean, default: false },
	disableThAjaran: { type: Boolean, default: false },
});

const emit = defineEmits([
	'successDelete',
	'successSubmit',
	'successUpdate',
	'successCreate',
]);

const input = ref({});
const loadingCrud = ref(false);
const tahunAjaran = ref([]);
const iuran = ref([]);

onMounted(async () => {
	Object.assign(input.value, props.data);
	tahunAjaran.value = listsStore().getByStateName('tahun-ajaran');
	iuran.value = listsStore().getByStateName('iuran');
	// console.log('🚀 ~ onMounted ~ props.data:', props.data);
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
		item: input.value.item,
		nominal: input.value.nominal,
		via: input.value.via,
		keterangan: input.value.keterangan,
	};
	let response = null;
	const isNew = !input.value.id;
	if (isNew) {
		response = await apiPost({
			endPoint: 'iuran',
			data,
			loading: loadingCrud,
		});
	} else {
		response = await apiUpdate({
			endPoint: `iuran/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-form').click();
		emit('successSubmit', response?.iuran);
		if (isNew) {
			emit('successCreate', response?.iuran);
		} else {
			emit('successUpdate', response?.iuran);
		}
	}
};

const deleteIuran = async () => {
	const id = input.value.id;
	const result = await apiDelete({
		endPoint: `iuran/${id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close-form').click();
		emit('successDelete', id);
	}
};
</script>
