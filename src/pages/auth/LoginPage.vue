<template>
	<div class="">
		<q-btn
			v-if="btnVerify"
			class="full-width q-pa-sm q-mb-sm text-indigo-10 bg-info"
			:label="verifiedData.resend.label"
			no-caps
			@click="resendEmail"
		/>
		<form @submit.prevent="submitLogin">
			<div class="q-gutter-y-md column">
				<q-input
					bg-color="green-1"
					outlined
					label="Login"
					name="login"
					v-model="login"
					required
					hint="Username atau email/surel Anda!"
					autocomplete="off"
					autocapitalize="none"
					readonly
					onfocus="this.removeAttribute('readonly')"
					onblur="this.setAttribute('readonly', 'true')"
					autocorrect="off"
					ref="inputLogin"
				/>
				<q-input
					id="password"
					:type="isPwd ? 'password' : 'text'"
					bg-color="green-1"
					outlined
					label="Password"
					name="password"
					v-model="password"
					required
					autocomplete="off"
					autocapitalize="none"
					readonly
					onfocus="this.removeAttribute('readonly')"
					onblur="this.setAttribute('readonly', 'true')"
					hint="Password atau kata sandi"
				>
					<template v-slot:append>
						<q-icon
							:name="isPwd ? 'visibility_off' : 'visibility'"
							class="cursor-pointer"
							@click="isPwd = !isPwd"
						/>
					</template>
				</q-input>
				<q-btn type="submit" class="full-width q-pa-sm text-green-10" color="green-3" label="Login" />

				<q-card class="my-card" flat>
					<q-card-section class="text-green-10 text-center bg-green-2 q-pa-sm">
						<q-btn
							outline
							color="green-10"
							class="full-width text-weight-regular"
							no-caps
							to="/register"
							label="Belum punya akun? Daftar!"
						/>
						<q-btn
							outline
							color="green-10"
							class="full-width text-weight-regular q-mt-sm"
							no-caps
							to="/forgot-password"
							label="Lupa password? Atur ulang!"
						/>
					</q-card-section>
				</q-card>
			</div>
		</form>
		<q-spinner-cube v-show="showSpinner" color="green-12" size="14em" class="absolute-center" />
	</div>
</template>

<script setup>
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import config from 'src/config';
import { toArray } from 'src/utils/array-object';
import { notifyError, notifySuccess } from 'src/utils/notify';
import useAuthStore from 'stores/auth-store';
import Auth from 'src/models/Auth';

const emit = defineEmits(['title', 'errors']);
emit('title', 'Login');
emit('errors', []);

const props = defineProps({
	credential: { type: Object },
});

const firstInput = useTemplateRef('inputLogin');
const router = useRouter();
const login = ref('');
const password = ref('');
const showSpinner = ref(false);
const isPwd = ref(true);
const auth = useAuthStore();
const verifiedData = ref(null);
const btnVerify = ref(false);

const submitLogin = async (e) => {
	const formData = new FormData(e.target);
	const formObject = Object.fromEntries(formData.entries());

	emit('errors', []);
	try {
		showSpinner.value = true;

		const responseData = await Auth.login(formObject);
		const data = responseData.data;
		const user = data.user;
		auth.setUser(data);

		notifySuccess(responseData?.message);
		if (!user.confirmed_at) {
			return router.push('/profile');
		}

		return router.push('/');
	} catch (error) {
		// console.log('e', error.response.data);
		const data = error.response?.data;
		if (data?.data?.code == 'EMAIL_NOT_VERIFIED' || data?.data?.verification_required) {
			verifiedData.value = data?.data;
			btnVerify.value = true;
		}

		emit('errors', toArray(data?.message || 'Terjadi sebuah kesalahan'));
		firstInput.value.focus();
	} finally {
		showSpinner.value = false;
	}
};

const resendEmail = async (_e) => {
	const email = verifiedData.value?.resend?.payload?.email;
	if (!email) {
		notifyError('Email tidak ditemukan');
		return;
	}

	emit('errors', []);
	btnVerify.value = false;
	showSpinner.value = true;
	try {
		const responseData = await Auth.resendVerification(email);
		notifySuccess(responseData?.message);
	} catch (error) {
		emit('errors', toArray(error.response?.data?.message || 'Terjadi sebuah kesalahan'));
		firstInput.value.focus();
	} finally {
		showSpinner.value = false;
	}
};

function showNotify() {
	const $q = useQuasar();
	$q.notify({
		message: 'Klik tombol info (kanan-atas) untuk info login.',
		icon: 'info',
		color: 'green-7',
		textColor: 'green-11',
		// position: 'center',
		timeout: 10000,
		actions: [
			{
				color: 'green-11',
				icon: 'close',
				round: true,
			},
		],
	});
}

watch([() => props.credential.username, () => props.credential.password], ([nUsername, nPassword]) => {
	if (config.DEV) {
		if (nUsername) login.value = nUsername;
		if (nPassword) password.value = nPassword;
	}
});

onMounted(() => {
	if (config.DEV) {
		showNotify();
	}
	firstInput.value.focus();
});
</script>
<style scoped lang="scss"></style>
