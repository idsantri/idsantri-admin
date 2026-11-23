<template>
	<CardPage>
		<CardHeader title="Laporan Guru Tugas" :show-reload="true" @on-reload="getLaporan(params.id)"> </CardHeader>
		<q-card-section class="q-pa-sm">
			<q-card bordered flat class="bg-green-11">
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
										{{ gt.id }}
									</q-btn>
								</td>
								<td class="text-caption text-italic">Tahun Ajaran</td>
								<td class="">{{ gt.th_ajaran_h }} | {{ gt.th_ajaran_m }}</td>
							</tr>
							<tr>
								<td class="text-caption text-italic">Nama GT</td>
								<td class="">
									<strong>{{ gt.nama }}</strong> ({{ gt.santri_id }})
								</td>
								<td class="text-caption text-italic">Alamat</td>
								<td class="">{{ gt.alamat_pendek }}</td>
							</tr>
							<tr>
								<td class="text-caption text-italic">Nama PJGT</td>
								<td class="">{{ gt.pjgt_nama }} ({{ gt.pjgt_wilayah }})</td>
								<td class="text-caption text-italic">Lembaga</td>
								<td class="">{{ gt.pjgt_jenis_lembaga }} {{ gt.pjgt_nama_lembaga }}</td>
							</tr>
						</tbody>
					</q-markup-table>
				</q-card-section>
			</q-card>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-card bordered flat>
				<q-card-section class="q-pa-sm bg-green-1 text-green-10">
					Laporan ke-{{ config.laporan_ke }} ({{ config.bulan_hijri }})
				</q-card-section>
				<q-card-section class="q-pa-sm">
					<ul class="tw:list-disc tw:pl-4">
						<li>
							Tanggal: {{ formatDate(laporan.created_at, 'dd MMMM yyyy') }} |
							{{ bacaHijri(masehiToHijri(laporan.created_at)) }}
						</li>
						<li>
							Menjadi Wali Kelas:
							<ul class="">
								<li v-for="(w, i) in laporan.wali_kelas" :key="i">
									&mdash; {{ w.tingkat }}, kelas {{ w.kelas }}
								</li>
							</ul>
						</li>
						<li>
							Menjadi Guru Fan:
							<ul class="">
								<li v-for="(w, i) in laporan.guru_fan" :key="i">
									&mdash; {{ w.tingkat }}, kelas {{ w.kelas }}
								</li>
							</ul>
						</li>
						<li>Jenis kelamin murid: {{ laporan.sex_murid }}</li>
						<li>
							Absen (Ketidakhadiran):
							<ul class="">
								<li v-for="(w, i) in laporan.absen" :key="i">&mdash; {{ i }}: {{ w }}</li>
							</ul>
						</li>
						<li>
							Kegiatan:
							<ul class="">
								<li v-for="(w, i) in laporan.kegiatan" :key="i">&mdash; {{ i }}: {{ w }}</li>
							</ul>
						</li>
						<li>
							Hubungan:
							<ul class="">
								<li v-for="(w, i) in laporan.hubungan" :key="i">&mdash; dengan {{ i }}: {{ w }}</li>
							</ul>
						</li>
						<li>
							Bisyarah:
							<ul class="">
								<li v-for="(w, i) in laporan.bisyarah" :key="i">&mdash; {{ i }}: {{ w }}</li>
							</ul>
						</li>
						<li>
							Usul dan Saran:
							<ul class="">
								<li>&mdash; {{ laporan.usul_saran }}</li>
							</ul>
						</li>
					</ul>
				</q-card-section>
			</q-card>
		</q-card-section>
		<!-- <div>
				config:
				<pre> {{ config }}</pre>
			</div>
			<div>
				gt:
				<pre> {{ gt }}</pre>
			</div> -->
		<!-- <div>
				laporan:
				<pre> {{ laporan }}</pre>
			</div> -->
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
	}
}

onMounted(async () => {
	if (params.id) {
		await getLaporan(params.id);
	}
});
</script>
<style lang=""></style>
