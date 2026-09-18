import { defineBoot } from '#q-app/wrappers';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import config from 'src/config';
import { notifyError } from 'src/utils/notify';
import useAuthStore from 'src/stores/auth-store';
import type { App } from 'vue';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$axios: AxiosInstance;
		$api: AxiosInstance;
	}
}

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : config.BASE_API;
const api = axios.create({
	baseURL: url + config.END_API,
	withCredentials: true,
});

// request
api.interceptors.request.use((config) => {
	// Add token to request headers
	const token: string = useAuthStore().token || '';
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	// Add timezone to request headers
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	config.headers['X-Timezone'] = timezone;
	// console.log('🚀 ~ api.interceptors.request.use ~ config:', config);

	return config;
});

// response
api.interceptors.response.use(
	(response) => {
		// console.log('🚀 ~ response:', response);
		return response;
	},
	(error) => {
		// Tangani kesalahan jaringan atau koneksi di sini
		if (!error.response) {
			// Kesalahan tidak ada respons (seperti jaringan terputus)
			// console.log('e', error);
			notifyError('Tidak dapat terhubung ke server');
		} else if (error?.response?.data?.data?.code === 'TOKEN_EXPIRED') {
			notifyError(error?.response?.data?.message || 'Masa berlaku token telah habis.');
			const authStore = useAuthStore();
			authStore.logout();
			// setTimeout(() => routerInstance.push({ name: 'Login' }), 2500);
		} else {
			// Teruskan kesalahan lain ke blok catch berikutnya
			// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
			return Promise.reject(error);
		}
	},
);

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

export default defineBoot(({ app }: { app: App }) => {
	// for use inside Vue files (Options API) through this.$axios and this.$api

	app.config.globalProperties.$axios = axios;
	// ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
	//       so you won't necessarily have to import axios in each vue file

	app.config.globalProperties.$api = api;
	// ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
	//       so you can easily perform requests against your app's API
});

export { api };
