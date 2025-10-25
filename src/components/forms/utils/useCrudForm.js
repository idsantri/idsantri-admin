import { ref } from 'vue';

/**
 * Composable untuk operasi CRUD yang reusable
 *
 * @param {Object|Function|Class} model - Service API (Santri, Kelas, Address, dll)
 * @param {Object} options - Konfigurasi tambahan
 * @param {string} [options.closeButtonId='btn-close-form'] - ID button untuk close form
 * @param {boolean} [options.autoClose=true] - Auto close setelah operasi berhasil
 * @param {string|null} [options.responseKey=null] - Key untuk extract data dari response (misal: 'kelas', 'member')
 * @param {Function} [options.emit] - Vue emit function
 *
 * @returns {{
 *   loading: import('vue').Ref<boolean>,
 *   handleCreate: (data: Object) => Promise<any>,
 *   handleUpdate: (id: string|number, data: Object) => Promise<any>,
 *   handleDelete: (id: string|number) => Promise<any>,
 *   closeForm: () => void
 * }}
 *
 * @example
 * // Basic usage
 * const { loading, handleCreate, handleUpdate, handleDelete } = useCrudForm(Kelas, {
 *   responseKey: 'kelas',
 *   emit
 * });
 *
 * // Create
 * await handleCreate({ nama: 'Kelas A', kapasitas: 30 });
 *
 * // Update
 * await handleUpdate(1, { nama: 'Kelas B', kapasitas: 25 });
 *
 * // Delete
 * await handleDelete(1);
 */
export default function useCrudForm(model, options = {}) {
	const {
		closeButtonId = 'btn-close-form',
		autoClose = true,
		responseKey = null,
		emit = () => {},
	} = options;

	/**
	 * Loading state untuk operasi CRUD
	 * @type {import('vue').Ref<boolean>}
	 */
	const loading = ref(false);

	/**
	 * Close form modal dengan trigger button click
	 * @returns {void}
	 */
	const closeForm = () => {
		const closeBtn = document.getElementById(closeButtonId);
		if (closeBtn) {
			closeBtn.click();
		}
	};

	/**
	 * Extract data dari response berdasarkan responseKey
	 * @param {Object|null} response - Response dari API
	 * @returns {any} Extracted data atau response langsung
	 * @private
	 */
	const _extractResponseData = (response) => {
		if (!response) return null;
		return responseKey ? response[responseKey] : response;
	};

	/**
	 * Create new record
	 *
	 * @param {Object} data - Data yang akan dibuat
	 * @param {boolean} confirm - Konfirmasi sebelum create
	 * @returns {Promise<any>} Response data yang sudah di-extract
	 *
	 * @example
	 * const result = await handleCreate({
	 *   nama: 'Kelas A',
	 *   kapasitas: 30
	 * });
	 *
	 * @emits successSubmit - Emit saat berhasil submit (create/update)
	 * @emits successCreate - Emit saat berhasil create
	 */
	const handleCreate = async (data, confirm) => {
		try {
			loading.value = true;

			const response = await model.create({ data, confirm });

			if (response) {
				const extractedData = _extractResponseData(response);

				if (autoClose) {
					closeForm();
				}

				emit('successSubmit', extractedData);
				emit('successCreate', extractedData);

				return extractedData;
			}
		} catch (error) {
			console.error('Error creating data:', error);
			throw error;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * Update existing record
	 *
	 * @param {string|number} id - Record ID yang akan diupdate
	 * @param {Object} data - Data yang akan diupdate
	 * @param {boolean} confirm - Konfirmasi sebelum update
	 * @returns {Promise<any>} Response data yang sudah di-extract
	 *
	 * @example
	 * const result = await handleUpdate(1, {
	 *   nama: 'Kelas B',
	 *   kapasitas: 25
	 * });
	 *
	 * @emits successSubmit - Emit saat berhasil submit (create/update)
	 * @emits successUpdate - Emit saat berhasil update
	 */
	const handleUpdate = async (id, data, confirm) => {
		try {
			loading.value = true;

			const response = await model.update({
				id,
				data,
				confirm,
			});

			if (response) {
				const extractedData = _extractResponseData(response);

				if (autoClose) {
					closeForm();
				}

				emit('successSubmit', extractedData);
				emit('successUpdate', extractedData);

				return extractedData;
			}
		} catch (error) {
			console.error('Error updating data:', error);
			throw error;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * Delete record
	 *
	 * @param {string|number} id - Record ID yang akan dihapus
	 * @returns {Promise<any>} Response dari API
	 *
	 * @example
	 * await handleDelete(1);
	 *
	 * @emits successDelete - Emit saat berhasil delete dengan parameter id
	 */
	const handleDelete = async (id, message) => {
		try {
			loading.value = true;

			const response = await model.remove({ id, message });

			if (response) {
				closeForm();
				emit('successDelete', id);

				return response;
			}
		} catch (error) {
			console.error('Error deleting data:', error);
			throw error;
		} finally {
			loading.value = false;
		}
	};

	return {
		loading,
		handleCreate,
		handleUpdate,
		handleDelete,
		closeForm,
	};
}
