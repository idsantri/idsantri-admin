import Api from './Api';

class Image extends Api {
	constructor() {
		super('images');
	}

	async get(source, id) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/${source}/${id}`,
		});
		return resData.data;
	}

	async create(source, id, formData) {
		const resData = await this._apiPost({
			endPoint: `${this._path}/${source}/${id}`,
			data: formData,
		});
		return resData.data;
	}

	async remove(source, id) {
		const resData = await this._apiDelete({
			endPoint: `${this._path}/${source}/${id}`,
		});
		return resData.data;
	}
}

export default new Image();
