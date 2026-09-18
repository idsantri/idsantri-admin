import { api } from 'src/boot/axios';
import apiError from './api-error';
import type { PostParams } from './api-interface';

/**
 * Send a POST request to the specified endpoint
 * @param {PostParams} options - Options object
 * @param {string} options.endPoint - Endpoint to send the request to
 * @param {object} options.data - Payload data to send
 * @param {Object} options.params - Query parameters
 * @returns {Promise<Object >} Response data or false if an error occurs
 */
async function apiPost({ endPoint, data, params }: PostParams): Promise<object> {
	try {
		const config = params !== undefined ? { params } : {};
		const response = await api.post(endPoint, data, config);
		return response.data;
	} catch (error) {
		apiError(error);
		throw error;
	}
}

export default apiPost;
