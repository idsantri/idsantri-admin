import api from '.';
import apiError from './api-error';
import { ListsCustomParams, ListsParams } from './api-interface';

async function getLists({
	loadingArray,
	loading,
	key,
	sort = null,
	url = '',
}: ListsParams): Promise<object | false> {
	if (loadingArray) loadingArray.value[key] = true;
	if (loading && typeof loading.value === 'boolean') loading.value = true;

	const endPoint = url?.length ? url : `lists/${key}`;
	const snakeCase = key.replace(/-/g, '_');

	try {
		const { data } = await api.get(endPoint);
		const result = data[snakeCase] as { val0: string }[];

		if (sort === 'asc' || sort === true) {
			result.sort((a, b) =>
				a.val0.localeCompare(b.val0, undefined, {
					sensitivity: 'base',
				}),
			);
		} else if (sort === 'desc' || sort === false) {
			result.sort((a, b) =>
				b.val0.localeCompare(a.val0, undefined, {
					sensitivity: 'base',
				}),
			);
		}

		return result;
	} catch (error) {
		apiError(error);
		return false;
	} finally {
		if (loadingArray) loadingArray.value[key] = false;
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

function hasObject(arr: object[]): boolean {
	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] === 'object') {
			return true;
		}
	}
	return false;
}

async function getListsCustom({
	loadingArray,
	loading,
	key,
	url,
	params,
	sort = null,
}: ListsCustomParams): Promise<object | false> {
	if (loadingArray) loadingArray.value[key] = true;
	if (loading && typeof loading.value === 'boolean') loading.value = true;

	try {
		const { data } = await api.get(url, { params });
		// lists.value[key] = data[key];
		const result = data[key].filter((el: object) => el != null);
		if (!hasObject(result)) {
			if (sort === 'asc' || sort === true) {
				result.sort((a: string, b: string) =>
					a.localeCompare(b, undefined, { sensitivity: 'base' }),
				);
			} else if (sort === 'desc' || sort === false) {
				result.sort((a: string, b: string) =>
					b.localeCompare(a, undefined, { sensitivity: 'base' }),
				);
			}
		}
		return result;
	} catch (error) {
		apiError(error);
		return false;
	} finally {
		if (loadingArray) loadingArray.value[key] = false;
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

export { getLists, getListsCustom };
