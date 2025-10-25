import ApiCrud from './ApiCrud.js';

class Wali extends ApiCrud {
	constructor() {
		super('wali');
	}
	async search() {
		throw new Error('Use datatables.net method instead of this');
	}

	async getSantri({ waliId, notifySuccess = true }) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/${waliId}/santri`,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data;
	}
}
export default new Wali();
