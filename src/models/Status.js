import ApiCrud from './ApiCrud.js';

class Status extends ApiCrud {
	constructor() {
		super('status');
	}

	async santri(santriId) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri/${santriId}`,
		});

		return resData.data;
	}

	async lists() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists`,
		});

		return resData.data;
	}
}
export default new Status();
