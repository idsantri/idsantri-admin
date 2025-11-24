import Api from './Api.js';

class Statistik extends Api {
	constructor() {
		super('statistik');
	}

	async domisili() {
		const resData = await this._apiGet({
			endPoint: this._path + '/domisili',
		});

		return resData.data;
	}

	async indisipliner(thAjaranH) {
		const resData = await this._apiGet({
			endPoint: this._path + '/indisipliner/' + thAjaranH,
		});

		return resData.data;
	}

	async izinPesantren(thAjaranH) {
		const resData = await this._apiGet({
			endPoint: this._path + '/izin-pesantren/' + thAjaranH,
		});

		return resData.data;
	}
}

export default new Statistik();
