<template>
	<q-item-section>
		<q-item-label class="text-subtitle2">User Data</q-item-label>
		<q-item-label class="q-pl-md">
			<table>
				<tbody>
					<tr>
						<td class="text-italic text-caption q-pr-md">Nama</td>
						<td>{{ user.name }}</td>
					</tr>
					<tr>
						<td class="text-italic text-caption q-pr-md">Email</td>
						<td>{{ user.email }}</td>
					</tr>
					<tr>
						<td class="text-italic text-caption q-pr-md">Username</td>
						<td>{{ user.username }}</td>
					</tr>
					<tr>
						<td class="text-italic text-caption q-pr-md">Telepon</td>
						<td>{{ user.phone || '-' }}</td>
					</tr>
				</tbody>
			</table>
		</q-item-label>
		<slot></slot>
	</q-item-section>
</template>
<script setup>
defineProps({ user: Object });
</script>
<style lang=""></style>
