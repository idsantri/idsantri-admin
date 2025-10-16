import ApiCrud from './ApiCrud.js';

class Santri extends ApiCrud {
	constructor() {
		super('santri');
	}
	async getSearch() {
		throw new Error('Use datatables.net method instead of this');
	}
	async getIds(params = {}, notifySuccess = true) {
		try {
			const { data } = await this._api.get(`${this._path}/ids`, {
				params,
			});

			if (notifySuccess) {
				this._showSuccess(data.message);
			}

			return data;
		} catch (error) {
			return this._handleError(error);
		}
	}

	async #getParents(santriId, parent, notifySuccess = true) {
		try {
			const { data } = await this._api.get(
				`${this._path}/${santriId}/${parent}`,
			);

			if (notifySuccess) {
				this._showSuccess(data.message);
			}

			return data;
		} catch (error) {
			return this._handleError(error);
		}
	}

	async getOrtu(santriId, notifySuccess = true) {
		return this.#getParents(santriId, 'ortu', notifySuccess);
	}

	async getWali(santriId, notifySuccess = true) {
		return this.#getParents(santriId, 'wali', notifySuccess);
	}
}
export default new Santri();
