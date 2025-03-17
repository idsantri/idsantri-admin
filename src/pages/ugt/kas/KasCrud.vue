<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader title="Input Kas UGT" :is-new="props.isNew" />
			<q-card-section class="q-pa-sm">
				<q-input
					dense
					hint="Diisi oleh sistem"
					class=""
					outlined
					label="ID"
					v-model="input.id"
					disable
					filled
				/>
				<q-card class="q-mt-sm" flat bordered>
					<q-card-section class="q-pa-sm">
						<div class="text-caption">
							Jika terkait dengan administrasi GT
						</div>
						<q-input
							dense
							class="q-mt-sm"
							outlined
							label="GT ID"
							v-model="input.gt_id"
						/>
						<q-input
							dense
							class="q-mt-sm"
							outlined
							label="Nama GT"
							v-model="gt.nama"
							disable
							filled
							:loading="loadingGt"
						/>
						<q-input
							dense
							class="q-mt-sm"
							outlined
							label="Nama PJGT"
							v-model="gt.pjgt_nama"
							disable
							filled
							:loading="loadingGt"
						/>
					</q-card-section>
				</q-card>
				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Keperluan"
					v-model="input.keperluan"
				/>
				<q-select
					dense
					class="q-mt-sm"
					outlined
					label="Kas Masuk/Keluar"
					v-model="input.flag"
					:options="[
						{ value: '+', label: 'Masuk' },
						{ value: '-', label: 'Keluar' },
					]"
					emit-value
					map-options
					error-color="negative"
					behavior="menu"
				/>
				<input-currency
					dense
					class="q-mt-sm"
					outlined
					v-model="input.nominal"
					required
					label="Nominal"
				/>
				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Keterangan"
					v-model="input.keterangan"
					autogrow
				/>
			</q-card-section>
			<!-- <pre>{{ input }}</pre> -->
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
import { onMounted, ref, toRefs, watch } from 'vue';
import loadingStore from 'src/stores/loading-store';
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import apiDelete from 'src/api/api-delete';
import FormHeader from 'src/components/forms/FormHeader.vue';
import InputCurrency from 'src/components/inputs/InputCurrency.vue';

const { loadingMain } = toRefs(loadingStore());
const props = defineProps({
	data: Object,
	isNew: Boolean,
});
const emit = defineEmits(['successSubmit', 'successDelete']);
const input = ref({
	keperluan: 'Biaya Administrasi GT',
	keterangan: 'Lunas',
	flag: '+',
});
const loadingGt = ref(false);
const gt = ref({});

async function loadGt(id) {
	return await apiGet({
		endPoint: `ugt/gt/${id}`,
		loading: loadingGt,
	});
}

onMounted(async () => {
	Object.assign(input.value, props.data);

	if (input.value.gt_id) {
		const response = await loadGt(input.value.gt_id);
		if (response) {
			gt.value = response.gt;
		} else {
			gt.value.nama = 'Data tidak ditemukan';
			gt.value.pjgt_nama = 'Data tidak ditemukan';
		}
	}
});

async function onSubmit() {
	// console.log(input.value);
	const data = JSON.parse(JSON.stringify(input.value));
	delete data.id;

	// console.log(data);
	// return;

	let response = null;
	if (props.isNew) {
		response = await apiPost({
			endPoint: 'ugt/kas',
			data,
			loading: loadingMain,
		});
	} else {
		response = await apiUpdate({
			endPoint: `ugt/kas/${input.value.id}`,
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
		endPoint: `ugt/kas/${input.value.id}`,
		loading: loadingMain,
	});
	if (result) {
		document.getElementById('btn-close-crud').click();
		emit('successDelete');
	}
};

watch(
	() => input.value.gt_id,
	async (newValue, oldValue) => {
		gt.value.nama = '';
		gt.value.pjgt_nama = '';
		if (newValue != oldValue && typeof oldValue != 'undefined') {
			const response = await loadGt(newValue);
			if (response) {
				gt.value = response.gt;
			} else {
				gt.value.nama = 'Data tidak ditemukan';
				gt.value.pjgt_nama = 'Data tidak ditemukan';
			}
		}
	},
);
</script>
<style lang=""></style>
