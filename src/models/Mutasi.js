import ApiCrud from './ApiCrud.js';

class Mutasi extends ApiCrud {
	constructor() {
		super('mutasi');
	}

	async getNotMutate(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/not`,
			params,
		});

		this._showSuccess(resData.message);
		return resData.data;
	}

	async removeAll() {
		const isConfirmed = await this._notifyConfirm('<span style="color: red">Hapus semua data mutasi??</span>');

		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiDelete({
			endPoint: `${this._path}/clean`,
		});

		this._showSuccess(resData.message);

		return resData.data || true;
	}

	async execute(message = '') {
		const isConfirmed = await this._notifyConfirm(message || 'Proses data mutasi?');
		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiPost({
			endPoint: `${this._path}/execute`,
			data: null,
		});

		this._showSuccess(resData.message);

		return resData.data || true;
	}
}
export default new Mutasi();
