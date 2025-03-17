<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Data GT" :is-new="props.isNew" />
			<q-card-section class="q-pa-sm">
				<InputSelectSantriId
					:active-only="true"
					@emit-input="(val) => Object.assign(input, val)"
					:data="props.data"
				/>
				<q-select
					class="q-mt-sm"
					dense
					outlined
					label="PJGT ID*"
					v-model="input.pjgt_id"
					:options="pjgtList"
					emit-value
					map-options
					option-value="id"
					option-label="id"
					error-color="negative"
					:loading="pjgtLoading"
					use-input
					clearable=""
					@update:model-value="onInputPjgt"
					behavior="menu"
				>
					<template v-slot:option="scope">
						<q-item v-bind="scope.itemProps">
							<q-item-section>
								<q-item-label
									>{{ scope.opt.id }} &mdash;
									{{ scope.opt.nama }}
								</q-item-label>
								<q-item-label caption>{{
									scope.opt.wilayah
								}}</q-item-label>
							</q-item-section>
						</q-item>
					</template>
				</q-select>
				<q-input
					dense
					:hint="input.pjgt_wilayah"
					class="q-mt-sm"
					outlined
					label="Nama PJGT"
					v-model="input.pjgt_nama"
					disable
					filled
				/>
				<InputSelectArray
					v-model="input.th_ajaran_h"
					url="tahun-ajaran"
					label="Tahun Ajaran *"
					sort="desc"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:selected="input.th_ajaran_h"
				/>

				<q-input
					dense
					hint="08123456789"
					class="q-mt-sm"
					outlined
					label="Telepon"
					v-model="input.telepon"
					:rules="[(val) => !val || !isNaN(val) || 'Hanya angka!']"
					error-color="negative"
				/>
				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Email GT"
					v-model="input.email"
				/>
				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Keterangan"
					v-model="input.keterangan"
					autogrow=""
				/>
			</q-card-section>

			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="!$props.isNew"
					label="Hapus"
					class="bg-red text-red-1"
					no-caps=""
					@click="handleDelete"
				/>
				<q-space />
				<q-btn
					label="Tutup"
					v-close-popup
					class="bg-green-11"
					no-caps=""
					id="btn-close-crud"
				/>
				<q-btn
					type="submit"
					label="Simpan"
					class="bg-green-10 text-green-11"
					no-caps=""
				/>
			</q-card-actions>
			<!-- <pre>{{ input }}</pre> -->
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref, toRefs } from 'vue';
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import apiDelete from 'src/api/api-delete';
import loadingStore from 'src/stores/loading-store';
import FormHeader from 'src/components/forms/FormHeader.vue';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const { loadingMain } = toRefs(loadingStore());

const props = defineProps({
	isNew: Boolean,
	data: Object,
});
const emit = defineEmits(['successSubmit', 'successDelete']);

const input = ref({});
const pjgtList = ref([]);
const pjgtLoading = ref(false);
// const tahunAjaran = ref([]);

function onInputPjgt() {
	input.value.pjgt_nama = pjgtList.value.find(
		(o) => o.id == input.value?.pjgt_id,
	)?.nama;
	input.value.pjgt_wilayah = pjgtList.value.find(
		(o) => o.id == input.value?.pjgt_id,
	)?.wilayah;
}

async function onSubmit() {
	// console.log(input.value);
	const data = {
		pjgt_id: input.value.pjgt_id,
		santri_id: input.value.santri_id,
		th_ajaran_h: input.value.th_ajaran_h,
		telepon: input.value.telepon,
		email: input.value.email,
		keterangan: input.value.keterangan,
	};
	// console.log(data);
	// return;
	let response = null;
	if (props.isNew) {
		response = await apiPost({
			endPoint: 'ugt/gt',
			data,
			loading: loadingMain,
		});
	} else {
		response = await apiUpdate({
			endPoint: `ugt/gt/${input.value.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingMain,
		});
	}
	if (response) {
		document.getElementById('btn-close-crud').click();
		emit('successSubmit', response?.gt);
	}
}

const handleDelete = async () => {
	const result = await apiDelete({
		endPoint: `ugt/gt/${input.value.id}`,
		loading: loadingMain,
	});
	if (result) {
		document.getElementById('btn-close-crud').click();
		emit('successDelete');
	}
};

onMounted(async () => {
	// console.log(props.data);
	Object.assign(input.value, props.data);
	// tahunAjaran.value = listsStore().tahunAjaranGet();
	const data = await apiGet({ endPoint: 'ugt/pjgt', loading: pjgtLoading });
	pjgtList.value = data.pjgt;
	// console.log(pjgtList.value);
});
</script>
<style lang=""></style>
