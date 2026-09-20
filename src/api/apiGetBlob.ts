import { api } from 'src/boot/axios';
import apiError from './api-error';
import type { DownloadParams } from './api-interface';

async function apiGetBlob({ endPoint, params, contentType = 'application/pdf' }: DownloadParams): Promise<object> {
	try {
		const response = await api.request({
			url: endPoint,
			method: 'GET',
			responseType: 'blob', // important
			headers: {
				'Content-Type': contentType,
			},
			params: params !== undefined ? params : {},
		});
		return response;
	} catch (error) {
		apiError(error);
		throw error;
	}
}

export default apiGetBlob;
