<template lang="">
	<CardPage>
		<CardHeader title="Profil Pengguna" @on-reload="loadData" />
		<q-card-section class="q-pa-sm">
			<q-card flat bordered style="max-width: 600px">
				<div>
					<q-card-section class="q-pa-sm">
						<div>
							<div style="max-width: 150px" class="q-mx-auto">
								<q-img
									:src="user?.image ? user.image : '/user-default.png'"
									:ratio="1"
									alt="user"
									:img-style="{
										borderRadius: '50%',
										border: '3px',
										borderColor: 'green',
										borderStyle: 'solid',
									}"
								/>
							</div>
						</div>

						<q-list bordered separator class="q-mt-sm">
							<q-item class="q-pa-sm">
								<q-item-section>
									<q-item-label overline>User</q-item-label>
									<q-item-label v-if="user">
										<table>
											<tbody>
												<tr>
													<td class="text-italic text-caption q-pr-sm">Nama</td>
													<td>{{ user.name }}</td>
												</tr>
												<tr>
													<td class="text-italic text-caption q-pr-sm">Email</td>
													<td>{{ user.email }}</td>
												</tr>
												<tr>
													<td class="text-italic text-caption q-pr-sm">Username</td>
													<td>{{ user.username }}</td>
												</tr>
												<tr>
													<td class="text-italic text-caption q-pr-sm">Telepon</td>
													<td>{{ user.phone || '-' }}</td>
												</tr>
											</tbody>
										</table>
									</q-item-label>
								</q-item-section>
							</q-item>
							<q-item class="q-pa-sm">
								<q-item-section>
									<q-item-label overline> User Status</q-item-label>
									<q-item-label v-if="user">
										<div class="row">
											<div class="col-md-6 col-sm-12">
												<q-toggle
													:model-value="user.email_verified_at ? true : false"
													label="Verifikasi"
													disable=""
													color="green"
												/>
												<div class="q-pl-md text-caption">
													Verifikasi akun hanya bisa dilakukan oleh user yang bersangkutan.
												</div>
											</div>
											<div class="col-md-6 col-sm-12">
												<q-toggle
													:model-value="user.confirmed_at ? true : false"
													label="Konfirmasi"
													color="green"
													@update:model-value="confirmUser"
												/>
												<div class="q-pl-md text-caption">
													Konfimasi bahwa Anda mengenal user ini.
												</div>
											</div>
										</div>
									</q-item-label>
								</q-item-section>
							</q-item>
							<q-item class="q-pa-sm">
								<q-item-section>
									<q-item-label overline> User Group (Role) </q-item-label>
									<q-item-label v-if="user">
										<div class="fit row wrap justify-start items-start content-start">
											<div v-for="(role, index) in user.roleArray" :key="index" class="col-6">
												<q-toggle
													v-model="role.value"
													color="green-6"
													:label="role.label"
													:true-value="true"
													:false-value="false"
													@update:model-value="updateRole(role, index)"
												/>
											</div>
										</div>
									</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</q-card-section>
					<q-card-actions class="bg-green-7 q-pa-sm">
						<q-btn
							label="Hapus"
							color="negative"
							no-caps=""
							@click="deleteUser"
							:disable="user?.id ? false : true"
						/>
					</q-card-actions>
					<CardLoading :showing="loading" />
				</div>
			</q-card>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { kebabToTitleCase } from 'src/utils/format-text';
import Users from 'src/models/Users';
import Image from 'src/models/Image';

const user = ref({});
const loading = ref(false);
const { params } = useRoute();
const router = useRouter();

async function updateRole(role, index) {
	const newRole = role.value;
	const data = { role: role.name, value: newRole };
	try {
		await Users.setRole(user.value.id, data);
	} catch (_err) {
		// console.log('error update user role ', _err);

		// rollback
		user.value.roleArray[index].value = !newRole;
	}
}

async function confirmUser(val) {
	user.value.confirmed_at = !user.value.confirmed_at;
	const data = { confirm: val };

	try {
		await Users.confirm(user.value.id, data);
	} catch (_err) {
		// console.log('error update user confirm ', _err);

		// rollback
		user.value.confirmed_at = !user.value.confirmed_at;
	}
}

async function loadImage() {
	if (user.value?.id) {
		try {
			loading.value = true;
			const img = await Image.user(user.value.id);
			user.value.image = img?.image_url ? img.image_url + `?t=${new Date().getTime()}` : '/user-default.png';
		} catch (error) {
			console.log('🚀 ~ loadImage ~ error:', error);
		} finally {
			loading.value = false;
		}
	}
}

function roleArray(obj) {
	return Object.entries(obj).map(([role, value]) => ({
		name: role,
		label: kebabToTitleCase(role),
		value,
	}));
}

async function loadData() {
	try {
		loading.value = true;
		const data = await Users.getById({ id: params.id });
		user.value = data.user;
		user.value.roleArray = roleArray(data.user.roles);
	} catch (_err) {
		// console.error(_err);
		console.log('error get users');
	} finally {
		loading.value = false;
	}
}

async function deleteUser() {
	try {
		loading.value = true;
		const res = await Users.remove({ id: user.value.id });
		if (res) {
			router.go(-1);
		}
	} catch (_err) {
		// console.error(_err);
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await loadData();
	await loadImage();
});
</script>
<style lang=""></style>
