import Api from './Api';

export default class ApiCrud extends Api {
	/**
	 * Get all records with optional query parameters for filtering/pagination
	 * @param {Object} options - Options object
	 * @param {Object} options.params - Query parameters
	 * @param {boolean} options.notifySuccess - Whether to show success notification
	 * @returns {Promise<Object>} Response data
	 */
	async getAll({ params = {}, notifySuccess = true }) {
		const resData = await this._apiGet({
			endPoint: this._path,
			params,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data;
	}

	/**
	 * Get a single record by ID
	 * @param {Object} options - Options object
	 * @param {string|number} options.id - Record ID
	 * @param {Object} options.params - Query parameters
	 * @param {boolean} options.notifySuccess - Whether to show success notification
	 * @returns {Promise<Object>} Response data
	 */
	async getById({ id, params = {}, notifySuccess = true }) {
		const resData = await this._apiGet({
			endPoint: `${this._path}/${id}`,
			params,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data;
	}

	/**
	 * Create a new record
	 * @param {Object} options - Options object
	 * @param {Object} options.data - Data to create
	 * @param {Object} options.params - Query parameters
	 * @param {boolean} options.notifySuccess - Whether to show success notification
	 * @returns {Promise<Object>} Response data
	 */
	async create({
		data,
		params = {},
		notifySuccess = true,
		confirm = false,
		message = '',
	}) {
		if (message || confirm) {
			const isConfirmed = await this._notifyConfirm(
				message || 'Simpan data ini?',
			);
			if (!isConfirmed) {
				return false;
			}
		}
		const resData = await this._apiPost({
			endPoint: this._path,
			data,
			params,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data || true;
	}

	/**
	 * Update an existing record
	 * @param {Object} options - Options object
	 * @param {string|number} options.id - Record ID
	 * @param {Object} options.data - Data to update
	 * @param {Object} options.params - Query parameters
	 * @param {boolean} options.notifySuccess - Whether to show success notification
	 * @param {boolean} options.confirm - Whether to show confirmation dialog
	 * @param {string} options.message - Custom confirmation message
	 * @returns {Promise<Object>} Response data
	 */
	async update({
		id,
		data,
		params = {},
		notifySuccess = true,
		confirm = false,
		message = '',
	}) {
		if (message || confirm) {
			const isConfirmed = await this._notifyConfirm(
				message || 'Update data ini?',
			);

			if (!isConfirmed) {
				return false;
			}
		}
		const resData = await this._apiUpdate({
			endPoint: `${this._path}/${id}`,
			data,
			params,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data || true;
	}

	/**
	 * Delete a record by ID
	 * @param {Object} options - Options object
	 * @param {string|number} options.id - Record ID
	 * @param {Object} options.params - Query parameters
	 * @param {boolean} options.notifySuccess - Whether to show success notification
	 * @param {boolean} options.confirm - Whether to show confirmation dialog
	 * @param {string} options.message - Custom confirmation message
	 * @returns {Promise<Object>} Response data
	 */
	async remove({
		id,
		params = {},
		notifySuccess = true,
		confirm = true,
		message = '',
	}) {
		if (message || confirm) {
			const isConfirmed = await this._notifyConfirm(
				message || '<span style="color: red">Hapus data ini?</span>',
			);

			if (!isConfirmed) {
				return false;
			}
		}

		const resData = await this._apiDelete({
			endPoint: `${this._path}/${id}`,
			params,
		});

		if (notifySuccess) {
			this._showSuccess(resData.message);
		}

		return resData.data || true;
	}
}
