import ApiCrud from './ApiCrud.js';

class Domisili extends ApiCrud {
	constructor() {
		super('domisili');
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
}
export default new Domisili();
