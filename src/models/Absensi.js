import ApiCrud from './ApiCrud.js';

class AbsensiMaster extends ApiCrud {
	constructor(model) {
		super('absensi');
		this._path = `${this._path}/${model}`;
	}

	update() {
		throw new Error('Method not implemented.');
	}
	getById() {
		throw new Error('Method not implemented.');
	}

	remove() {
		throw new Error('Method not implemented.');
	}

	async removeAbsensi(params = {}) {
		const isConfirmed = await this._notifyConfirm(
			'<span style="color:red">Hapus data absensi untuk kelas ini?</span>',
		);
		if (!isConfirmed) {
			return false;
		}

		const resData = await this._apiDelete({
			endPoint: `${this._path}`,
			params,
		});

		this._showSuccess(resData.message);

		return resData.data || true;
	}

	async getRekapUjian(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/rekap-ujian`,
			params,
		});

		return resData.data;
	}

	async getNotNull(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/not-null`,
			params,
		});

		return resData.data;
	}

	async getListBulanUjian(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/lists/bulan-ujian`,
			params,
		});

		return resData.data;
	}
}

class Absensi {
	Sekolah = new AbsensiMaster('sekolah');
	Musyawarah = new AbsensiMaster('musyawarah');

	async getListBulanUjian(model, params = {}) {
		if (model === 'sekolah') {
			return await this.Sekolah.getListBulanUjian(params);
		} else if (model === 'musyawarah') {
			return await this.Musyawarah.getListBulanUjian(params);
		}
		throw new Error('Model tidak dikenali');
	}
}

export default new Absensi();
