import Api from './Api';

class DownloadFile extends Api {
	constructor() {
		super('reports');
	}

	#handleDownload(data, fileName = 'file.pdf') {
		const blob = new Blob([data], { type: 'application/pdf' });
		const href = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = href;
		link.setAttribute('download', fileName);
		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
		URL.revokeObjectURL(href);
	}

	async santriRegistrasi(id, fileName) {
		const response = await this._apiGetBlob({
			endPoint: `${this._path}/santri/registrasi/download`,
			params: { id },
		});

		return this.#handleDownload(response.data, fileName);
	}

	async santriStandbook(id, fileName) {
		const response = await this._apiGetBlob({
			endPoint: `${this._path}/santri/standbook/download`,
			params: { id },
		});

		return this.#handleDownload(response.data, fileName);
	}

	async santriKeteranganBerhenti(id, fileName) {
		const response = await this._apiGetBlob({
			endPoint: `${this._path}/santri/keterangan-berhenti/download`,
			params: { id },
		});

		return this.#handleDownload(response.data, fileName);
	}

	async santriIdCard(id, fileName) {
		const response = await this._apiGetBlob({
			endPoint: `${this._path}/santri/id-card/download`,
			params: { id },
		});

		return this.#handleDownload(response.data, fileName);
	}

	async iuranCover(params, fileName) {
		const response = await this._apiGetBlob({
			endPoint: `${this._path}/iuran-cover/download`,
			params,
		});

		return this.#handleDownload(response.data, fileName);
	}

	async iuranKuitansi(params, fileName) {
		const response = await this._apiGetBlob({
			endPoint: `${this._path}/iuran-kuitansi/download`,
			params,
		});

		return this.#handleDownload(response.data, fileName);
	}

	async iuranCard(params, fileName) {
		const response = await this._apiGetBlob({
			endPoint: `${this._path}/iuran-card/download`,
			params,
		});

		return this.#handleDownload(response.data, fileName);
	}

	async GtSuratTugas(id, fileName) {
		const response = await this._apiGetBlob({
			endPoint: `${this._path}/ugt/surat-tugas/download`,
			params: { id },
		});

		return this.#handleDownload(response.data, fileName);
	}

	async GtSertifikat(id, fileName) {
		const response = await this._apiGetBlob({
			endPoint: `${this._path}/ugt/sertifikat/download`,
			params: { id },
		});

		return this.#handleDownload(response.data, fileName);
	}
}

export default new DownloadFile();
