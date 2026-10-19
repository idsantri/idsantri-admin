import { api } from 'src/boot/axios';
import apiError from './api-error';
import type { GetParams } from './api-interface';

async function apiGet({ endPoint, params }: GetParams): Promise<object> {
	try {
		const config = params !== undefined ? { params } : {};
		const response = await api.get(endPoint, config);
		return response.data;
	} catch (error) {
		apiError(error);
		throw error;
	}
}

export default apiGet;
