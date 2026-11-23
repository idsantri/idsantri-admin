<template>
	<CardPage>
		<CardHeader title="Laporan Guru Tugas" :show-reload="true" @on-reload="getLaporan(params.id)"> </CardHeader>
		<div class="api-content" :class="{ 'is-loaded': hasLoaded }">
			<q-card-section class="q-pa-sm">
				<q-card bordered flat class="bg-green-11">
					<CardLoading :showing="loading" />
					<q-card-section class="q-pa-sm bg-green-1 text-green-10"> Data Guru Tugas </q-card-section>
					<q-card-section class="q-pa-sm">
						<q-markup-table flat dense class="bg-transparent">
							<tbody>
								<tr>
									<td class="text-caption text-italic">GT ID</td>
									<td class="">
										<q-btn
											size="sm"
											class="q-px-sm"
											color="green-10"
											dense
											outline
											:to="`/ugt/gt/${gt.id}`"
											icon-left
										>
											<q-icon name="sym_o_info" class="q-mr-sm" color="info" />
											<span class="api-value">{{ gt.id }}</span>
										</q-btn>
									</td>
									<td class="text-caption text-italic">Tahun Ajaran</td>
									<td class="">
										<span class="api-value">{{ gt.th_ajaran_h }} | {{ gt.th_ajaran_m }}</span>
									</td>
								</tr>
								<tr>
									<td class="text-caption text-italic">Nama GT</td>
									<td class="">
										<strong class="api-value">{{ gt.nama }}</strong>
										<span class="api-value"> ({{ gt.santri_id }})</span>
									</td>
									<td class="text-caption text-italic">Alamat</td>
									<td class="">
										<span class="api-value">{{ gt.alamat_pendek }}</span>
									</td>
								</tr>
								<tr>
									<td class="text-caption text-italic">Nama PJGT</td>
									<td class="">
										<span class="api-value">{{ gt.pjgt_nama }} ({{ gt.pjgt_wilayah }})</span>
									</td>
									<td class="text-caption text-italic">Lembaga</td>
									<td class="">
										<span class="api-value"
											>{{ gt.pjgt_jenis_lembaga }} {{ gt.pjgt_nama_lembaga }}</span
										>
									</td>
								</tr>
							</tbody>
						</q-markup-table>
					</q-card-section>
				</q-card>
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<q-card bordered flat>
					<CardLoading :showing="loading" />
					<q-card-section class="q-pa-sm bg-green-1 text-green-10">
						Laporan ke-<span class="api-value">{{ config.laporan_ke }}</span> (<span class="api-value">{{
							config.bulan_hijri
						}}</span
						>)
					</q-card-section>
					<q-card-section class="q-pa-sm">
						<ul class="tw:list-disc tw:pl-4">
							<li>
								Tanggal:
								<span class="api-value">{{ formatDate(laporan.created_at, 'dd MMMM yyyy') }}</span>
								|
								<span class="api-value">{{ bacaHijri(masehiToHijri(laporan.created_at)) }}</span>
							</li>
							<li>
								Menjadi Wali Kelas:
								<ul class="">
									<li v-for="(w, i) in laporan.wali_kelas" :key="i" class="api-value">
										&mdash; {{ w.tingkat }}, kelas {{ w.kelas }}
									</li>
								</ul>
							</li>
							<li>
								Menjadi Guru Fan:
								<ul class="">
									<li v-for="(w, i) in laporan.guru_fan" :key="i" class="api-value">
										&mdash; {{ w.tingkat }}, kelas {{ w.kelas }}
									</li>
								</ul>
							</li>
							<li>
								Jenis kelamin murid: <span class="api-value">{{ laporan.sex_murid }}</span>
							</li>
							<li>
								Absen (Ketidakhadiran):
								<ul class="">
									<li v-for="(w, i) in laporan.absen" :key="i" class="api-value">
										&mdash; {{ i }}: {{ w }}
									</li>
								</ul>
							</li>
							<li>
								Kegiatan:
								<ul class="">
									<li v-for="(w, i) in laporan.kegiatan" :key="i" class="api-value">
										&mdash; {{ i }}: {{ w }}
									</li>
								</ul>
							</li>
							<li>
								Hubungan:
								<ul class="">
									<li v-for="(w, i) in laporan.hubungan" :key="i" class="api-value">
										&mdash; dengan {{ i }}: {{ w }}
									</li>
								</ul>
							</li>
							<li>
								Bisyarah:
								<ul class="">
									<li v-for="(w, i) in laporan.bisyarah" :key="i" class="api-value">
										&mdash; {{ i }}: {{ w }}
									</li>
								</ul>
							</li>
							<li>
								Usul dan Saran:
								<ul class="">
									<li class="api-value">&mdash; {{ laporan.usul_saran }}</li>
								</ul>
							</li>
						</ul>
					</q-card-section>
				</q-card>
			</q-card-section>
		</div>
	</CardPage>
</template>
<script setup>
import UgtLaporanGt from 'src/models/UgtLaporanGt';
import { formatDate } from 'src/utils/format-date';
import { bacaHijri, masehiToHijri } from 'src/utils/hijri';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const { params } = useRoute();
const gt = ref({});
const laporan = ref({});
const config = ref({});
const hasLoaded = ref(false);
const loading = ref(false);

async function getLaporan(id) {
	try {
		loading.value = true;
		const response = await UgtLaporanGt.getById({ id });
		if (response) {
			gt.value = response.gt;
			laporan.value = response.laporan;
			config.value = response.config;
		}
	} finally {
		loading.value = false;
		hasLoaded.value = true;
	}
}

onMounted(async () => {
	if (params.id) {
		await getLaporan(params.id);
	}
});
</script>
<style scoped>
.api-content.is-loaded .api-value {
	animation: api-value-enter 320ms ease-out both;
}

@keyframes api-value-enter {
	from {
		opacity: 0;
		transform: translateY(4px);
		filter: blur(2px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
		filter: blur(0);
	}
}
</style>
