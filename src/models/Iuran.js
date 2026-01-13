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

		return resData.data || true;
	}

	async bySantri(santriId) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri/${santriId}`,
		});

		return resData.data;
	}

	async bySantriByThAjaran(id, th_ajaran_h) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri/${id}`,
			params: { th_ajaran_h },
		});

		return resData.data;
	}

	async vaGroup() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/va-group`,
		});

		return resData.data;
	}
}
export default new Iuran();
