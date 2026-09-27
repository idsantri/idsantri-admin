<template>
	<CardPage>
		<CardHeader title="Profil Pengguna" @onReload="loadData" />
		<q-card-section class="q-pa-sm">
			<q-card class="" flat bordered style="max-width: 600px">
				<q-card-section class="q-pa-sm">
					<UserImage :user-id="user.id" :show-btn-upload="true" />
					<q-banner inline-actions v-if="!user.confirmed_at" class="no-padding text-center q-mt-sm">
						<div class="q-pa-md text-negative bg-red-1" style="border-radius: 10px">
							<div>Akun Anda belum terkonfirmasi.</div>
							<div>Silakan hubungi Admin!</div>
						</div>
					</q-banner>
					<q-list bordered separator class="q-mt-sm">
						<!-- User Data -->
						<q-item class="q-pa-sm">
							<UserData :user="user">
								<q-banner dense inline-actions class="bg-green-1 q-px-none q-py-xs q-mt-sm">
									<template #action>
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
									</template>
									<div class="float-right"></div>
								</q-banner>
							</UserData>
						</q-item>
						<!-- User Group -->
						<q-item class="q-pa-sm">
							<UserGroups :groups="groups" :loading="loading" />
						</q-item>
					</q-list>
					<CardLoading :showing="loading" />
				</q-card-section>
			</q-card>
		</q-card-section>

		<!-- MODAL -->
		<q-dialog v-model="crudShow">
			<UserForm :data="user" @success-submit="loadData" />
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { notifyAlert } from 'src/utils/notify';
import UserForm from 'src/components/forms/UserForm.vue';
import User from 'src/models/User';
import { useAuthStore } from 'src/stores/auth-store';
import UserGroups from 'src/components/User/UserGroups.vue';
import UserData from 'src/components/User/UserData.vue';
import UserImage from 'src/components/User/UserImage.vue';

const user = ref({});
const groups = ref([]);
const loading = ref(false);
const crudShow = ref(false);
const auth = useAuthStore();

async function loadUser() {
	try {
		loading.value = true;
		const response = await User.get();
		// console.log(response);
		if (response) {
			user.value = response.user;
			groups.value = response.groups;
			auth.setUser(response);
		}
	} catch (error) {
		console.log('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

async function loadData() {
	await loadUser();
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
