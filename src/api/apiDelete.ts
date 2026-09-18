import { api } from 'src/boot/axios';
import apiError from './api-error';
import type { DeleteParams } from './api-interface';

async function apiDelete({ endPoint, params }: DeleteParams): Promise<object | boolean> {
	try {
		const config = params !== undefined ? { params } : {};
		const response = await api.delete(endPoint, config);
		return response?.data ?? true;
	} catch (error) {
		apiError(error);
		throw error;
	}
}

export default apiDelete;
