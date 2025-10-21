import ApiCrud from './ApiCrud.js';

class UgtKas extends ApiCrud {
	constructor() {
		super('ugt/kas');
	}
}
export default new UgtKas();
