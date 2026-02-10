import ApiCrud from './ApiCrud.js';

class AbsensiSetting extends ApiCrud {
	constructor() {
		super('absensi/settings');
	}
}
export default new AbsensiSetting();
