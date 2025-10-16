import Api from './Api';

export default class ApiCrud extends Api {
	/**
	 * Get all records with optional query parameters
	 * @param {Object} params - Query parameters for filtering/pagination
	 * @param {boolean} notifySuccess - Whether to show success notification
	 * @returns {Promise<Object>} Response data
	 */
	async getAll(params = {}, notifySuccess = true) {
		try {
			const { data } = await this._api.get(this._path, { params });

			if (notifySuccess) {
				this._showSuccess(data.message);
			}

			return data;
		} catch (error) {
			return this._handleError(error);
		}
	}

	/**
	 * Get a single record by ID
	 * @param {string|number} id - Record ID
	 * @param {Object} params - Query parameters
	 * @param {boolean} notifySuccess - Whether to show success notification
	 * @returns {Promise<Object>} Response data
	 */
	async getById(id, params = {}, notifySuccess = true) {
		try {
			const { data } = await this._api.get(`${this._path}/${id}`, {
				params,
			});

			if (notifySuccess) {
				this._showSuccess(data.message);
			}

			return data;
		} catch (error) {
			return this._handleError(error);
		}
	}

	/**
	 * Create a new record
	 * @param {Object} payload - Data to create
	 * @param {Object} params - Query parameters
	 * @param {boolean} notifySuccess - Whether to show success notification
	 * @returns {Promise<Object>} Response data
	 */
	async create(payload, params = {}, notifySuccess = true) {
		try {
			const { data } = await this._api.post(this._path, payload, {
				params,
			});

			if (notifySuccess) {
				this._showSuccess(data.message);
			}

			return data || true;
		} catch (error) {
			return this._handleError(error);
		}
	}

	/**
	 * Update an existing record
	 * @param {string|number} id - Record ID
	 * @param {Object} payload - Data to update
	 * @param {Object} params - Query parameters
	 * @param {boolean} notifySuccess - Whether to show success notification
	 * @returns {Promise<Object>} Response data
	 */
	async update(id, payload, params = {}, notifySuccess = true) {
		try {
			const { data } = await this._api.put(
				`${this._path}/${id}`,
				payload,
				{
					params,
				},
			);

			if (notifySuccess) {
				this._showSuccess(data.message);
			}

			return data || true;
		} catch (error) {
			return this._handleError(error);
		}
	}

	/**
	 * Delete a record by ID
	 * @param {string|number} id - Record ID
	 * @param {Object} params - Query parameters
	 * @param {boolean} notifySuccess - Whether to show success notification
	 * @returns {Promise<Object>} Response data
	 */
	async remove(id, params = {}, notifySuccess = true) {
		try {
			const { data } = await this._api.delete(`${this._path}/${id}`, {
				params,
			});

			if (notifySuccess) {
				this._showSuccess(data.message);
			}

			return data || true;
		} catch (error) {
			return this._handleError(error);
		}
	}
}
