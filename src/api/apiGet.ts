import api from '.';
import apiError from './api-error';
import type { GetParams } from './api-interface';

async function apiGet({ endPoint, params }: GetParams): Promise<object> {
	try {
		const response = await api.get(endPoint, { params });
		return response.data;
	} catch (error) {
		apiError(error);
		throw error;
	}
}

export default apiGet;
