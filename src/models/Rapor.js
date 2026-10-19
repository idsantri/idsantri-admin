import ApiCrud from './ApiCrud.js';

class Rapor extends ApiCrud {
	constructor() {
		super('rapor');
	}

	getById() {
		throw new Error('Method not implemented.');
	}

	update() {
		throw new Error('Method not implemented.');
	}
}
export default new Rapor();
