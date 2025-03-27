import api from '.';
import apiError from './api-error';
import type { GetParams } from './api-interface';
import { notifySuccess } from 'src/utils/notify';

async function apiGet({
	endPoint,
	loading,
	params,
	notify = false,
	config,
}: GetParams): Promise<object | false> {
	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;

		const configApi = { ...config };
		if (params) configApi.params = params;
		const { data } = await api.get(endPoint, configApi);

		if (notify) notifySuccess(data.message);
		return data.data;
	} catch (error) {
		apiError(error);
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

export default apiGet;
