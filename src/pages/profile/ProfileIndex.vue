<template lang="">
	<q-page class="q-pa-sm">
		<q-card>
			<CardHeader title="Profil Pengguna" @onReload="loadData" />
			<q-card-section class="q-pa-sm">
				<q-card class="" flat bordered style="max-width: 600px">
					<q-card-section class="q-pa-sm">
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
						<div v-if="!user.confirmed_at">
							<div class="text-center q-my-lg">
								<div class="q-pa-md text-negative bg-red-1" style="border-radius: 10px">
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
													<td class="text-italic text-caption">Nama</td>
													<td>{{ user.name }}</td>
												</tr>
												<tr>
													<td class="text-italic text-caption">Email</td>
													<td>{{ user.email }}</td>
												</tr>
												<tr>
													<td class="text-italic text-caption">Username</td>
													<td>{{ user.username }}</td>
												</tr>
												<tr>
													<td class="text-italic text-caption">Telepon</td>
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
												@click="crudShow = true"
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
										<div class="fit row wrap justify-start items-start content-start">
											<div v-for="(item, index) in user.roles" :key="index" class="col-6">
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
						<CardLoading :showing="loading" />
					</q-card-section>
				</q-card>
			</q-card-section>
		</q-card>

		<!-- MODAL -->
		<q-dialog v-model="crudShow">
			<UserForm :data="user" @success-submit="loadData" />
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
import { titleCase } from 'src/utils/format-text';
import { notifyAlert } from 'src/utils/notify';
import UploadImage from 'src/components/ImageUploader.vue';
import UserForm from 'src/components/forms/UserForm.vue';
import User from 'src/models/User';

const user = ref({});
const loading = ref(false);
const loadingImage = ref(false);
const crudShow = ref(false);

const showUploader = ref(false);
const updateUploader = (val) => (showUploader.value = val);

async function successUpload() {
	showUploader.value = false;
	await loadImage();
}

async function loadUser() {
	try {
		loading.value = true;
		const response = await User.get();
		user.value = response.user;
	} catch (error) {
		console.log('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

async function loadImage() {
	const img = await apiGet({
		endPoint: `images/users/${user.value.id}`,
		loading: loadingImage,
	});
	user.value.image = img.image_url || '/user-default.png';
}

async function loadData() {
	await loadUser();
	await loadImage();
}

onMounted(async () => {
	await loadData();
});

const changePassword = async () => {
	await notifyAlert(
		'Untuk mengganti password, silakan <strong>logout (keluar)</strong>. Pada halaman login, klik <strong>lupa password</strong>.<br/>Ikuti petunjuk yang diberikan.',
		0,
	);
};
</script>
<style lang=""></style>
