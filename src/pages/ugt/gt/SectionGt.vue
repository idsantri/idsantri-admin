<template>
	<q-card-section class="q-pa-sm">
		<q-markup-table flat class="text-green-10">
			<tbody>
				<tr>
					<td class="text-caption text-italic">ID</td>
					<td>{{ gt.id }}</td>
				</tr>
				<tr>
					<td class="text-caption text-italic">Tahun Ajaran</td>
					<td>{{ gt.th_ajaran_h }}</td>
				</tr>
				<tr>
					<td class="text-caption text-italic">Santri ID</td>
					<td>
						<div class="flex flex-center">
							<div>
								{{ gt.santri_id }}
							</div>

							<q-space />
							<q-btn class="bg-green-11" icon="info" glossy round dense :to="`/santri/${gt.santri_id}`" />
						</div>
					</td>
				</tr>
				<tr>
					<td class="text-caption text-italic">Nama</td>
					<td>{{ gt.nama }}</td>
				</tr>
				<tr>
					<td class="text-caption text-italic">Data Akhir</td>
					<td>{{ gt.data_akhir }}</td>
				</tr>
				<tr>
					<td class="text-caption text-italic">No Telepon</td>
					<td>{{ gt.telepon }}</td>
				</tr>
				<tr>
					<td class="text-caption text-italic">Email</td>
					<td>{{ gt.email }}</td>
				</tr>
				<tr v-if="!!isDev">
					<td class="text-caption text-italic">OTP</td>
					<td>{{ gt.otp }}</td>
				</tr>
			</tbody>
		</q-markup-table>
		<CardLoading :showing="loading" />
	</q-card-section>
</template>
<script setup>
import config from 'src/config';

defineProps({
	gt: { type: Object, required: true },
	loading: { type: Boolean },
});

const isDev = config.BRAND == 'demo' || config.BRAND == 'local';
</script>
<style lang=""></style>
