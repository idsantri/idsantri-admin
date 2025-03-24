import { defineStore } from 'pinia';

interface Desa {
	id: string;
	desa: string;
}

interface Kecamatan {
	id: string;
	kecamatan: string;
	desa?: Desa[];
}

interface Kabupaten {
	id: string;
	kabupaten: string;
	kecamatan?: Kecamatan[];
}

interface Provinsi {
	id: string;
	provinsi: string;
	kabupaten?: Kabupaten[];
}

interface DataProvinsi {
	provinsi_id?: string;
	provinsi_name?: string;
}

interface DataKabupaten extends DataProvinsi {
	kabupaten_id?: string;
	kabupaten_name?: string;
}
interface DataKecamatan extends DataKabupaten {
	kecamatan_id?: string;
	kecamatan_name?: string;
}

interface AlamatState {
	provinsi: Provinsi[];
}

// const alamat = {
// 	provinsi: [
// 		{
// 			id: '11',
// 			provinsi: 'Bali',
// 			kabupaten:[
// 				{
// 					id:'1122',
// 					kabupaten:'Denpasar',
// 					kecamatan:[
// 						{
// 							id:'112233',
// 							kecamatan:'Balebale',
// 							desa:[
// 								{
// 									id:'1122330000',
// 									desa:'Angsokah'
// 								}
// 							]

// 						}
// 					]
// 				}
// 			]
// 		},
// 	],
// };

export default defineStore('alamat', {
	state: (): AlamatState => {
		return {
			provinsi: [],
		};
	},

	getters: {},

	actions: {
		_findProvinsi(alamat: DataProvinsi): Provinsi | undefined {
			const { provinsi_id, provinsi_name } = alamat;
			if (provinsi_id) {
				return this.provinsi.find((obj) => obj?.id == provinsi_id);
			} else if (provinsi_name) {
				return this.provinsi.find(
					(obj) =>
						obj?.provinsi.toLowerCase() ===
						provinsi_name.toLowerCase(),
				);
			} else {
				// throw new Error('Find Provinsi: Parameter tidak sesuai!');
				console.error('Find Provinsi: Parameter tidak sesuai!');
				return;
			}
		},

		_findKabupaten(alamat: DataKabupaten): Kabupaten | undefined {
			const { kabupaten_id, kabupaten_name } = alamat;
			const prov = this._findProvinsi(alamat);

			if (!prov || !prov.kabupaten?.length) {
				// throw new Error('Find Kabupaten: Provinsi 0 or Kabupaten 0!');
				console.error('Find Kabupaten: Provinsi 0 or Kabupaten 0!');
				return;
			}

			if (kabupaten_id) {
				return prov.kabupaten.find((obj) => obj?.id == kabupaten_id);
			}
			if (kabupaten_name) {
				return prov.kabupaten.find(
					(obj) =>
						obj.kabupaten.toLowerCase() ===
						kabupaten_name.toLowerCase(),
				);
			}

			throw new Error('Find Kabupaten: Parameter tidak sesuai!');
		},

		_findKecamatan(alamat: DataKecamatan): Kecamatan | undefined {
			const { kecamatan_id, kecamatan_name } = alamat;
			const kab = this._findKabupaten(alamat);

			if (!kab || !kab.kecamatan?.length) {
				console.error(
					'Find Kecamatan: Provinsi 0 or Kabupaten 0 or Kecamatan 0!',
				);
				return;
				// throw new Error(
				// 	'Find Kecamatan: Provinsi 0 or Kabupaten 0 or Kecamatan 0!',
				// );
			}

			if (kecamatan_id) {
				return kab.kecamatan.find((obj) => obj?.id == kecamatan_id);
			}
			if (kecamatan_name) {
				return kab.kecamatan.find(
					(obj) =>
						obj.kecamatan.toLowerCase() ===
						kecamatan_name.toLowerCase(),
				);
			}

			throw new Error('Find Kecamatan: Parameter tidak sesuai!');
		},

		setProvinsi(arrProvinsi: Provinsi[]): void {
			this.provinsi = [];
			this.provinsi = arrProvinsi;
		},

		setKabupaten(
			arrKabupaten: Kabupaten[],
			dataProvinsi: DataProvinsi,
		): void {
			const pro = this._findProvinsi(dataProvinsi);
			if (pro) {
				pro.kabupaten = arrKabupaten;
			}
		},

		setKecamatan(
			arrKecamatan: Kecamatan[],
			dataKabupaten: DataKabupaten,
		): void {
			const kab = this._findKabupaten(dataKabupaten);
			if (kab) {
				kab.kecamatan = arrKecamatan;
			}
		},

		setDesa(arrDesa: Desa[], DataKecamatan: DataKecamatan): void {
			const kec = this._findKecamatan(DataKecamatan);
			if (kec) {
				kec.desa = arrDesa;
			}
		},

		getProvinsi(): Provinsi[] | undefined {
			return this.provinsi;
		},

		getKabupaten(dataProvinsi: DataProvinsi): Kabupaten[] | undefined {
			const pro = this._findProvinsi(dataProvinsi);
			return pro?.kabupaten;
		},

		getKecamatan(dataKabupaten: DataKabupaten): Kecamatan[] | undefined {
			const kab = this._findKabupaten(dataKabupaten);
			return kab?.kecamatan;
		},

		getDesa(dataKecamatan: DataKecamatan): Desa[] | undefined {
			const kec = this._findKecamatan(dataKecamatan);
			return kec?.desa;
		},
	},

	persist: {
		storage: localStorage,
	},
});
