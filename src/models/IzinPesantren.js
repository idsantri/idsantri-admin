import ApiCrud from './ApiCrud.js';

class IzinPesantren extends ApiCrud {
	constructor() {
		super('izin-pesantren');
	}
	async setKembali({ id, data, message }) {
		const isConfirmed = await this._notifyConfirm(message || 'Update data ini?');

		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiUpdate({
			endPoint: `${this._path}/${id}/set-kembali`,
			data,
		});

		this._showSuccess(resData.message);

		return resData.data || true;
	}

	async listThAjaran() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/th-ajaran-h`,
		});
		return resData.data || true;
	}
}
export default new IzinPesantren();
