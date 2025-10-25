import ApiCrud from './ApiCrud.js';

class IzinMadrasah extends ApiCrud {
	constructor() {
		super('izin-madrasah');
	}

	async riwayat(kelasId) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/kelas/${kelasId}`,
		});

		this._showSuccess(resData.message);

		return resData.data;
	}
}
export default new IzinMadrasah();
