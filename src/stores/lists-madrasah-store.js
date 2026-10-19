import { defineStore } from 'pinia';
export default defineStore('lists-madrasah', {
	state: () => {
		return {
			thAjaran: [],
			ujian: [
				{ value: 1, label: 'Satu' },
				{ value: 2, label: 'Dua' },
				{ value: 3, label: 'Tiga' },
				{ value: 4, label: 'Empat' },
			],
			bulanUjianSetting: [],
			bulanUjianList: [],
		};
	},

	getters: {
		getThAjaran: (state) => state.thAjaran,
		getUjian: (state) => state.ujian,
	},

	actions: {
		setThAjaran(payload) {
			this.thAjaran = payload;
		},

		addTingkatToTahun(payloadTingkat, tahun) {
			this.thAjaran.forEach((th) => {
				if (th.th_ajaran_h == tahun) {
					th.tingkat = payloadTingkat;
				}
			});
		},

		getTingkatByTahun(tahun) {
			const filterTahun = this.thAjaran.find((th) => {
				return th.th_ajaran_h == tahun;
			});
			return filterTahun?.tingkat || [];
		},

		addKelasToTingkatByTahun(payloadKelas, tingkat_id, tahun) {
			this.thAjaran.forEach((th) => {
				if (th.th_ajaran_h == tahun) {
					th.tingkat.forEach((tk) => {
						if (tk.tingkat_id == tingkat_id) {
							tk.kelas = payloadKelas;
						}
					});
				}
			});
		},

		getKelasByTingkatAndTahun(tingkat_id, tahun) {
			const filterTahun = this.thAjaran.find((th) => {
				return th.th_ajaran_h == tahun;
			});

			if (!filterTahun) return [];

			const filterTingkat = filterTahun.tingkat.find((tk) => {
				return tk.tingkat_id == tingkat_id;
			});
			return filterTingkat?.kelas || [];
		},

		getAllTingkat() {
			const result = this.thAjaran
				.map((th) => th.tingkat) // map to get all tingkat arrays
				.filter((t) => t) // filter out undefined entries
				.reduce((acc, val) => acc.concat(val), []) // flatten the array
				.filter((v, i, a) => a.findIndex((t) => t.tingkat_id === v.tingkat_id) === i); // filter out duplicates
			return result || [];
		},

		addBulanUjianSetting(payloadBU) {
			payloadBU.forEach((bu) => {
				if (!this.bulanUjianSetting.some((item) => item.id == bu.id)) {
					this.bulanUjianSetting.push(bu);
				}
			});
		},

		getBulanUjianSettingByTingkatId(tingkatId) {
			const filterBU = this.bulanUjianSetting.filter((bu) => {
				return bu.tingkat_id == tingkatId;
			});
			return filterBU || [];
		},

		addBulanUjianList(payloadBU) {
			payloadBU.forEach((bu) => {
				if (
					!this.bulanUjianList.some(
						(item) =>
							item.th_ajaran_h == bu.th_ajaran_h && item.tingkat_id == bu.tingkat_id && item.bu == bu.bu,
					)
				) {
					this.bulanUjianList.push(bu);
				}
			});
		},

		getBulanUjianListByTahunAndTingkatId(tahun, tingkatId) {
			const filterBU = this.bulanUjianList.filter((bu) => {
				return bu.th_ajaran_h == tahun && bu.tingkat_id == tingkatId;
			});
			return filterBU || [];
		},
	},

	persist: {
		storage: sessionStorage,
	},
});
