import axios from 'axios';
import config from 'src/config';
import { notifyError } from 'src/utils/notify';
import getToken from './get-token';

const url =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: config.BASE_API;

const api = axios.create({
	baseURL: url + config.END_API,
	withCredentials: true,
});

// Add token to request headers
api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
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
		} else {
			// Teruskan kesalahan lain ke blok catch berikutnya
			return Promise.reject(error);
		}
	},
);

export default api;
