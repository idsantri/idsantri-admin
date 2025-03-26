<template lang="">
	<q-page class="q-pa-sm">
		<q-card class="" style="max-width: 600px">
			<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
				<div class="flex items-center">
					<div class="text-subtitle2">Profil Pengguna</div>
					<q-space />
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
						<div class="absolute-top-right q-ma-sm">
							<q-btn
								icon="camera"
								round
								no-caps
								dense
								glossy
								class="q-ma-xs q-px-sm"
								@click="showUploader = true"
							/>
						</div>
						<div style="max-width: 150px" class="q-mx-auto">
							<q-img
								:src="user.image"
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
					<div v-if="!user.confirmed_at">
						<div class="text-center q-my-lg">
							<div
								class="q-pa-md text-negative bg-red-1"
								style="border-radius: 10px"
							>
								<div>Akun Anda belum terkonfirmasi.</div>
								<div>Silakan hubungi Admin!</div>
							</div>
						</div>
					</div>
					<q-list bordered separator class="q-mt-sm">
						<q-item class="q-pa-sm">
							<q-item-section>
								<q-item-label overline>User</q-item-label>
								<q-item-label>
									<table>
										<tbody>
											<tr>
												<td
													class="text-italic text-caption"
												>
													Nama
												</td>
												<td>{{ user.name }}</td>
											</tr>
											<tr>
												<td
													class="text-italic text-caption"
												>
													Email
												</td>
												<td>{{ user.email }}</td>
											</tr>
											<tr>
												<td
													class="text-italic text-caption"
												>
													Username
												</td>
												<td>{{ user.username }}</td>
											</tr>
											<tr>
												<td
													class="text-italic text-caption"
												>
													Telepon
												</td>
												<td>{{ user.phone || '-' }}</td>
											</tr>
										</tbody>
									</table>
								</q-item-label>
								<q-item-label class="bg-green-1">
									<div class="float-right">
										<q-btn
											label="User"
											icon="edit"
											no-caps
											dense
											class="q-my-xs q-mx-sm q-px-sm"
											@click="showUserModal"
										/>
										<q-btn
											label="Password"
											icon="edit"
											no-caps
											dense
											class="q-my-xs q-mx-sm q-px-sm"
											@click="changePassword"
										/>
									</div>
								</q-item-label>
							</q-item-section>
						</q-item>
						<q-item class="q-pa-sm">
							<q-item-section>
								<q-item-label overline>User Group</q-item-label>
								<q-item-label>
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
												:label="titleCase(index)"
												disable
											/>
										</div>
									</div>
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</div>
			</q-card-section>
		</q-card>

		<!-- MODAL -->
		<q-dialog v-model="crudShow">
			<q-card class="full-width" style="max-width: 425px">
				<q-form @submit.prevent="submit">
					<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
						Update Username
					</q-card-section>
					<q-card-section>
						<div v-if="loadingCrud">
							<q-dialog v-model="loadingCrud" persistent="">
								<q-spinner-cube
									color="green-12"
									size="8em"
									class="flex q-ma-lg q-mx-auto"
								/>
							</q-dialog>
						</div>
						<q-input
							dense
							outlined
							label="Nama"
							v-model="newUser.name"
							hint=""
						/>
						<q-input
							class="q-mt-sm"
							dense
							outlined
							label="Username"
							v-model="newUser.username"
							hint="Anda bisa login dengan username atau email"
						/>

						<q-input
							class="q-mt-sm"
							dense
							outlined
							label="Nomor Telepon"
							v-model="newUser.phone"
							hint="08123456789"
						/>
					</q-card-section>
					<q-card-actions class="flex bg-green-6">
						<q-space />
						<q-btn
							label="Tutup"
							v-close-popup
							class="bg-green-11"
							no-caps=""
							id="btn-close"
						/>
						<q-btn
							type="submit"
							label="Simpan"
							class="bg-green-10 text-green-11"
							no-caps=""
						/>
					</q-card-actions>
				</q-form>
			</q-card>
		</q-dialog>
		<upload-image
			:show-uploader="showUploader"
			:url="`/images/users/${user.id}`"
			:width="300"
			:height="300"
			img-format="webp"
			@update-uploader="updateUploader"
			@success-upload="successUpload"
		/>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import apiGet from 'src/api/api-get';
import apiUpdate from 'src/api/api-update';
import { titleCase } from 'src/utils/format-text';
import { notifyAlert } from 'src/utils/notify';
import UploadImage from 'src/components/ImageUploader.vue';

const user = ref({});
const loading = ref(false);
const loadingImage = ref(false);
const crudShow = ref(false);
const loadingCrud = ref(false);
const newUser = ref({});

const showUploader = ref(false);
const updateUploader = (val) => (showUploader.value = val);

async function successUpload() {
	showUploader.value = false;
	await loadImage();
}

async function loadData() {
	const data = await apiGet({ endPoint: 'user', loading });
	user.value = data.user;
}

async function loadImage() {
	const img = await apiGet({
		endPoint: `images/users/${user.value.id}`,
		loading: loadingImage,
	});
	user.value.image = img.image_url || '/user-default.png';
}
onMounted(async () => {
	await loadData();
	await loadImage();
});

async function submit() {
	const response = await apiUpdate({
		endPoint: 'user',
		data: {
			username: newUser.value.username,
			name: newUser.value.name,
			phone: newUser.value.phone,
		},
		confirm: true,
		notify: true,
		loading: loadingCrud,
	});
	if (response) {
		document.getElementById('btn-close').click();
		await loadData();
		await loadImage();
	}
}

function showUserModal() {
	Object.assign(newUser.value, user.value);
	crudShow.value = true;
}

const changePassword = async () => {
	await notifyAlert(
		'Untuk mengganti password, silakan <strong>logout (keluar)</strong>. Pada halaman login, klik <strong>lupa password</strong>.<br/>Ikuti petunjuk yang diberikan.',
		0,
	);
};
</script>
<style lang=""></style>
