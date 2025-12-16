import ApiCrud from './ApiCrud.js';

class ApbBudget extends ApiCrud {
	constructor() {
		super('apb/budgets');
	}
}
export default new ApbBudget();
