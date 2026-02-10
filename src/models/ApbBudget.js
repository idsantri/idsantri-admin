import ApiCrud from './ApiCrud.js';

class ApbBudget extends ApiCrud {
	constructor() {
		super('apb/budgets');
	}

	async listTahunAjaran() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/th-ajaran-h`,
		});

		return resData.data;
	}
}
export default new ApbBudget();
