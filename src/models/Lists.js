import ApiCrud from './ApiCrud.js';

class Lists extends ApiCrud {
	constructor() {
		super('lists');
	}

	async getByKey(key) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/${key}`,
		});

		return resData.data;
	}
}

export default new Lists();
