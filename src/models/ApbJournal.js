import ApiCrud from './ApiCrud.js';

class ApbJournal extends ApiCrud {
	constructor() {
		super('apb/journals');
	}
}
export default new ApbJournal();
