import ApiCrud from './ApiCrud.js';

class Indisipliner extends ApiCrud {
	constructor() {
		super('indisipliner');
	}

	async listThAjaran() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/th-ajaran-h`,
		});
		return resData.data || true;
	}
}
export default new Indisipliner();
