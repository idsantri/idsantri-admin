<template>
	<div class="">
		<form @submit.prevent="register">
			<div class="q-gutter-y-md column">
				<q-input
					required
					bg-color="green-1"
					outlined
					v-model="name"
					minlength="5"
					label="Nama"
					autocorrect="off"
					placeholder="Nama Anda"
					autocapitalize="words"
					ref="firstInput"
				/>
				<q-input
					bg-color="green-1"
					outlined
					v-model="email"
					type="email"
					required
					label="Email/Surel"
					hint="Kami tidak akan membagikan email/surel Anda"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
					readonly
					onfocus="this.removeAttribute('readonly');"
					onblur="this.setAttribute('readonly','true');"
				/>
				<q-input
					bg-color="green-1"
					outlined
					v-model="password"
					:type="isPwd ? 'password' : 'text'"
					required
					label="Password"
					placeholder="Masukkan password!"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
					readonly
					onfocus="this.removeAttribute('readonly');"
					onblur="this.setAttribute('readonly','true');"
				>
					<template v-slot:append>
						<q-icon
							:name="isPwd ? 'visibility_off' : 'visibility'"
							class="cursor-pointer"
							@click="isPwd = !isPwd"
						/>
					</template>
				</q-input>
				<q-input
					bg-color="green-1"
					round
					outlined
					v-model="password_confirmation"
					:type="isPwd ? 'password' : 'text'"
					required
					label="Konfirmasi Password"
					placeholder="Ulangi password!"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
					readonly
					onfocus="this.removeAttribute('readonly');"
					onblur="this.setAttribute('readonly','true');"
				>
					<template v-slot:append>
						<q-icon
							:name="isPwd ? 'visibility_off' : 'visibility'"
							class="cursor-pointer"
							@click="isPwd = !isPwd"
						/>
					</template>
				</q-input>
				<q-btn type="submit" class="full-width q-pa-sm text-green-10" color="green-3" label="Daftar" />

				<q-card class="my-card" flat>
					<q-card-section class="text-green-10 text-center bg-green-2 q-pa-sm">
						<q-btn
							outline
							color="green-10"
							class="full-width text-weight-regular"
							no-caps
							to="/login"
							label="Sudah punya akun? Login"
						/>
					</q-card-section>
				</q-card>
			</div>
		</form>
		<q-spinner-cube v-show="showSpinner" color="green-12" size="14em" class="absolute-center" />
	</div>
</template>

<script setup>
import api from 'src/api';
import { useRouter } from 'vue-router';
import { onMounted, ref, useTemplateRef } from 'vue';
import { toArray } from 'src/utils/array-object';
import { notifyAlert } from 'src/utils/notify';

const emit = defineEmits(['title', 'errors']);
emit('title', 'Daftar');
emit('errors', []);

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const isPwd = ref(true);
const showSpinner = ref(false);
const firstInput = useTemplateRef('firstInput');

onMounted(() => {
	firstInput.value.focus();
});

const register = async () => {
	emit('errors', []);
	try {
		showSpinner.value = true;
		const response = await api.post('register', {
			name: name.value,
			email: email.value.toLowerCase(),
			password: password.value,
			password_confirmation: password_confirmation.value,
		});
		const notification = notifyAlert(response.data.message, 0);
		await notification; // tunggu notifikasi ditutup
		router.push({ name: 'Login' });
	} catch (error) {
		emit('errors', toArray(error.response?.data?.message || 'Terjadi sebuah kesalahan'));
		firstInput.value.focus();
	} finally {
		showSpinner.value = false;
	}
};
</script>
