import api from '.';
import apiError from './api-error';
import type { DownloadParams } from './api-interface';
import { notifyConfirm } from 'src/utils/notify';

/**
 * @deprecated use apiGetBlob in src/api/apiGetBlob instead
 * Download file from server and trigger browser download
 */
async function apiDownload({
	message,
	endPoint,
	confirm = false,
	loading,
	params,
	fileName = 'dokumen',
}: DownloadParams): Promise<boolean> {
	if (message || confirm) {
		const confirmMessage = message || 'Download data yang dicetak?';
		const isConfirmed = await notifyConfirm(confirmMessage, true);
		if (!isConfirmed) {
			return false;
		}
	}

	if (loading && typeof loading.value === 'boolean') loading.value = true;
	try {
		const response = await api.request({
			url: endPoint,
			method: 'GET',
			responseType: 'blob', // important
			headers: {
				'Content-Type': 'application/pdf',
			},
			params,
		});

		if (response) {
			const blob = new Blob([response.data], { type: 'application/pdf' });
			const href = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = href;
			link.setAttribute('download', fileName + '.pdf');
			document.body.appendChild(link);
			link.click();

			document.body.removeChild(link);
			URL.revokeObjectURL(href);
			return true;
		} else {
			return false;
		}
	} catch (error) {
		apiError(error);
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean') loading.value = false;
	}
}

export default apiDownload;
