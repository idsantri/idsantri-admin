import Api from './Api.js';
import ApiCrud from './ApiCrud.js';

class Alamat extends Api {
	constructor() {
		super('alamat');
	}

	async searchByParams(params = {}) {
		const resData = await this._apiGet({
			endPoint: this._path,
			params,
		});

		return resData.data;
	}

	async searchKabKota(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/kabupaten-kota`,
			params,
		});

		return resData.data;
	}

	Provinsi = new AlamatRegional('provinsi');
	Kabupaten = new AlamatRegional('kabupaten');
	Kecamatan = new AlamatRegional('kecamatan');
	Desa = new AlamatRegional('desa');
}

class AlamatRegional extends ApiCrud {
	constructor(region) {
		super('alamat');
		this._path = `${this._path}/${region}`;
	}
}
export default new Alamat();
