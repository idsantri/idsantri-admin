<template>
	<CardPage>
		<CardHeader title="Profil Pengguna" @on-reload="loadData" />
		<q-card-section class="q-pa-sm">
			<q-card flat bordered style="max-width: 600px">
				<q-card-section class="q-pa-sm">
					<UserImage :user-id="user.id" :show-btn-upload="false" />

					<q-list bordered separator class="q-mt-sm">
						<!-- User Data -->
						<q-item class="q-pa-sm">
							<UserData :user="user" />
						</q-item>

						<!-- User Status -->
						<q-item class="q-pa-sm">
							<q-item-section>
								<q-item-label class="text-subtitle2"> User Status</q-item-label>
								<q-item-label v-if="user">
									<div class="row">
										<div class="col-md-6 col-sm-12">
											<q-toggle
												checked-icon="check"
												unchecked-icon="clear"
												:model-value="user.email_verified_at ? true : false"
												label="Verifikasi"
												disable=""
												color="green"
											/>
											<div class="q-pl-md text-caption">
												Verifikasi (aktivasi) akun hanya bisa dilakukan oleh user yang
												bersangkutan.
											</div>
										</div>
										<div class="col-md-6 col-sm-12">
											<q-toggle
												checked-icon="check"
												unchecked-icon="clear"
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
						<!-- User Groups -->
						<q-item class="q-pa-sm">
							<UserGroups
								:groups="groups"
								:loading="loading"
								:user-id="params.id"
								:disable-toggle="false"
							/>
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
			</q-card>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Users from 'src/models/Users';
import UserGroups from 'src/components/User/UserGroups.vue';
import UserData from 'src/components/User/UserData.vue';
import UserImage from 'src/components/User/UserImage.vue';

const user = ref({});
const groups = ref([]);
const loading = ref(false);
const { params } = useRoute();
const router = useRouter();

async function confirmUser(val) {
	user.value.confirmed_at = !user.value.confirmed_at;
	const data = { confirm: val };

	try {
		const res = await Users.confirm(user.value.id, data);
		if (res) {
			groups.value = res.groups;
		}
	} catch (_err) {
		// console.log('error update user confirm ', _err);

		// rollback
		user.value.confirmed_at = !user.value.confirmed_at;
	}
}

async function loadData() {
	try {
		loading.value = true;
		const data = await Users.getById({ id: params.id });
		if (data) {
			user.value = data.user;
			groups.value = data.groups;
		}
	} catch (_err) {
		// console.error(_err);
		console.log('error get user' + params.id);
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
});
</script>
<style lang=""></style>
