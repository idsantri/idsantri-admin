import ApiCrud from './ApiCrud.js';

class IuranPayment extends ApiCrud {
	constructor() {
		super('iuran-payments');
	}
}
export default new IuranPayment();
