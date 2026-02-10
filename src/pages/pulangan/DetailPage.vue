<template lang="">
	<CardPage>
		<CardHeader title="Detail Pulangan" @on-reload="reload" :show-edit="true" @on-edit="showForm = true" />
		<q-card-section class="q-pa-sm">
			<CardLoading :showing="loading" />
			<q-markup-table flat bordered>
				<tbody>
					<tr>
						<td class="label">Tahun Ajaran</td>
						<td>{{ pul?.th_ajaran_h }}</td>
					</tr>
					<tr>
						<td class="label">Pulangan</td>
						<td>{{ pul?.nama }}</td>
					</tr>
					<tr>
						<td class="label">Tanggal Pulang</td>
						<td>
							{{ formatDate(pul?.tgl_pulang_m, 'cccc, dd MMMM yyyy') }} |
							{{ bacaHijri(pul?.tgl_pulang_h) }}
						</td>
					</tr>
					<tr>
						<td class="label">Tanggal Kembali</td>
						<td>
							{{ formatDate(pul?.tgl_kembali_m, 'cccc, dd MMMM yyyy') }} |
							{{ bacaHijri(pul?.tgl_kembali_h) }}
						</td>
					</tr>
					<tr>
						<td class="label">Santri Pulang</td>
						<td class="flex items-center">
							{{ pul?.pulang_only_count?.toRupiah(false) }} dari
							{{ pul?.pulang_count?.toRupiah(false) }} santri (aktif)
							<q-btn
								class="q-ml-sm q-px-sm"
								icon="info"
								label="Selengkapnya ⟫"
								no-caps
								outline
								size="sm"
								color="green-10"
								:to="`/pulangan/${pul?.id}/santri`"
							/>
						</td>
					</tr>
				</tbody>
			</q-markup-table>
		</q-card-section>
		<q-card-section class="q-pa-none">
			<q-card separator flat class="q-ma-sm">
				<q-card-section class="q-pa-sm bg-green-7 text-green-11 flex items-center justify-between">
					<div>Detail Surat</div>
					<q-btn
						outline
						no-caps
						class="q-px-sm"
						size="sm"
						icon="edit"
						label="Edit"
						:to="`/pulangan/${pul?.id}/detail/edit`"
					/>
				</q-card-section>
				<q-card-section class="q-pa-sm">
					<CardLoading :showing="loading" />
					<q-markup-table flat bordered>
						<tbody>
							<tr>
								<td class="label">Nomor Surat</td>
								<td>
									{{ pul?.no_surat }}
								</td>
							</tr>
							<tr>
								<td class="label">Tanggal Surat</td>
								<td>
									{{ pul?.tgl_surat_m && formatDate(pul?.tgl_surat_m, 'dd MMMM yyyy') }} |
									{{ bacaHijri(pul?.tgl_surat_h) }}
								</td>
							</tr>
							<tr>
								<td class="label">Pengurus</td>
								<td class="">{{ pul?.p_nama }} ({{ pul?.p_jabatan }})</td>
							</tr>
							<tr>
								<td class="label" style="vertical-align: top">Keterangan</td>
								<td><span v-html="pul?.keterangan"></span></td>
							</tr>
						</tbody>
					</q-markup-table>
				</q-card-section>
			</q-card>
		</q-card-section>
		<q-dialog v-model="showForm">
			<PulanganForm :data="pul" @success-update="handleUpdate" @success-delete="handleDelete" />
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import PulanganForm from 'src/components/forms/PulanganForm.vue';
import { usePulanganStore } from 'src/stores/pulangan-store';
import { formatDate } from 'src/utils/format-date';
import { bacaHijri } from 'src/utils/hijri';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { id } = useRoute().params;
const store = usePulanganStore();
const { loading, pulangan } = storeToRefs(store);
const showForm = ref(false);
const pul = computed(() => pulangan.value.find((p) => p.id == id || p.slug == id));
const router = useRouter();

const reload = async () => {
	await store.loadById(id);
};

const handleUpdate = (v) => {
	store.update(id, v);
};

const handleDelete = () => {
	store.remove(id);
	router.replace('/pulangan');
};
</script>
<style lang="scss" scoped>
.label {
	width: 160px;
	font-style: italic;
}
td {
	white-space: normal;
	word-wrap: break-word;
}
</style>
