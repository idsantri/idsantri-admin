<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="onSubmit">
			<FormHeader :title="props.title" :is-new="!input.id" />
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
					outlined
					label="Urut"
					v-model="input.sequence"
					hint="Nomor urut tampil"
				/>
				<InputSelectTingkatPendidikan
					v-model="input.tingkat_id"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:selected="input.tingkat_id"
				/>

				<q-input
					class="q-mt-sm"
					dense
					outlined
					label="Kode/ID Mapel"
					v-model="input.id"
					hint="Format: tingkat_id—kode_mapel (ibt-qur; ts-taj; aly-tau)"
				/>
				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Mata Pelajaran"
					v-model="input.name"
					hint="Hanya huruf dan spasi"
				/>
				<q-input
					dense
					class="q-mt-sm"
					outlined
					label="Mata Pelajaran (Alias)"
					v-model="input.alias"
				/>
				<q-select
					dense
					class="q-mt-sm"
					outlined
					label="Kategori Fan"
					emit-value
					map-options
					v-model="input.category"
					:options="['Fan Pokok', 'Fan Dasar', 'Fan Tambahan']"
					behavior="menu"
				/>
				<q-card bordered flat class="q-px-sm q-mt-sm">
					Tampilkan:
					<q-toggle
						v-model="input.show"
						color="green"
						:true-value="1"
						:false-value="0"
					/>
				</q-card>
			</q-card-section>
			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="input.id"
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
		</q-form>
		<!-- <pre>{{ input }}</pre> -->
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import listsStore from 'src/stores/lists-store';
import apiPost from 'src/api/api-post';
import apiUpdate from 'src/api/api-update';
import apiDelete from 'src/api/api-delete';
import FormHeader from 'src/components/forms/parts/FormHeader.vue';
import InputSelectTingkatPendidikan from 'src/components/inputs/InputSelectTingkatPendidikan.vue';

const props = defineProps({
	data: { type: Object, required: true },
	title: { type: String, default: () => 'Input' },
});
const emit = defineEmits(['successSubmit', 'successDelete']);

const input = ref({ category: 'Fan Dasar', show: 1 });
const loadingCrud = ref(false);
const tingkat = ref([]);

onMounted(async () => {
	Object.assign(input.value, props.data);
	tingkat.value = listsStore().getByStateName('tingkat-pendidikan');
});

const onSubmit = async () => {
	// console.log(input.value.id);
	// return;
	const data = {
		sequence: input.value.sequence,
		id: input.value.id.toLowerCase(),
		tingkat_id: input.value.tingkat_id,
		name: input.value.name,
		alias: input.value.alias,
		category: input.value.category,
		show: input.value.show,
	};
	// console.log(data);
	// return;
	let response = null;
	if (props.data.id) {
		response = await apiUpdate({
			endPoint: `mapel/${props.data.id}`,
			data,
			confirm: true,
			notify: true,
			loading: loadingCrud,
		});
	} else {
		response = await apiPost({
			endPoint: 'mapel',
			data,
			loading: loadingCrud,
		});
	}
	if (response) {
		document.getElementById('btn-close-crud').click();
		// console.log(response.mapel);
		emit('successSubmit', response.mapel);
	}
};

const handleDelete = async () => {
	const result = await apiDelete({
		endPoint: `mapel/${props.data.id}`,
		loading: loadingCrud,
	});
	if (result) {
		document.getElementById('btn-close-crud').click();
		emit('successDelete', props.data);
	}
};
</script>
