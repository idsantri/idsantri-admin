import ApiCrud from './ApiCrud.js';

class Pulangan extends ApiCrud {
	constructor() {
		super('pulangan/config');
	}
}
export default new Pulangan();
