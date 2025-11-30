<template>
	<CardPage>
		<CardHeader title="Pengaturan Pengguna" @on-reload="loadData" />
		<q-card-section class="q-pa-sm">
			<q-table
				bordered
				flat
				:rows="users"
				:columns="columns"
				row-key="name"
				:loading="loading"
				:filter="filter"
				@row-click="(evt, row, index) => $router.push(`/settings/users/${row.id}`)"
				:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
			>
				<!-- <template v-slot:top-left>
					<div class="text-h6 text-green-10">Data Pengguna</div>
				</template> -->
				<template v-slot:top-right>
					<q-input outlined dense debounce="300" v-model="filter" placeholder="Cari">
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>
			</q-table>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import Users from 'src/models/Users';
import { onMounted, ref } from 'vue';

const filter = ref('');
const loading = ref(false);
const users = ref([]);

async function loadData() {
	try {
		loading.value = true;
		const data = await Users.getAll({ notifySuccess: true });
		users.value = data.users;
	} catch (_err) {
		// console.error(_err);
		console.log('error get users');
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
});

const columns = [
	{
		name: 'name',
		label: 'Nama',
		align: 'left',
		field: 'name',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
		// sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
	{
		name: 'username',
		label: 'Username',
		align: 'left',
		field: 'username',
		sortable: true,
		// sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
	{
		name: 'email',
		label: 'Email',
		align: 'left',
		field: 'email',
		sortable: true,
		// sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
	{
		name: 'roles',
		label: 'Group (Role)',
		align: 'left',
		field: 'roles',
		sortable: true,
		style: 'white-space: normal; word-wrap: break-word;',
		// sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
	{
		name: 'confirmed_at',
		label: 'Konfirmasi',
		align: 'left',
		field: 'confirmed_at',
		format: (val) => `${val ? 'Ya' : 'Tidak'}`,
		sortable: true,
		// sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
	{
		name: 'verified',
		label: 'Verikasi',
		align: 'left',
		field: 'email_verified_at',
		format: (val) => `${val ? 'Ya' : 'Tidak'}`,
		sortable: true,
		// sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
];
</script>
<style></style>
