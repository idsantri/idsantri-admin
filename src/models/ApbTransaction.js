import ApiCrud from './ApiCrud.js';

class ApbTransaction extends ApiCrud {
	constructor() {
		super('apb/transactions');
	}

	async listTahunAjaran() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/th-ajaran-h`,
		});

		return resData.data;
	}

	async listTahunAjaranAccount(account_id) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/th-ajaran-h`,
			params: { account_id },
		});

		return resData.data;
	}
}
export default new ApbTransaction();
