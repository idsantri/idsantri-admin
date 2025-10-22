import ApiCrud from './ApiCrud.js';

class UgtGt extends ApiCrud {
	constructor() {
		super('ugt/gt');
	}
	async listTahunAjaran() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/th-ajaran-h`,
		});

		return resData.data;
	}
}
export default new UgtGt();
