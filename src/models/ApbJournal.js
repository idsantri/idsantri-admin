import ApiCrud from './ApiCrud.js';

class ApbJournal extends ApiCrud {
	constructor() {
		super('apb/journals');
	}

	async saveBatch(transactionId, journals) {
		const resData = await this._apiPost({
			endPoint: `${this._path}/transactions/${transactionId}`,
			data: { journals },
		});
		this._showSuccess(resData.message);
		return resData.data;
	}
}
export default new ApbJournal();
