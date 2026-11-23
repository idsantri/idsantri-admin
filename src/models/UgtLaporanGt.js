import ApiCrud from './ApiCrud.js';

class UgtLaporanGt extends ApiCrud {
	constructor() {
		super('ugt/laporan-gt');
	}

	async getAllByGt(gt_id) {
		return this.getAll({ params: { gt_id } });
	}

	async getAllByConfig(config_id) {
		return this.getAll({ params: { config_id } });
	}
}
export default new UgtLaporanGt();
