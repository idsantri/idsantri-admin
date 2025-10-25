import { defineStore } from 'pinia';
export default defineStore('ortu', {
	state: () => {
		return {
			ortu: {
				id: null,

				ayah: null,
				a_tgl_lahir: null,
				a_tmp_lahir: null,
				a_nik: null,
				a_hidup: 1,
				a_pa_formal_tingkat: null,
				a_pa_diniyah_tingkat: null,
				a_pekerjaan: null,

				ibu: null,
				i_tgl_lahir: null,
				i_tmp_lahir: null,
				i_nik: null,
				i_hidup: 1,
				i_pa_formal_tingkat: null,
				i_pa_diniyah_tingkat: null,
				i_pekerjaan: null,

				jumlah_anak: null,
				santri: [],
			},
			isNew: true,
		};
	},
	actions: {
		setOrtu(payload) {
			for (const key in this.ortu) {
				if (key in payload) {
					this.ortu[key] = payload[key];
				}
			}
		},

		setNull() {
			for (const key in this.ortu) {
				this.ortu[key] = null;
			}
			this.ortu.a_hidup = 1;
			this.ortu.i_hidup = 1;
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
