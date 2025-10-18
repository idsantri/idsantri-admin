import ApiCrud from './ApiCrud.js';

class Santri extends ApiCrud {
	constructor() {
		super('santri');
	}
	async search() {
		throw new Error('Use datatables.net method instead of this');
	}

	async getIds({ _params = {} }) {
		throw new Error('not implemented yet');
		// try {
		// 	const { data } = await this._api.get(`${this._path}/ids`, {
		// 		params,
		// 	});

		// 	return data;
		// } catch (error) {
		// 	return this._handleError(error);
		// }
	}

	async #getParents(santriId, parent, notifySuccess = true) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/${santriId}/${parent}`,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data;
	}

	async getOrtu({ santriId, notifySuccess = true }) {
		return this.#getParents(santriId, 'ortu', notifySuccess);
	}

	async getWali({ santriId, notifySuccess = true }) {
		return this.#getParents(santriId, 'wali', notifySuccess);
	}
}
export default new Santri();
