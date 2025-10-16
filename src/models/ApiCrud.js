import { notifySuccess } from 'src/utils/notify.js';
import apiError from 'src/api/api-error.ts';
import api from 'src/api';

export default class ApiCrud {
	constructor(path) {
		this.path = path;
		this.api = api;
	}

	/**
	 * Fetch all data from API with given parameters.
	 *
	 * @param {Object} [params] - Parameters to be passed to the API.
	 * @param {boolean} [notifySuccess=true] - Whether to notify success message.
	 * @returns {Promise<Object | boolean>} - Response data or false if error occur.
	 * @example
	 * const api = new ApiCrud('api/users');
	 * const response = await api.getAll({ role: 'admin' });
	 * console.log(response); // { data: [...], message: '...' }
	 */

	handleError(error) {
		apiError(error);
		return false;
	}

	async getAll(params = {}, notifySuccess = true) {
		try {
			const { data } = await this.api.get(this.path, {
				params: { ...params },
			});
			if (notifySuccess) {
				notifySuccess(data.message);
			}
			return data || true;
		} catch (error) {
			return this.handleError(error);
		}
	}

	async getById(id, params = {}) {
		try {
			const { data } = await this.api.get(`${this.path}/${id}`, {
				params: { ...params },
			});
			notifySuccess(data.message);
			return data || true;
		} catch (error) {
			return this.handleError(error);
		}
	}

	async create(data) {
		try {
			const { data: resData } = await this.api.post(this.path, data);
			notifySuccess(resData.message);
			return resData || true;
		} catch (error) {
			return this.handleError(error);
		}
	}

	async update(id, data) {
		try {
			const { data: resData } = await this.api.put(
				`${this.path}/${id}`,
				data,
			);
			notifySuccess(resData.message);
			return resData || true;
		} catch (error) {
			return this.handleError(error);
		}
	}

	async remove(id, params = {}) {
		try {
			const { data } = await this.api.delete(`${this.path}/${id}`, {
				params: { ...params },
			});
			notifySuccess(data.message);
			return data || true;
		} catch (error) {
			return this.handleError(error);
		}
	}
}
