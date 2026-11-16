import ApiCrud from './ApiCrud.js';

class UgtKas extends ApiCrud {
	constructor() {
		super('ugt/config-laporan');
	}
}
export default new UgtKas();
