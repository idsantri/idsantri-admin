<template>
	<q-markup-table flat class="text-green-10">
		<tbody>
			<tr>
				<td class="text-caption text-italic">PJGT ID</td>
				<td>
					<div class="flex flex-center">
						<div>
							{{ gt.pjgt_id }}
						</div>

						<q-space />
						<q-btn class="bg-green-11" icon="info" glossy round dense :to="`/ugt/pjgt/${gt.pjgt_id}`" />
					</div>
				</td>
			</tr>
			<tr>
				<td class="text-caption text-italic">Nama</td>
				<td>{{ gt.pjgt_nama }}</td>
			</tr>
			<tr>
				<td class="text-caption text-italic">Alamat</td>
				<td>
					{{ gt.pjgt_alamat_pendek }}
				</td>
			</tr>
			<tr>
				<td class="text-caption text-italic">Wilayah</td>
				<td>{{ gt.pjgt_wilayah }}</td>
			</tr>
			<tr>
				<td class="text-caption text-italic">Lembaga</td>
				<td>{{ gt.pjgt_jenis_lembaga }} {{ gt.pjgt_nama_lembaga }}</td>
			</tr>
		</tbody>
	</q-markup-table>
	<CardLoading :showing="loading" />
</template>
<script setup>
defineProps({
	gt: {
		type: Object,
		required: true,
	},
	loading: {
		type: Boolean,
		required: true,
	},
});
</script>
<style lang=""></style>
