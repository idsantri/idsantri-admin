import ApiCrud from './ApiCrud.js';

class PulanganSantri extends ApiCrud {
	constructor() {
		super('pulangan/santri');
	}
}
export default new PulanganSantri();
