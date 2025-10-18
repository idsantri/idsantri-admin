import api from '.';
import apiError from './api-error';
import type { UpdateParams } from './api-interface';

async function apiUpdate({
	endPoint,
	data,
	params,
}: UpdateParams): Promise<object | false> {
	try {
		const response = await api.put(endPoint, data, { params });
		return response.data;
	} catch (error) {
		apiError(error);
		throw error;
	}
}

export default apiUpdate;
