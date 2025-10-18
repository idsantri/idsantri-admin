import ApiCrud from './ApiCrud.js';

class Lists extends ApiCrud {
	constructor() {
		super('lists');
	}

	async getByKey(key) {
		try {
			const { data } = await this._api.get(`${this._path}/${key}`);
			return data || true;
		} catch (error) {
			return this._handleError(error);
		}
	}
}

export default new Lists();
