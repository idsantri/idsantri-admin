<template>
	<q-layout>
		<q-page-container>
			<q-page class="flex flex-center">
				<q-card class="my-card q-pa-lg bg-green-5 text-green-1">
					<q-card-section class="no-padding q-mb-md">
						<q-btn
							icon="install_mobile"
							round
							class="absolute-top-left text-green-11 bg-green-10"
							glossy
							v-if="!isPwaInstalled && isMobile"
							@click="installPwa"
							title="Install aplikasi untuk mendapatkan pengalaman yang lebih baik"
						/>
						<logo-circle :size="100" class="q-mx-auto" />
						<q-btn
							icon="info"
							round
							class="absolute-top-right text-green-11 bg-green-10"
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
						<router-view
							@title="handleTitle"
							@errors="handleErrors"
							:credential="credential"
						/>
					</q-card-section>
				</q-card>
			</q-page>

			<q-dialog v-model="modalInfo">
				<q-card style="min-width: 300px">
					<q-card-section
						class="q-pa-sm bg-green-6 text-green-11 text-subtitle1"
					>
						Info Login
					</q-card-section>
					<q-card-section class="q-pa-sm">
						<q-markup-table flat bordered separator="horizontal">
							<thead>
								<tr>
									<th class="text-left text-overline">
										Username
									</th>
									<th class="text-left text-overline">
										Password
									</th>
									<th class="text-left text-overline">
										Deskripsi
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(item, index) in login"
									:key="index"
									@click="rowClick(item)"
									class="cursor-pointer"
								>
									<td class="text-weight-light">
										{{ item.username }}
									</td>
									<td class="text-weight-light">
										{{ item.password }}
									</td>
									<td class="text-weight-light">
										{{ item.description }}
									</td>
								</tr>
							</tbody>
						</q-markup-table>
					</q-card-section>

					<q-card-actions align="right" class="bg-green-5">
						<q-btn
							outline
							no-caps
							label="Tutup"
							color="green-11"
							class="bg-green-6"
							glossy
							v-close-popup
						/>
					</q-card-actions>
				</q-card>
			</q-dialog>
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from 'vue';
import config from 'src/config';
import LogoCircle from 'components/LogoCircle.vue';

const title = ref('Autentikasi');
const handleTitle = (value) => (title.value = value);
const errors = ref([]);
const handleErrors = (value) => (errors.value = value);
const modalInfo = ref(false);
const credential = ref({});

function rowClick(item) {
	if (config.DEV) {
		credential.value = item;
	}
	modalInfo.value = false;
}

const login = [
	{
		password: '112233',
		username: 'sekretariat',
		description: 'Akses kesekretariatan',
	},
	{
		password: '112233',
		username: 'madrasah',
		description: 'Akses Kemadrasahan',
	},
	{
		password: '112233',
		username: 'keamanan',
		description: 'Akses Keamanan',
	},
	{
		password: '112233',
		username: 'ugt',
		description: 'Akses Urusan Guru Tugas',
	},
	{
		password: '112233',
		username: 'bendahara',
		description: 'Akses Kebendaharaan (Iuran)',
	},
	{
		password: '112233',
		username: 'makhadiyah',
		description: 'Akses Kedaerahan',
	},
	{
		password: '112233',
		username: 'panitia',
		description: 'Akses Panitia Ujian',
	},
];

/**
 * -----------------------------------------
 * PWA
 * -----------------------------------------
 */
const deferredPrompt = ref(null);
window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault();
	deferredPrompt.value = e;
});

const isPwaInstalled = ref(
	window.matchMedia('(display-mode: standalone)').matches,
);
const isMobile = ref(window.matchMedia('(max-width: 1024px)').matches);

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
