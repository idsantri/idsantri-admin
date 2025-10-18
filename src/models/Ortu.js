import ApiCrud from './ApiCrud.js';

class Ortu extends ApiCrud {
	constructor() {
		super('ortu');
	}
	async search() {
		throw new Error('Use datatables.net method instead of this');
	}

	async getSantri({ ortuId, notifySuccess = true }) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/${ortuId}/santri`,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data;
	}
}
export default new Ortu();
