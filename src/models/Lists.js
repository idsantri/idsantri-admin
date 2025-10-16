import ApiCrud from './ApiCrud.js';

class Lists extends ApiCrud {
	constructor() {
		super('lists');
	}

	async getByKey(key) {
		try {
			const { data } = await this.api.get(`${this.path}/${key}`);
			return data || true;
		} catch (error) {
			return this.handleError(error);
		}
	}
}

export default new Lists();
