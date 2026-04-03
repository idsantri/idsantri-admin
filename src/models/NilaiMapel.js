import ApiCrud from './ApiCrud.js';

class NilaiMapel extends ApiCrud {
	constructor() {
		super('nilai-mapel');
	}

	async rerata(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/rerata`,
			params,
		});

		return resData.data;
	}

	async pivotByKelas(kelasId, category) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/kelas/${kelasId}`,
			params: {
				category,
			},
		});

		return resData.data;
	}
}
export default new NilaiMapel();
