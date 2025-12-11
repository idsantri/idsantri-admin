import { notifyWarning } from 'src/utils/notify';
import Api from './Api';

class DownloadUrl extends Api {
	constructor() {
		super('export');
	}

	#handleDownload(data) {
		if (!data?.url) return notifyWarning('Url tidak ditemukan');

		const link = document.createElement('a');
		link.href = data.url;
		link.click();
		link.remove();
	}

	async iuranVA(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/iuran-va`,
			params,
		});
		// return resData.data;
		return this.#handleDownload(resData.data);
	}

	async santri(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/santri`,
			params,
		});
		// return resData.data;
		return this.#handleDownload(resData.data);
	}

	async mutaallim(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/mutaallim`,
			params,
		});
		// return resData.data;
		return this.#handleDownload(resData.data);
	}

	async nilaiMapel(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/nilai-mapel`,
			params,
		});
		// return resData.data;
		return this.#handleDownload(resData.data);
	}

	async kelas(params = {}) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/kelas`,
			params,
		});
		// return resData.data;
		return this.#handleDownload(resData.data);
	}
}

export default new DownloadUrl();
