import { api } from 'src/boot/axios';
import apiError from './api-error';
import type { UpdateParams } from './api-interface';

async function apiUpdate({ endPoint, data, params }: UpdateParams): Promise<object | false> {
	try {
		const config = params !== undefined ? { params } : {};
		const response = await api.put(endPoint, data, config);
		return response.data;
	} catch (error) {
		apiError(error);
		throw error;
	}
}

export default apiUpdate;
