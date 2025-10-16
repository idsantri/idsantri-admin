import ApiCrud from './ApiCrud.js';

class Alamat extends ApiCrud {
	constructor() {
		super('alamat');
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
export default new Alamat();
