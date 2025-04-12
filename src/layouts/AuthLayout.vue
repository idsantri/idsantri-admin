<template>
	<q-layout>
		<q-page-container>
			<q-page class="flex flex-center">
				<q-card class="my-card q-pa-lg bg-green-5 text-green-1">
					<q-card-section class="no-padding q-mb-md">
						<div
							v-if="!isPwaInstalled && isMobile()"
							class="absolute-top-left"
							title="Install aplikasi untuk mendapatkan pengalaman yang lebih baik"
						>
							<q-btn
								v-if="isAndroid()"
								icon="install_mobile"
								round
								class="text-green-10 bg-green-13"
								glossy
								@click="installPwa"
							/>
							<q-btn
								v-if="isIos()"
								icon="install_mobile"
								round
								class="text-green-10 bg-green-13"
								glossy
								@click="clickIos"
							/>
						</div>
						<logo-circle
							:size="100"
							:border="3"
							class="q-mx-auto"
						/>
						<q-btn
							icon="info"
							round
							class="absolute-top-right text-green-13 bg-green-10"
							glossy
							v-if="
								config.DEV == true &&
								$route.fullPath.includes('login')
							"
							@click="modalInfo = true"
							title="Klik untuk mendapatkan info login"
						/>

						<div class="container-title">
							<h1 class="title text-green-10">ID Santri</h1>
							<p class="sub1">Sistem Informasi</p>
							<p class="sub2">
								{{ config.INS_DESC }}
								{{ config.INS_NAME }}
							</p>
						</div>
						<q-separator dark />
						<h3 class="sub-title">{{ title }}</h3>
					</q-card-section>

					<q-banner
						v-if="errors.length > 0"
						id="error"
						class="q-mb-sm no-padding bg-red-2 text-red"
					>
						<ul class="q-my-xs">
							<li v-for="(error, index) in errors" :key="index">
								<span v-html="error"></span>
							</li>
						</ul>
					</q-banner>

					<q-card-section class="no-padding no-margin">
						<!-- ROUTER -->
						<router-view
							@title="handleTitle"
							@errors="handleErrors"
							:credential="credential"
						/>
					</q-card-section>
				</q-card>
			</q-page>

			<!-- INFO LOGIN -->
			<q-dialog v-model="modalInfo">
				<info-login @setCredential="setCredential" />
			</q-dialog>

			<!-- INSTALL PWA -->
			<q-dialog v-model="modalIos">
				<info-ios />
			</q-dialog>
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from 'vue';
import config from 'src/config';
import LogoCircle from 'components/LogoCircle.vue';
import InfoIos from './comp/InfoIos.vue';
import InfoLogin from './comp/InfoLogin.vue';

const title = ref('Autentikasi');
const handleTitle = (value) => (title.value = value);
const errors = ref([]);
const handleErrors = (value) => (errors.value = value);
const modalInfo = ref(false);
const modalIos = ref(false);
const credential = ref({});

const setCredential = (item) => {
	credential.value = item;
	modalInfo.value = false;
};

/**
 * -----------------------------------------
 * PWA
 * -----------------------------------------
 */

const getOS = () => {
	const userAgent = window.navigator.userAgent;
	const osList = [
		{ regex: /windows/i, name: 'Windows' },
		{ regex: /android/i, name: 'Android' },
		{ regex: /(iphone|ipad|ipod)/i, name: 'iOS' },
		{ regex: /linux/i, name: 'Linux' },
		{ regex: /mac/i, name: 'Mac/iOS' },
	];

	return (
		osList.find(({ regex }) => regex.test(userAgent))?.name || 'Unknown OS'
	);
};
const isIos = () => getOS() === 'iOS';
const isAndroid = () => getOS() === 'Android';
const isMobile = () => isIos() || isAndroid();

const deferredPrompt = ref(null);
window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault();
	deferredPrompt.value = e;
});

const isPwaInstalled = ref(
	window.matchMedia('(display-mode: standalone)').matches,
);

const installPwa = () => {
	if (deferredPrompt.value) {
		deferredPrompt.value.prompt();
		deferredPrompt.value.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
			}
		});
		// reset
		deferredPrompt.value = null;
	}
};

const clickIos = () => {
	modalIos.value = true;
};
</script>

<style scoped>
.title {
	font-size: 2em;
	margin: 0 auto;
	padding: 0;
	text-align: center;
	height: 35px;
	line-height: 35px;
	letter-spacing: 1px;
}
.sub1 {
	text-align: center;
	font-size: 1rem;
	margin: 0;
	font-weight: 300;
	letter-spacing: 5px;
}
.sub2 {
	text-align: center;
	font-size: 1.1rem;
	margin: 0;
	font-weight: 300;
}
.sub-title {
	font-size: 1.7em;
	margin: 0 auto;
	padding: 0;
	font-weight: 500;
	text-align: center;
	height: 30px;
	line-height: 30px;
	margin-top: 10px;
}

.my-card {
	width: 400px;
	max-width: 95vw;
}

.container-title {
	margin-bottom: 10px;
}
</style>
