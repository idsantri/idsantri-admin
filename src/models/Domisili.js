import ApiCrud from './ApiCrud.js';

class Domisili extends ApiCrud {
	constructor() {
		super('domisili');
	}

	async santri(santriId) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri/${santriId}`,
		});

		return resData.data;
	}
}
export default new Domisili();
