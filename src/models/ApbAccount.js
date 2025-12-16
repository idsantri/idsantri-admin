import ApiCrud from './ApiCrud.js';

class ApbAccount extends ApiCrud {
	constructor() {
		super('apb/accounts');
	}

	async toggleHidden(id) {
		const resData = await this._apiUpdate({
			endPoint: `${this._path}/${id}/toggle-hide`,
		});

		return resData.data;
	}

	async listGroup() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/groups`,
		});

		return resData.data;
	}
}
export default new ApbAccount();
