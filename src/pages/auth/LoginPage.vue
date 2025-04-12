<template>
	<div class="">
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
					onfocus="this.removeAttribute('readonly');"
					onblur="this.setAttribute('readonly','true');"
				/>
				<q-input
					id="password"
					bg-color="green-1"
					outlined
					label="Password"
					name="password"
					v-model="password"
					type="password"
					required
					autocomplete="off"
					autocapitalize="none"
					readonly
					onfocus="this.removeAttribute('readonly');"
					onblur="this.setAttribute('readonly','true');"
					hint="Password atau kata sandi"
				/>
				<q-btn
					type="submit"
					class="full-width q-pa-sm text-green-10"
					color="green-3"
					label="Login"
				/>

				<q-card class="my-card" flat>
					<q-card-section
						class="text-green-10 text-center bg-green-2 q-pa-sm"
					>
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
		<q-spinner-cube
			v-show="showSpinner"
			color="green-12"
			size="14em"
			class="absolute-center"
		/>
	</div>
</template>

<script setup>
import { onMounted, onUpdated, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import api from 'src/api';
import config from 'src/config';
import { toArray } from 'src/utils/array-object';
import { notifyAlert, notifySuccess } from 'src/utils/notify';
import useAuthStore from 'stores/auth-store';

const router = useRouter();
const login = ref('');
const password = ref('');
const showSpinner = ref(false);

const emit = defineEmits(['title', 'errors']);
emit('title', 'Login');
emit('errors', []);
const auth = useAuthStore();

const props = defineProps({
	credential: { type: Object },
});

const submitLogin = async (e) => {
	const formData = new FormData(e.target);
	const formObject = Object.fromEntries(formData.entries());

	emit('errors', []);
	try {
		showSpinner.value = true;
		const response = await api.post('login', formObject);
		const responseData = response.data;
		const data = responseData.data;
		auth.setUser(data);

		notifySuccess(responseData.message);
		const { user } = data;
		if (!user.confirmed_at) {
			return router.push('/profile');
		}

		return router.push('/');
	} catch (error) {
		// console.log('e', error);
		emit(
			'errors',
			toArray(
				error.response?.data?.message || 'Terjadi sebuah kesalahan',
			),
		);
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

watch(
	[() => props.credential.username, () => props.credential.password],
	([nUsername, nPassword]) => {
		if (config.DEV) {
			if (nUsername) login.value = nUsername;
			if (nPassword) password.value = nPassword;
		}
	},
);

onMounted(() => {
	if (config.DEV) {
		showNotify();
	}
});

onUpdated(() => {
	const resend = document.getElementById('resend-email');
	// console.log(resend);
	if (!resend) return;
	resend.addEventListener('click', async (e) => {
		// console.log('anchor clicked');
		emit('errors', []);
		e.preventDefault();
		const href = resend.href.replace('%2540', '@');
		// console.log(href);
		try {
			showSpinner.value = true;
			const response = await api.get(href);
			const notification = notifyAlert(response.data.message, 0);
			await notification; // tunggu notifikasi ditutup
		} catch (error) {
			emit(
				'errors',
				toArray(
					error.response?.data?.message || 'Terjadi sebuah kesalahan',
				),
			);
		} finally {
			showSpinner.value = false;
		}
	});
});
</script>
<style scoped lang="scss"></style>
