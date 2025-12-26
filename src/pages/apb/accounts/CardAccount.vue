<template lang="">
	<q-markup-table flat bordered>
		<tbody>
			<tr>
				<td>ID</td>
				<td>{{ account?.id }}</td>
			</tr>
			<tr>
				<td>Kategori</td>
				<td>{{ account?.kategori }}</td>
			</tr>
			<tr>
				<td>Group</td>
				<td>{{ account?.group }}</td>
			</tr>
			<tr>
				<td>Nama</td>
				<td>{{ account?.nama }}</td>
			</tr>
			<tr>
				<td>Saldo Normal</td>
				<td>
					{{ account?.saldo_normal == 'D' ? 'Debit' : 'Kredit' }}
				</td>
			</tr>
			<tr>
				<td>Sembunyikan</td>
				<td>
					<q-toggle
						:model-value="account?.hidden"
						:true-value="true"
						:false-value="false"
						checked-icon="check"
						unchecked-icon="clear"
						color="negative"
						@update:model-value="(value, event) => $emit('update', { ...account, hidden: value })"
					/>
				</td>
			</tr>
		</tbody>
	</q-markup-table>
</template>
<script setup>
defineProps({
	account: { type: Object, required: true },
});
</script>
<style lang=""></style>
