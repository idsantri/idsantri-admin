<template lang="">
	<q-card flat bordered class="bg-green-1">
		<q-card-section class="q-pa-sm">
			<q-tabs
				no-caps
				outside-arrows
				mobile-arrows
				class="bg-green-2 text-green-10"
				v-model="tab"
			>
				<q-tab name="ujian" label="Ujian" />
				<q-tab name="harian" label="Harian" />
				<q-tab name="rapor" label="Rapor" />
				<q-tab name="ijazah" label="Ijazah" />
				<q-space />
				<q-btn icon="info" flat class="q-mr-sm" :title="info" />
			</q-tabs>
		</q-card-section>
		<q-card-section class="q-px-sm q-pb-sm q-pt-none">
			<div v-if="loading">
				<q-spinner-cube
					color="green-12"
					size="8em"
					class="flex q-ma-lg q-mx-auto"
				/>
			</div>
			<div v-else-if="nilai?.length == 0">
				<div
					class="flex flex-center q-pa-lg text-center text-negative text-italic"
				>
					Tidak ada untuk ditampilkan <br />Silakan input nilai
					terlebih dahulu!
				</div>
			</div>

			<q-markup-table v-else flat bordered>
				<thead>
					<tr>
						<th class="text-left">Kode</th>
						<th class="text-left">Mapel</th>
						<th class="text-right">
							{{ tab.substring(0, 1).toUpperCase() + '-1' }}
						</th>
						<th class="text-right">
							{{ tab.substring(0, 1).toUpperCase() + '-2' }}
						</th>
						<th class="text-right">
							{{ tab.substring(0, 1).toUpperCase() + '-3' }}
						</th>
						<th class="text-right">
							{{ tab.substring(0, 1).toUpperCase() + '-4' }}
						</th>
						<th class="text-right">Rerata</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in nilai" :key="index">
						<td class="text-left">{{ item.id }}</td>
						<td class="text-left">{{ item.name }}</td>
						<td
							:title="'Nilai ' + tab + ' pada ujian ke-1'"
							class="text-right"
						>
							{{ item.nilai_1 }}
						</td>
						<td
							:title="'Nilai ' + tab + ' pada ujian ke-2'"
							class="text-right"
						>
							{{ item.nilai_2 }}
						</td>
						<td
							:title="'Nilai ' + tab + ' pada ujian ke-3'"
							class="text-right"
						>
							{{ item.nilai_3 }}
						</td>
						<td
							:title="'Nilai ' + tab + ' pada ujian ke-4'"
							class="text-right"
						>
							{{ item.nilai_4 }}
						</td>
						<td title="Nilai rata-rata" class="text-right">
							{{
								isNaN(item.rerata) || item.rerata == null
									? null
									: tab == 'rapor' || tab == 'ijazah'
										? parseFloat(item.rerata).toFixed(1)
										: parseFloat(item.rerata).toFixed(2)
							}}
						</td>
					</tr>
				</tbody>
				<tfoot class="bg-green-2">
					<tr class="text-caption text-weight-bold text-green-10">
						<td colspan="2">Rata-Rata</td>
						<td class="text-right">
							{{
								tab == 'rapor' || tab == 'ijazah'
									? hitungRataRata(nilai, 'nilai_1')?.toFixed(
											1,
										)
									: hitungRataRata(nilai, 'nilai_1')?.toFixed(
											2,
										)
							}}
						</td>
						<td class="text-right">
							{{
								tab == 'rapor' || tab == 'ijazah'
									? hitungRataRata(nilai, 'nilai_2')?.toFixed(
											1,
										)
									: hitungRataRata(nilai, 'nilai_2')?.toFixed(
											2,
										)
							}}
						</td>
						<td class="text-right">
							{{
								tab == 'rapor' || tab == 'ijazah'
									? hitungRataRata(nilai, 'nilai_3')?.toFixed(
											1,
										)
									: hitungRataRata(nilai, 'nilai_3')?.toFixed(
											2,
										)
							}}
						</td>
						<td class="text-right">
							{{
								tab == 'rapor' || tab == 'ijazah'
									? hitungRataRata(nilai, 'nilai_4')?.toFixed(
											1,
										)
									: hitungRataRata(nilai, 'nilai_4')?.toFixed(
											2,
										)
							}}
						</td>
						<td class="text-right">
							{{
								tab == 'rapor' || tab == 'ijazah'
									? hitungRataRata(nilai, 'rerata')?.toFixed(
											1,
										)
									: hitungRataRata(nilai, 'rerata')?.toFixed(
											2,
										)
							}}
						</td>
					</tr>
				</tfoot>
			</q-markup-table>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';

const tab = ref('ujian');
const route = useRoute();
const nilai = ref([{}]);
const loading = ref(false);

onMounted(async () => {
	await getNilai(tab.value);
});

watch(tab, async (newTab) => {
	await getNilai(newTab);
});

const info =
	'Kalkulasi nilai rapor dan ijazah:\n' +
	'▪️ dengan nilai harian:\n' +
	' 🔸(((nilai_ujian + nilai_remedial) * 2) + nilai_harian) / 3 / 10 \n' +
	'▪️ tanpa nilai harian:\n' +
	' 🔸(nilai_ujian + nilai_remedial) / 10\n\n' +
	'Catatan:\n' +
	'Berlaku standar nilai-minimal rapor dan ijazah.';

async function getNilai(category) {
	const data = await apiGet({
		endPoint: 'nilai-mapel',
		loading,
		params: {
			kelas_id: route.params.id,
			category: category,
		},
	});
	if (data.nilai) {
		nilai.value = data.nilai;
	}
}

function hitungRataRata(data, n) {
	let totalNilai = 0;
	let jumlahData = 0;
	if (!data?.length) {
		return null;
	} else {
		data.forEach((item) => {
			if (item[n] !== null) {
				totalNilai += parseFloat(item[n]);
				jumlahData++;
			}
		});
		const rerata = totalNilai / jumlahData;
		return !isNaN(rerata) ? rerata : null;
	}
}
</script>
<style lang=""></style>
