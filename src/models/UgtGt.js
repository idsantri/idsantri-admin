import ApiCrud from './ApiCrud.js';

class UgtGt extends ApiCrud {
	constructor() {
		super('ugt/gt');
	}
	async listTahunAjaran({ notifySuccess = true }) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/th-ajaran-h`,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data;
	}
}
export default new UgtGt();
