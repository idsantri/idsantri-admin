import Api from './Api';

class Image extends Api {
	constructor() {
		super('images');
	}

	async santri(id) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri/${id}`,
		});
		return resData.data;
	}

	async user(id) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/users/${id}`,
		});
		return resData.data;
	}

	async aparatur(id) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/aparatur/${id}`,
		});
		return resData.data;
	}
}

export default new Image();
