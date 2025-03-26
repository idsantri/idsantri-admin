<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="" style="max-width: 600px">
			<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
				<div class="flex items-center">
					<div class="text-subtitle2">Profil Pengguna</div>
					<q-space />
					<q-btn
						no-caps
						label="Kembali"
						icon="reply"
						dense
						class="q-px-md"
						outline
						@click="$router.go(-1)"
					/>
				</div>
			</q-card-section>

			<q-card-section class="q-pa-sm">
				<div v-if="loading">
					<q-spinner-cube
						color="green-12"
						size="8em"
						class="flex q-ma-lg q-mx-auto"
					/>
				</div>
				<div v-else>
					<div>
						<div style="max-width: 150px" class="q-mx-auto">
							<q-img
								:src="user ? user.image : '/user-default.png'"
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
												<td
													class="text-italic text-caption q-pr-sm"
												>
													Nama
												</td>
												<td>{{ user.name }}</td>
											</tr>
											<tr>
												<td
													class="text-italic text-caption q-pr-sm"
												>
													Email
												</td>
												<td>{{ user.email }}</td>
											</tr>
											<tr>
												<td
													class="text-italic text-caption q-pr-sm"
												>
													Username
												</td>
												<td>{{ user.username }}</td>
											</tr>
											<tr>
												<td
													class="text-italic text-caption q-pr-sm"
												>
													Telepon
												</td>
												<td>{{ user.phone || '-' }}</td>
											</tr>
										</tbody>
									</table>
								</q-item-label>
							</q-item-section>
						</q-item>
						<q-item class="q-pa-sm">
							<q-item-section>
								<q-item-label overline>
									User Status</q-item-label
								>
								<q-item-label v-if="user">
									<div class="row">
										<div class="col-md-6 col-sm-12">
											<q-toggle
												:model-value="
													user.email_verified_at
														? true
														: false
												"
												label="Verifikasi"
												disable=""
												color="green"
											/>
											<div class="q-pl-md text-caption">
												Verifikasi akun hanya bisa
												dilakukan oleh user yang
												bersangkutan.
											</div>
										</div>
										<div class="col-md-6 col-sm-12">
											<q-toggle
												:model-value="
													user.confirmed_at
														? true
														: false
												"
												label="Konfirmasi"
												color="green"
												@update:model-value="
													confirmUser
												"
											/>
											<div class="q-pl-md text-caption">
												Konfimasi bahwa Anda mengenal
												user ini.
											</div>
										</div>
									</div>
								</q-item-label>
							</q-item-section>
						</q-item>
						<q-item class="q-pa-sm">
							<q-item-section>
								<q-item-label overline>
									User Group (Role)
								</q-item-label>
								<q-item-label v-if="user">
									<div
										class="fit row wrap justify-start items-start content-start"
									>
										<div
											v-for="(item, index) in user.roles"
											:key="index"
											class="col-6"
										>
											<q-toggle
												:model-value="item"
												color="green"
												:label="kebabToTitleCase(index)"
												@update:model-value="
													setRole(index, item)
												"
												:true-value="true"
												:false-value="false"
											/>
										</div>
									</div>
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</div>
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
		</q-card>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiGet from 'src/api/api-get';
import apiUpdate from 'src/api/api-update';
import apiDelete from 'src/api/api-delete';
import { kebabToTitleCase } from 'src/utils/format-text';

const user = ref({});
const loading = ref(false);
const loadingImage = ref(false);
const { params } = useRoute();
const router = useRouter();

async function setRole(role, value) {
	user.value.roles[role] = !value;
	const data = { role, value: !value };
	// console.log(data);
	const update = await apiUpdate({
		endPoint: `users/${user.value.id}/roles`,
		data,
		confirm: false,
	});
	if (!update) return (user.value.roles[role] = value);
}

async function confirmUser(val) {
	user.value.confirmed_at = !user.value.confirmed_at;
	const data = { confirm: val };

	const result = await apiUpdate({
		endPoint: `users/${user.value.id}/confirm`,
		data,
		confirm: false,
	});

	if (!result) return (user.value.confirmed_at = !user.value.confirmed_at);
}

async function loadData() {
	const data = await apiGet({ endPoint: `users/${params.id}`, loading });
	user.value = data.user;
	// console.log(user.value);
	if (user.value?.id) {
		const img = await apiGet({
			endPoint: `images/users/${user.value.id}`,
			loading: loadingImage,
		});
		user.value.image = img.image_url || '/user-default.png';
	}
}

async function deleteUser() {
	const del = await apiDelete({ endPoint: `users/${user.value.id}` });
	if (del) {
		router.go(-1);
	}
}

onMounted(async () => {
	await loadData();
});
</script>
<style lang=""></style>
