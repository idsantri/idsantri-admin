import ApiCrud from './ApiCrud.js';

class ApbGroup extends ApiCrud {
	constructor() {
		super('apb/group-accounts');
	}
}
export default new ApbGroup();
