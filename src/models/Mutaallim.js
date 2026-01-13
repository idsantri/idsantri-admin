import ApiCrud from './ApiCrud.js';

class Mutaallim extends ApiCrud {
	constructor() {
		super('mutaallim');
	}

	async getSantri() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri`,
		});

		return resData.data;
	}

	async getSantriId(santriId) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri/${santriId}`,
		});

		return resData.data;
	}

	async aktif() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/aktif`,
		});

		return resData.data;
	}
}
export default new Mutaallim();
