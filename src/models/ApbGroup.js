import ApiCrud from './ApiCrud.js';

class ApbGroup extends ApiCrud {
	constructor() {
		super('apb/account-groups');
	}
}
export default new ApbGroup();
