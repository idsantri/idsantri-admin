import ApiCrud from './ApiCrud.js';

class UgtPjgt extends ApiCrud {
	constructor() {
		super('ugt/pjgt');
	}
	async listWilayah({ notifySuccess = true }) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/wilayah`,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data;
	}
	async listJenisLembaga({ notifySuccess = true }) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/jenis-lembaga`,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data;
	}
}
export default new UgtPjgt();
