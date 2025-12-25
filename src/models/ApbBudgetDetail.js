import ApiCrud from './ApiCrud.js';

class ApbBudget extends ApiCrud {
	constructor() {
		super('apb/budget-details');
	}
}
export default new ApbBudget();
