import ApiCrud from './ApiCrud.js';

class ApbBudgetConfig extends ApiCrud {
	constructor() {
		super('apb/budget-configs');
	}

	async listTahunAjaran() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/th-ajaran-h`,
		});

		return resData.data;
	}

	// async getByThAndGroup(th_ajaran_h, group) {
	// 	const resData = await this._apiGet({
	// 		endPoint: `${this._path}/q/${th_ajaran_h}/${group}`,
	// 	});

	// 	return resData.data;
	// }
}
export default new ApbBudgetConfig();
