import api from '.';
import apiError from './api-error';
import { PostParams } from './api-interface';
import { notifyConfirm, notifySuccess } from 'src/utils/notify';

async function apiPost({
	endPoint,
	data,
	confirm = false,
	message = 'Simpan data?',
	loading,
	notify = true,
	params,
}: PostParams): Promise<object | false> {
	if (confirm) {
		const isConfirmed = await notifyConfirm(message, true);
		if (!isConfirmed) {
			return false;
		}
	}
	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const response = await api.post(endPoint, data, { params });
		if (notify) notifySuccess(response.data.message);
		return response.data;
	} catch (error) {
		apiError(error);
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

export default apiPost;
