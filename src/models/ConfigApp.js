import Api from './Api';

class ConfigApp extends Api {
	constructor() {
		super('config');
	}

	async getVA() {
		const resData = await this._apiGet({
			endPoint: `${this._path}/va`,
		});
		return resData.data;
	}

	async setVA(data) {
		const resData = await this._apiPost({
			endPoint: `${this._path}/va`,
			data,
		});

		this._showSuccess(resData.message);
		return resData.data;
	}

	async getReport(end_point = null) {
		const subPath = end_point && end_point.trim() ? `/${end_point.trim()}` : '';
		const resData = await this._apiGet({
			endPoint: `${this._path}/reports${subPath}`,
		});
		return resData.data;
	}

	async setReport(data, end_point = null) {
		const subPath = end_point && end_point.trim() ? `/${end_point.trim()}` : '';
		const resData = await this._apiPost({
			endPoint: `${this._path}/reports${subPath}`,
			data,
		});

		this._showSuccess(resData.message);
		return resData.data;
	}

	async getProfile(end_point = null) {
		const subPath = end_point && end_point.trim() ? `/${end_point.trim()}` : '';
		const resData = await this._apiGet({
			endPoint: `${this._path}/profiles${subPath}`,
		});
		return resData.data;
	}

	async setProfile(data, end_point = null) {
		const subPath = end_point && end_point.trim() ? `/${end_point.trim()}` : '';
		const resData = await this._apiPost({
			endPoint: `${this._path}/profiles${subPath}`,
			data,
		});

		this._showSuccess(resData.message);
		return resData.data;
	}

	async getAppWali(end_point = null) {
		const subPath = end_point && end_point.trim() ? `/${end_point.trim()}` : '';
		const resData = await this._apiGet({
			endPoint: `${this._path}/app-wali${subPath}`,
		});
		return resData.data;
	}

	async setAppWali(data, end_point = null) {
		const subPath = end_point && end_point.trim() ? `/${end_point.trim()}` : '';
		const resData = await this._apiPost({
			endPoint: `${this._path}/app-wali${subPath}`,
			data,
		});

		this._showSuccess(resData.message);
		return resData.data;
	}
}

export default new ConfigApp();
