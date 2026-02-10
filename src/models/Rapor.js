import ApiCrud from './ApiCrud.js';

class Rapor extends ApiCrud {
	constructor() {
		super('rapor');
	}

	getById() {
		throw new Error('Method not implemented.');
	}

	update() {
		throw new Error('Method not implemented.');
	}

	async setting() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/setting`,
		});

		return resData.data;
	}
}
export default new Rapor();
