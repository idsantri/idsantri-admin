<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader
				title="Input Desa/Kelurahan"
				:is-new="props.data?.id ? false : true"
			/>
			<q-card-section>
				<q-dialog
					v-if="loadingCrud"
					v-model="loadingCrud"
					persistent=""
				>
					<q-spinner-cube
						color="green-12"
						size="8em"
						class="flex q-ma-lg q-mx-auto"
					/>
				</q-dialog>

				<q-input
					v-model="input.kecamatan_id"
					name="kecamatan_id"
					dense
					class=""
					outlined
					required
					label="Kode Kecamatan/Distrik"
					:rules="[(val) => !!val || 'Harus diisi!']"
					readonly=""
				/>
				<q-input
					v-model="input.id"
					name="id"
					dense
					class="q-mt-sm"
					outlined
					required
					label="Kode Desa/Kelurahan"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) =>
							/^[a-zA-Z0-9]+$/.test(val) ||
							'Harus berisi huruf atau angka!',
					]"
				/>
				<q-input
					v-model="input.desa"
					name="desa"
					dense
					class="q-mt-sm"
					outlined
					required
					label="Nama Desa/Kelurahan"
					:rules="[(val) => !!val || 'Harus diisi!']"
				/>
			</q-card-section>
			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="props.data.id"
					label="Hapus"
					class="bg-red text-red-1"
					no-caps=""
					@click="onDelete"
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
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiDelete from 'src/api/api-delete';
import apiUpdate from 'src/api/api-update';
import apiPost from 'src/api/api-post';
import FormHeader from 'src/components/forms/parts/FormHeader.vue';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
});

const emit = defineEmits(['successSubmit', 'successDelete']);

const input = ref({});
const loadingCrud = ref(false);

onMounted(async () => {
	Object.assign(input.value, props.data);
});

const submit = async (e) => {
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());
	// console.log(data);
	// return;

	let response = null;
	if (props.data.id) {
		response = await apiUpdate({
			endPoint: `alamat/desa/${props.data.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	} else {
		response = await apiPost({
			endPoint: 'alamat/desa',
			data,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close').click();
		emit('successSubmit', response);
	}
};

const onDelete = async () => {
	const result = await apiDelete({
		endPoint: `alamat/desa/${props.data.id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close').click();
		emit('successDelete');
	}
};
</script>
