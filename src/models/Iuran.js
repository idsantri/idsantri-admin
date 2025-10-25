import ApiCrud from './ApiCrud.js';

class Iuran extends ApiCrud {
	constructor() {
		super('iuran');
	}

	async setLunas({ id, data, message }) {
		const isConfirmed = await this._notifyConfirm(
			message || 'Update data ini?',
		);

		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiUpdate({
			endPoint: `${this._path}/${id}/lunas`,
			data,
		});

		this._showSuccess(resData.message);

		return resData.data || true;
	}

	async storePaketSantri({ data, message }) {
		const isConfirmed = await this._notifyConfirm(
			message || 'Simpan data ini?',
		);

		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiPost({
			endPoint: `${this._path}/paket`,
			data,
		});

		this._showSuccess(resData.message);

		return resData.data || true;
	}

	// TODO: other methods
}
export default new Iuran();
