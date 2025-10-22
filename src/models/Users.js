import ApiCrud from './ApiCrud.js';

class Users extends ApiCrud {
	constructor() {
		super('users');
	}

	async confirm(userId, data) {
		const resData = await this._apiUpdate({
			endPoint: `${this._path}/${userId}/confirm`,
			data,
		});
		this._showSuccess(resData.message);
		return resData.data;
	}

	async setRole(userId, data) {
		const resData = await this._apiUpdate({
			endPoint: `${this._path}/${userId}/roles`,
			data,
		});
		this._showSuccess(resData.message);
		return resData.data;
	}
}
export default new Users();
