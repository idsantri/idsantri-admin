import ApiCrud from './ApiCrud.js';

class Kelas extends ApiCrud {
	constructor() {
		super('kelas');
	}

	async santri(santriId) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri/${santriId}`,
		});

		return resData.data;
	}

	async updateNoAbsen(data) {
		const isConfirmed = await this._notifyConfirm('Update nomor absen?');

		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiUpdate({
			endPoint: `${this._path}/no-absen`,
			data,
		});

		this._showSuccess(resData.message);

		return resData.data || true;
	}
}
export default new Kelas();
