import api from 'src/api';

class Auth {
	constructor() {
		this._path = 'auth';
	}

	async register(data) {
		const response = await api.post(this._path + '/register', data);
		return response?.data;
	}

	async login(data) {
		const response = await api.post(this._path + '/login', data);
		return response?.data;
	}

	async resendVerification(email) {
		const response = await api.post(this._path + '/email-resend', { email });
		return response?.data;
	}

	// not used yet
	async verifyEmail(id, hash) {
		const response = await api.get(this._path + '/email-verify/' + id + '/' + hash);
		return response?.data;
	}

	async forgotPassword(email) {
		const response = await api.post(this._path + '/forgot-password', { email });
		return response?.data;
	}

	async resetPassword(data) {
		const response = await api.post(this._path + '/reset-password', data);
		return response?.data;
	}

	async logout() {
		const response = await api.delete(`${this._path}/logout`);
		return response?.data;
	}
}

export default new Auth();
