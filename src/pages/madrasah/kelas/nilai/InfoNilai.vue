<template lang="">
	<q-card class="bg-green-1">
		<q-card-section class="q-pa-sm bg-green-8 text-green-11 flex items-center justify-between">
			<div class="text-subtitle1">Perhatian</div>
			<q-btn icon="close" flat class="" @click="showInfo = false" dense />
		</q-card-section>
		<q-card-section class="">
			<div>
				<div class="text-subtitle2">Kalkulasi Rerata Nilai Mapel</div>
				<div class="text-caption text-italic text-red-10">
					(Kosong (<strong>null</strong>) TIDAK sama dengan angka
					<strong>0</strong>)
				</div>

				<ul>
					<li>75 + 75 + 75 = 225 ÷ 3 = <strong>75</strong></li>
					<li>
						75 + 0 + 75 = 150 ÷ 3 = <strong>50</strong> &nbsp;
						<em>(0 tetap dihitung nilai, masuk pembagi)</em>
					</li>
					<li>
						75 + '' + 75 = 150 ÷ 2 = <strong>75</strong> &nbsp;
						<em>(Kosong ('') bukan nilai, tidak masuk pembagi)</em>
					</li>
				</ul>
			</div>
			<q-separator class="q-my-md" />
			<div class="">
				<div class="text-subtitle2">Kalkulasi Nilai Rapor dan Ijazah</div>
				<ul>
					<li>
						Dengan nilai harian: <br />
						<code> (((nilai_ujian + nilai_remedial) * 2) + nilai_harian) / 3 / 10 </code>
					</li>
					<li>
						Tanpa nilai harian: <br />
						<code> (nilai_ujian + nilai_remedial) / 10 </code>
					</li>
					<li>Berlaku standar nilai-minimal-rapor dan nilai-minimal-ijazah.</li>
				</ul>
			</div>
		</q-card-section>
	</q-card>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
ul {
	padding-left: 1rem;
	list-style-type: disc;
}
code {
	background-color: #e0e0e0;
	padding: 4px 4px;
	border-radius: 4px;
	font-family: monospace;
	font-size: 0.9em;
}
</style>
