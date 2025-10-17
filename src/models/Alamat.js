import ApiCrud from './ApiCrud.js';

class Alamat extends ApiCrud {
	constructor(endpoint = '') {
		super('alamat');
		this._path = endpoint ? `${this._path}/${endpoint}` : this._path;
	}

	async searchByParams(params = {}) {
		return this.getAll(params, false);
	}

	async searchKabKota(params) {
		try {
			const { data } = await this._api.get(
				`${this._path}/kabupaten-kota`,
				{
					params: { ...params },
				},
			);
			return data || true;
		} catch (error) {
			return this._handleError(error);
		}
	}
}

// TODO: Uncomment and implement if needed in the future
// const alamat = new Alamat();
// alamat.provinsi = new Alamat('provinsi');
// alamat.kabupaten = new Alamat('kabupaten');
// alamat.kecamatan = new Alamat('kecamatan');
// alamat.desa = new Alamat('desa');

export default new Alamat();
