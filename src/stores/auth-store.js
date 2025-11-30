import { defineStore } from 'pinia';

const useAuthStore = defineStore('auth', {
	state: () => ({
		token: null,
		user: null,
		roles: null,
		permissions: null,
		keepAliveInterval: null,
		keepAliveDelay: 1 * 60 * 1000, // Update timestamp setiap 1 menit (saat aktif)
		sessionTimeout: 2 * 60 * 1000, // Logout otomatis jika tidak aktif 2 menit
	}),

	getters: {
		/**
		 * Cek apakah user sudah login atau tidak.
		 *
		 * Mengembalikan true jika user sudah login dan session masih valid, false jika tidak.
		 * @return {boolean}
		 */
		isLoggedIn: (state) => {
			// 1. Cek keberadaan token
			if (!state.token) return false;
			// 2. Cek validitas waktu (apakah session expired?)
			return state.checkSessionValidity();
		},
	},

	actions: {
		/**
		 * Cek validitas session
		 *
		 * Jika tidak ada timestamp, anggap invalid.
		 * Jika selisih waktu melebihi batas timeout, maka session dianggap expired.
		 * @return {boolean} True jika session masih valid, false jika tidak.
		 */
		checkSessionValidity() {
			const lastActive = localStorage.getItem('authTimestamp');

			// Jika tidak ada timestamp, anggap invalid
			if (!lastActive) return false;

			const now = Date.now();
			const diff = now - parseInt(lastActive);

			// Jika selisih waktu melebihi batas timeout
			if (diff > this.sessionTimeout) {
				console.log(`🔴 Session expired. Inactive for ${Math.floor(diff / 1000)}s`);
				return false;
			}

			return true;
		},

		/**
		 * Update timestamp di local storage
		 *
		 * Digunakan untuk memperbarui session agar tidak expired
		 * @returns {void}
		 */
		updateTimestamp() {
			const now = Date.now().toString();
			localStorage.setItem('authTimestamp', now);
		},

		/**
		 * Set user data dan token
		 *
		 * digunakan untuk mengatur user data dan token
		 * @param {Object} payload - Objek yang berisi user data dan token
		 * @returns {void}
		 * @example
		 * setUser({
		 *  user: {
		 *    id: 1,
		 *    nama: 'John Doe',
		 *    email: 'johndoe@example.com',
		 *  },
		 *  roles: ['admin', 'user'],
		 *  permissions: ['read', 'write', 'delete'],
		 *  token: '1234567890abcdef',
		 * })
		 */
		setUser(payload) {
			if (payload.roles) this.roles = payload.roles;
			if (payload.permissions) this.permissions = payload.permissions;
			if (payload.user) this.user = payload.user;

			if (payload.token) {
				this.token = payload.token;
				// Set timestamp awal
				this.updateTimestamp();
				console.log('✅ Auth token set');

				// Mulai keep alive segera setelah login
				this.startKeepAlive();
			}
		},

		/**
		 * Logout
		 *
		 * Reset state dan menghapus timestamp dari storage.
		 * @return {void}
		 */
		logout() {
			// Reset state
			this.token = null;
			this.user = null;
			this.roles = null;
			this.permissions = null;

			// Hapus timestamp dari storage
			localStorage.removeItem('authTimestamp');

			// Stop interval
			this.stopKeepAlive();

			console.log('🔴 Auth cleared / Logged out');
		},

		/**
		 * Inisialisasi session.
		 *
		 * Jika token ada tapi waktu sudah expired, maka logout dan hapus token.
		 * Jika token ada dan waktu masih valid, maka update timestamp dan mulai keep alive.
		 * @return {void}
		 */
		initSession() {
			// Jika punya token tapi waktu sudah expired
			if (this.token && !this.checkSessionValidity()) {
				console.log('⚠️ Token found but session expired on init');
				this.logout();
				return;
			}

			// Jika valid, update timestamp (perpanjang session karena user baru buka app)
			if (this.token) {
				console.log('✅ Session restored & extended');
				this.updateTimestamp();
				this.startKeepAlive();
			}
		},

		/**
		 * Mulai interval Keep Alive
		 *
		 * Mulai interval Keep Alive untuk memperbarui session timeout.
		 * Jika token tidak ada atau waktu sudah expired, maka logout dan hapus token.
		 * Jika token ada dan waktu masih valid, maka update timestamp dan mulai keep alive.
		 * @return {void}
		 */
		startKeepAlive() {
			// Prevent multiple intervals
			if (this.keepAliveInterval) return;

			console.log('✅ Keep alive started');

			this.keepAliveInterval = setInterval(() => {
				// Cek validitas setiap tick (jaga-jaga user idle lama tapi browser tidak sleep)
				if (!this.token || !this.checkSessionValidity()) {
					this.logout();
					// Opsional: Redirect ke login bisa ditangani di App.vue via watch/listener
					return;
				}

				// Jika masih valid, update timestamp (perpanjang session)
				this.updateTimestamp();
				console.log('🔄 Session extended (Keep Alive)');
			}, this.keepAliveDelay);
		},

		/**
		 * Stop interval Keep Alive.
		 *
		 * Jika interval Keep Alive sedang berjalan, maka fungsi ini akan menghentikan interval tersebut.
		 * @return {void}
		 */
		stopKeepAlive() {
			if (this.keepAliveInterval) {
				clearInterval(this.keepAliveInterval);
				this.keepAliveInterval = null;
				console.log('🛑 Keep alive stopped');
			}
		},
	},

	persist: {
		storage: localStorage,
		// Kita hanya persist data user, interval & config tidak perlu
		pick: ['token', 'user', 'roles', 'permissions'],
	},
});

export default useAuthStore;
