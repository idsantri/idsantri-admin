<template lang="">
	<q-card style="min-width: 300px">
		<q-card-section class="q-pa-sm bg-green-6 text-green-11 text-subtitle1"> Info Login </q-card-section>
		<q-card-section class="q-pa-sm">
			<q-markup-table flat bordered separator="horizontal">
				<thead>
					<tr>
						<th class="text-left text-overline">Username</th>
						<th class="text-left text-overline">Password</th>
						<th class="text-left text-overline">Deskripsi</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in login"
						:key="index"
						@click="$emit('setCredential', item)"
						class="cursor-pointer"
					>
						<td class="text-weight-light">
							{{ item.username }}
						</td>
						<td class="text-weight-light">
							{{ item.password }}
						</td>
						<td class="text-weight-light">
							{{ item.description }}
						</td>
					</tr>
				</tbody>
			</q-markup-table>
		</q-card-section>

		<q-card-actions align="right" class="bg-green-5">
			<q-btn outline no-caps label="Tutup" color="green-11" class="bg-green-6" glossy v-close-popup />
		</q-card-actions>
	</q-card>
</template>
<script setup>
const login = [
	{
		password: '112233',
		username: 'sekretariat',
		description: 'Akses kesekretariatan',
	},
	{
		password: '112233',
		username: 'bendahara',
		description: 'Akses kebendaharaan (all)',
	},
	{
		password: '112233',
		username: 'madrasah',
		description: 'Akses Kemadrasahan',
	},
	{
		password: '112233',
		username: 'keamanan',
		description: 'Akses Keamanan',
	},
	{
		password: '112233',
		username: 'ugt',
		description: 'Akses Urusan Guru Tugas',
	},
	{
		password: '112233',
		username: 'iuran',
		description: 'Akses Iuran/Tagihan',
	},
	{
		password: '112233',
		username: 'admin-iuran',
		description: 'Akses Admin Iuran/Tagihan',
	},
	{
		password: '112233',
		username: 'mutasi',
		description: 'Akses Kedaerahan (Mutasi Domisili)',
	},
	{
		password: '112233',
		username: 'quran',
		description: 'Akses Pendidikan al-Quran',
	},
	{
		password: '112233',
		username: 'panitia',
		description: 'Akses Panitia Ujian Madrasah',
	},
];
</script>
<style lang=""></style>
