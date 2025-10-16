import ApiCrud from './ApiCrud.js';

class AbsensiMusyawarah extends ApiCrud {
	constructor() {
		super('absensi/musyawarah');
	}

	update() {
		throw new Error('Method not implemented.');
	}
	getById() {
		throw new Error('Method not implemented.');
	}

	async getRekapUjian(params = {}) {
		try {
			const { data } = await this.api.get(`${this.path}/rekap-ujian`, {
				params: { ...params },
			});
			return data || true;
		} catch (error) {
			return this.handleError(error);
		}
	}

	async getNotNull(params = {}) {
		try {
			const { data } = await this.api.get(`${this.path}/not-null`, {
				params: { ...params },
			});
			return data || true;
		} catch (error) {
			return this.handleError(error);
		}
	}

	async getListBulanUjian({ params = {} }) {
		try {
			const { data } = await this.api.get(
				`${this.path}/lists/bulan-ujian`,
				{
					params: { ...params },
				},
			);
			return data || true;
		} catch (error) {
			return this.handleError(error);
		}
	}
}
export default new AbsensiMusyawarah();
