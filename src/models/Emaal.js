import ApiCrud from './ApiCrud.js';

class Emaal extends ApiCrud {
	constructor() {
		super('emaal');
	}

	async santri(santriId) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri/${santriId}`,
		});

		return resData.data;
	}

	async setAktif(id, value) {
		const resData = await this._apiUpdate({
			endPoint: `${this._path}/${id}/set-active`,
			data: { aktif: value },
		});

		this._showSuccess(resData.message);
		return resData.data;
	}
}
export default new Emaal();
