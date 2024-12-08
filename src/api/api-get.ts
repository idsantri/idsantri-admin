import api from '.';
import apiError from './api-error';
import { GetParams } from './api-interface';
import { notifySuccess } from 'src/utils/notify';

async function apiGet({
	endPoint,
	loading,
	params,
	notify = false,
}: GetParams): Promise<object | false> {
	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const { data } = await api.get(endPoint, { params });
		if (notify) notifySuccess(data.message);
		return data;
	} catch (error) {
		apiError(error);
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

export default apiGet;
