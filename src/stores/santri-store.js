import { defineStore } from 'pinia';
export default defineStore('santri', {
	state: () => {
		return {
			santri: {
				id: null,
				tgl_daftar_m: null,
				tgl_daftar_h: null,
				nama: null,
				nisn: null,
				nkk: null,
				nik: null,
				tmp_lahir: 'Bangkalan',
				tgl_lahir: null,
				sex: 'L',
				provinsi: 'Jawa Timur',
				kabupaten: 'Kab. Bangkalan',
				kecamatan: null,
				desa: null,
				rt: 1,
				rw: 1,
				jl: null,
				kode_pos: null,

				pa_formal_tingkat: null,
				pa_formal_kelas: null,
				pa_formal_alamat: null,
				pa_diniyah_tingkat: null,
				pa_diniyah_kelas: null,
				pa_diniyah_alamat: null,

				ortu_id: null,
				anak_ke: null,
				wali_id: null,
				wali_status: null,
				data_akhir: '',
				image_url: '',
			},
			wali: { id: null, nama: null, sex: null },
			ortu: { id: null, ayah: null, ibu: null, jumlah_anak: null },
			isNew: true,
		};
	},
	actions: {
		setSantri(payload) {
			for (const key in this.santri) {
				if (key in payload) {
					this.santri[key] = payload[key];
				}
			}
		},

		setWali(payload) {
			for (const key in this.wali) {
				if (key in payload) {
					this.wali[key] = payload[key];
				}
			}
		},

		setOrtu(payload) {
			for (const key in this.ortu) {
				if (key in payload) {
					this.ortu[key] = payload[key];
				}
			}
		},

		setNull() {
			for (const key in this.santri) {
				this.santri[key] = null;
			}
			for (const key in this.wali) {
				this.wali[key] = null;
			}
			for (const key in this.ortu) {
				this.ortu[key] = null;
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
