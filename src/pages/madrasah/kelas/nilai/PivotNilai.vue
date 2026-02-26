<template lang="">
	<div>
		<CardLoading :showing="loading" />
		<div v-if="nilai?.length == 0">
			<div class="flex flex-center q-pa-lg text-center text-negative text-italic">
				Tidak ada untuk ditampilkan <br />Silakan input nilai terlebih dahulu!
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
					<td :title="'Nilai ' + tab + ' pada ujian ke-1'" class="text-right">
						{{ item.nilai_1 }}
					</td>
					<td :title="'Nilai ' + tab + ' pada ujian ke-2'" class="text-right">
						{{ item.nilai_2 }}
					</td>
					<td :title="'Nilai ' + tab + ' pada ujian ke-3'" class="text-right">
						{{ item.nilai_3 }}
					</td>
					<td :title="'Nilai ' + tab + ' pada ujian ke-4'" class="text-right">
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
								? hitungRataRata(nilai, 'nilai_1')?.toFixed(1)
								: hitungRataRata(nilai, 'nilai_1')?.toFixed(2)
						}}
					</td>
					<td class="text-right">
						{{
							tab == 'rapor' || tab == 'ijazah'
								? hitungRataRata(nilai, 'nilai_2')?.toFixed(1)
								: hitungRataRata(nilai, 'nilai_2')?.toFixed(2)
						}}
					</td>
					<td class="text-right">
						{{
							tab == 'rapor' || tab == 'ijazah'
								? hitungRataRata(nilai, 'nilai_3')?.toFixed(1)
								: hitungRataRata(nilai, 'nilai_3')?.toFixed(2)
						}}
					</td>
					<td class="text-right">
						{{
							tab == 'rapor' || tab == 'ijazah'
								? hitungRataRata(nilai, 'nilai_4')?.toFixed(1)
								: hitungRataRata(nilai, 'nilai_4')?.toFixed(2)
						}}
					</td>
					<td class="text-right">
						{{
							tab == 'rapor' || tab == 'ijazah'
								? hitungRataRata(nilai, 'rerata')?.toFixed(1)
								: hitungRataRata(nilai, 'rerata')?.toFixed(2)
						}}
					</td>
				</tr>
			</tfoot>
		</q-markup-table>
	</div>
</template>
<script setup>
import NilaiMapel from 'src/models/NilaiMapel';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
	kelasId: [String, Number],
	tab: String,
});
const nilai = ref([{}]);
const loading = ref(false);

async function getNilaiPivot(category) {
	try {
		loading.value = true;
		const data = await NilaiMapel.pivotByKelas(props.kelasId, category);
		nilai.value = data.nilai;
	} catch (error) {
		console.error('🚀 ~ getNilaiPivot ~ error:', error);
	} finally {
		loading.value = false;
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

onMounted(async () => {
	await getNilaiPivot(props.tab);
});

watch(
	() => props.tab,
	async (newTab) => {
		await getNilaiPivot(newTab);
	},
);
</script>
<style lang=""></style>
