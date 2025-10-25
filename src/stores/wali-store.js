import { defineStore } from 'pinia';
export default defineStore('wali', {
	state: () => {
		return {
			wali: {
				id: null,
				nama: null,
				tgl_lahir: null,
				tmp_lahir: null,
				nik: null,
				sex: 'L',

				jl: null,
				rt: 1,
				rw: 1,
				desa: null,
				kecamatan: null,
				kabupaten: null,
				provinsi: 'Jawa Timur',
				kode_pos: null,

				pekerjaan: null,
				telepon: null,
				email: null,
				penghasilan: null,
				pa_formal_tingkat: null,
				pa_diniyah_tingkat: null,
				santri: [],
			},
			isNew: true,
		};
	},
	actions: {
		setWali(payload) {
			for (const key in this.wali) {
				if (key in payload) {
					this.wali[key] = payload[key];
				}
			}
		},

		setNull() {
			for (const key in this.wali) {
				this.wali[key] = null;
			}
		},
		setEdit() {
			this.isNew = false;
		},
		setNew() {
			this.isNew = true;
		},
	},
	persist: {
		storage: sessionStorage,
	},
});
