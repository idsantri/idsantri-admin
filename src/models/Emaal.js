import ApiCrud from './ApiCrud.js';

class Emaal extends ApiCrud {
	constructor() {
		super('emaal');
	}

	async santri(santriId) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri/${santriId}`,
		});

		return resData.data;
	}
}
export default new Emaal();
