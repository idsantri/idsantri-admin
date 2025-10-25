import Api from './Api.js';

class User extends Api {
	constructor() {
		super('user');
	}

	async get() {
		const resData = await this._apiGet({
			endPoint: this._path,
		});

		return resData.data;
	}

	async update(data, confirm = false) {
		if (confirm) {
			const isConfirmed = await this._notifyConfirm(
				'Update profil Anda?',
			);
			if (!isConfirmed) {
				return false;
			}
		}

		const resData = await this._apiUpdate({
			endPoint: `${this._path}`,
			data,
		});

		this._showSuccess(resData.message);

		return resData.data;
	}
}

export default new User();
