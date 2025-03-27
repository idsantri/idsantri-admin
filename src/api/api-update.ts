import api from '.';
import apiError from './api-error';
import type { UpdateParams } from './api-interface';
import { notifySuccess, notifyConfirm } from 'src/utils/notify';

async function apiUpdate({
	endPoint,
	data,
	confirm = true,
	message,
	loading,
	notify = true,
	params,
	config,
}: UpdateParams): Promise<object | false> {
	if (message || confirm) {
		const confirmMessage = message || 'Update data ini?';
		const isConfirmed = await notifyConfirm(confirmMessage, true);
		if (!isConfirmed) {
			return false;
		}
	}

	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;

		const configApi = { ...config };
		if (params) configApi.params = params;
		const response = await api.put(endPoint, data, configApi);

		if (notify) notifySuccess(response.data.message);
		return response.data.data;
	} catch (error) {
		apiError(error);
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

export default apiUpdate;
