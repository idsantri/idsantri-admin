import ApiCrud from './ApiCrud.js';

class Iuran extends ApiCrud {
	constructor() {
		super('iuran');
	}

	async setLunas({ id, data, message }) {
		const isConfirmed = await this._notifyConfirm(message || 'Update data ini?');

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

	async setNotLunas(iuranId, message) {
		const isConfirmed = await this._notifyConfirm(message || 'Update data ini?');

		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiUpdate({
			endPoint: `${this._path}/${iuranId}/not-lunas`,
		});

		return resData.data || true;
	}

	async toggleCetak(iuranId) {
		const resData = await this._apiUpdate({
			endPoint: `${this._path}/${iuranId}/cetak`,
		});

		return resData.data || true;
	}

	async storePaketSantri({ data, message }) {
		const isConfirmed = await this._notifyConfirm(message || 'Simpan data ini?');

		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiPost({
			endPoint: `${this._path}/paket`,
			data,
		});

		this._showSuccess(resData.message);
		if (resData.data?.warning_message) {
			this._showWarning(resData.data.warning_message);
		}

		return resData.data || true;
	}

	async storePaketMassal({ data, message }) {
		const isConfirmed = await this._notifyConfirm(message || 'Simpan data ini?');

		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiPost({
			endPoint: `${this._path}/paket-massal`,
			data,
		});

		this._showSuccess(resData.message);
		if (resData.data?.warning_message) {
			this._showWarning(resData.data.warning_message);
		}

		return resData.data || true;
	}

	async summary(santri_id) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/summary`,
			params: { santri_id },
		});

		return resData.data;
	}

	async inGroup() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/list/in-group`,
		});

		return resData.data;
	}
}
export default new Iuran();
