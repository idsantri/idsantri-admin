import ApiCrud from './ApiCrud.js';

class UgtPjgt extends ApiCrud {
	constructor() {
		super('ugt/pjgt');
	}

	async listWilayah() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/wilayah`,
		});

		return resData.data;
	}

	async listJenisLembaga() {
		throw new Error('Method not implemented yet.');
		// const resData = await this._apiGet({
		// 	endPoint: `${this._path}/lists/jenis-lembaga`,
		// });

		// return resData.data;
	}
}
export default new UgtPjgt();
