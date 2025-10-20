import ApiCrud from './ApiCrud.js';

class Status extends ApiCrud {
	constructor() {
		super('status');
	}

	/**
	 * Fetch a santri by id
	 * @param {number} santriId - id of santri
	 * @returns {Promise<object>} - santri object
	 * @throws {Error} Not implemented yet
	 */
	async santri(santriId) {
		const _resData = await this._apiGet({
			endPoint: `${this._path}/santri/${santriId}`,
		});
		throw new Error('not implemented yet');

		// return resData.data;
	}

	/**
	 * Fetch lists of status
	 * @returns {Promise<object[]>}
	 * @throws {Error} Not implemented yet
	 */
	async lists() {
		const _resData = await this._apiGet({
			endPoint: `${this._path}/lists`,
		});
		throw new Error('not implemented yet');

		// return resData.data;
	}
}
export default new Status();
