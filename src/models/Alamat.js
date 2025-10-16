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
			const { data } = await this.api.get(`${this.path}/kabupaten-kota`, {
				params: { ...params },
			});
			return data || true;
		} catch (error) {
			return this.handleError(error);
		}
	}
}
export default new Alamat();
