import ApiCrud from './ApiCrud.js';

class Alamat extends ApiCrud {
	constructor(endpoint = '') {
		super('alamat');
		this._path = endpoint ? `${this._path}/${endpoint}` : this._path;
	}

	async searchByParams(params = {}) {
		return this.getAll({ params, notifySuccess: false });
	}

	async searchKabKota(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/kabupaten-kota`,
			params,
		});

		return resData.data;
	}
}

// TODO: Uncomment and implement if needed in the future
// const alamat = new Alamat();
// alamat.provinsi = new Alamat('provinsi');
// alamat.kabupaten = new Alamat('kabupaten');
// alamat.kecamatan = new Alamat('kecamatan');
// alamat.desa = new Alamat('desa');

export default new Alamat();
