import ApiCrud from './ApiCrud.js';

class UgtLaporanConfig extends ApiCrud {
	constructor() {
		super('ugt/laporan-config');
	}
}
export default new UgtLaporanConfig();
