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
	// TODO: other methods
}
export default new Kelas();
