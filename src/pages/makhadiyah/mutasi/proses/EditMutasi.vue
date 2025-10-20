<template lang="">
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
				<q-toolbar class="q-px-sm" style="min-height: 0">
					<q-toolbar-title class="text-subtitle1 text-green-11">
						Data Domisili Baru &mdash;
						<span class="text-italic">Edit</span>
					</q-toolbar-title>
					<span v-if="!props.api" class="text-italic text-caption">
						Auto Update
					</span>
				</q-toolbar>
			</q-card-section>
			<q-card-section>
				<q-input
					:model-value="input.nama + ' (' + input.santri_id + ')'"
					class=""
					disable
					filled
					dense
					outlined
					label="Nama (ID)"
				/>
				<q-input
					:model-value="input.tingkat + ' &mdash; ' + input.kelas"
					class="q-mt-sm"
					disable
					filled
					dense
					outlined
					label="Tingkat &mdash; Kelas"
				/>

				<q-input
					:model-value="input.domisili"
					class="q-mt-sm"
					disable
					filled
					dense
					outlined
					label="Domisili (Asal)"
				/>
				<input-select-array
					v-model="input.new_domisili"
					url="domisili"
					label="Domisili (Baru) *"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:clearable="false"
				/>
				<q-input
					v-model="input.new_keterangan"
					class="q-mt-sm"
					dense
					outlined
					label="Keterangan (Baru)"
					:autogrow="true"
				/>
			</q-card-section>
			<q-card-actions class="bg-green-6 flex">
				<q-btn
					v-if="props.api"
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
					id="btn-close"
				/>
				<q-btn
					v-if="props.api"
					type="submit"
					label="Simpan"
					class="bg-green-10 text-green-11"
					no-caps=""
				/>
			</q-card-actions>
			<q-inner-loading :showing="loading">
				<q-spinner-tail size="4em" color="green" />
			</q-inner-loading>
		</q-form>
	</q-card>
</template>
<script setup>
/**
 * TODO:
 * use pop up input
 */
import { onMounted, ref } from 'vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import apiDelete from 'src/api/api-delete';
import apiUpdate from 'src/api/api-update';

const emit = defineEmits(['onDelete', 'onSubmit']);
const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
	api: {
		type: Boolean,
		default: false,
	},
});
const input = ref({});
const loading = ref(false);

onMounted(() => {
	if (props.api) {
		Object.assign(input.value, props.data);
	} else {
		input.value = props.data;
	}
});

async function handleDelete() {
	const del = await apiDelete({
		endPoint: `mutasi/${input.value.id}`,
		loading,
	});
	if (del) {
		document.getElementById('btn-close').click();
		emit('onDelete');
	}
}

async function onSubmit() {
	const data = {
		new_domisili: input.value.new_domisili,
		new_keterangan: input.value.new_keterangan,
	};
	const updated = await apiUpdate({
		endPoint: `mutasi/${input.value.id}`,
		loading,
		data,
	});
	if (updated) {
		document.getElementById('btn-close').click();
		emit('onSubmit');
	}
}
</script>
<style lang=""></style>
