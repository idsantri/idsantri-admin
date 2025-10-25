import api from '.';
import apiError from './api-error';
import type { DeleteParams } from './api-interface';

async function apiDelete({
	endPoint,
	params,
}: DeleteParams): Promise<object | boolean> {
	try {
		const response = await api.delete(endPoint, { params });
		return response?.data ?? true;
	} catch (error) {
		apiError(error);
		throw error;
	}
}

export default apiDelete;
