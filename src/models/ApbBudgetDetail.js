import ApiCrud from './ApiCrud.js';

class ApbBudgetDetail extends ApiCrud {
	constructor() {
		super('apb/budget-details');
	}
}
export default new ApbBudgetDetail();
