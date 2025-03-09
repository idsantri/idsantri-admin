import api from '.';
import apiError from './api-error';
import { DeleteParams } from './api-interface';
import { notifySuccess, notifyConfirm } from 'src/utils/notify';

async function apiDelete({
	endPoint,
	message = '<span style="color: red">Hapus data ini?</span>',
	params,
	loading,
	notify = true,
	config,
}: DeleteParams): Promise<boolean> {
	const isConfirmed = await notifyConfirm(message, true);
	if (!isConfirmed) {
		return false;
	}

	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;

		const configApi = { ...config };
		if (params) configApi.params = params;
		const { data } = await api.delete(endPoint, configApi);

		if (notify) notifySuccess(data.message);
		return true;
	} catch (error) {
		apiError(error);
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

export default apiDelete;
