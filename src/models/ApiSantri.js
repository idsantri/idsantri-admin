import ApiCrud from './ApiCrud.js';

class ApiSantri extends ApiCrud {
	constructor() {
		super('santri');
	}
}
export default new ApiSantri();
