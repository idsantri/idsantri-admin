<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template lang="">
	<q-card class="">
		<q-card-section class="bg-green-8 no-padding">
			<q-toolbar class="no-padding no-margin">
				<q-toolbar-title class="text-subtitle1 q-ml-sm text-green-11">
					Riwayat Indisipliner
				</q-toolbar-title>
				<q-btn
					color="green-11"
					outline
					dense
					no-caps
					icon="add"
					label="Tambah"
					class="q-mr-sm q-px-md"
					@click="crudShow = true"
				/>
			</q-toolbar>
		</q-card-section>
		<q-card-section v-if="loading" class="text-center">
			<q-spinner-cube color="green-12" size="8em" class="" />
		</q-card-section>
		<q-card-section
			v-else-if="!riwayatIndsipliner?.length"
			class="text-italic text-center q-pa-lg"
		>
			Tidak ada untuk ditampilkan
		</q-card-section>
		<q-card-section v-else class="q-pa-sm">
			<q-list separator bordered>
				<q-item
					v-for="(indisipliner, index) in riwayatIndsipliner"
					:key="index"
					class="q-pa-sm"
				>
					<q-item-section>
						<table>
							<tbody>
								<tr>
									<td class="label">Tanggal Sidang:</td>
									<td class="flex">
										{{
											formatDateShort(
												indisipliner.tgl_sidang,
											) +
											' | ' +
											m2hFormat(indisipliner.tgl_sidang)
										}}
										<q-space />
										{{
											hijriToThAjaranH(
												m2h(indisipliner.tgl_sidang),
											)
										}}
									</td>
								</tr>

								<tr>
									<td class="label">Pasal</td>
									<td>{{ indisipliner.no_pasal }}</td>
								</tr>
								<tr>
									<td class="label">Kategori</td>
									<td>{{ indisipliner.kategori_text }}</td>
								</tr>
								<tr>
									<td class="label">Sanksi</td>
									<td>{{ indisipliner.takzir }}</td>
								</tr>
							</tbody>
						</table>
					</q-item-section>
					<q-item-section side class="no-padding">
						<q-btn
							icon="info"
							glossy
							dense
							round
							outline
							color="green"
							:to="`/keamanan/indisipliner/${indisipliner.id}`"
						/>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
		<!-- props {{ $props.santri_id }} -->
		<!-- {{ riwayatIndsipliner }} -->

		<q-dialog v-model="crudShow">
			<indisipliner-crud
				:data="santri"
				@success-delete="null"
				@success-submit="
					(v) => $router.push(`/keamanan/indisipliner/${v.id}`)
				"
			/>
		</q-dialog>
	</q-card>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { formatDateShort } from 'src/utils/format-date';
import { m2h, m2hFormat } from 'src/utils/hijri';
import { hijriToThAjaranH } from 'src/utils/tahun-ajaran';
import { onMounted, onUpdated, ref } from 'vue';
import IndisiplinerCrud from 'src/pages/keamanan/indisipliner/IndisiplinerCrud.vue';

const props = defineProps({
	santri_id: {
		required: true,
	},
});

const riwayatIndsipliner = ref([]);
const loading = ref(false);
const crudShow = ref(false);
const santri = ref({});

onMounted(async () => {
	if (props.santri_id) {
		await getRiwayat(props.santri_id);
	} else {
		riwayatIndsipliner.value = [];
	}
});

onUpdated(async () => {
	if (props.santri_id) {
		await getRiwayat(props.santri_id);
	} else {
		riwayatIndsipliner.value = [];
	}
});

async function getRiwayat(id) {
	const data = await apiGet({
		endPoint: 'indisipliner',
		params: { santri_id: id },
		loading,
	});
	if (!data.indisipliner) return;
	riwayatIndsipliner.value = data.indisipliner;
	santri.value = {
		santri_id: data.santri.id,
		nama: data.santri.nama,
		data_akhir: data.santri.data_akhir,
	};

	// console.log(riwayatIndsipliner.value);
}
</script>

<style lang="scss">
.label {
	width: 110px;
	font-style: italic;
}
</style>
