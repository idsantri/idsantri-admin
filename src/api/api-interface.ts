import type { AxiosRequestConfig } from 'axios';
import type { Ref } from 'vue';

interface Params {
	endPoint: string;
	loading?: Ref<boolean>;
	params?: object;
	notify?: boolean;
	config?: AxiosRequestConfig;
}

type GetParams = Params;

interface PostParams extends Params {
	data: object;
	confirm?: boolean;
	message?: string;
}

interface UpdateParams extends Params {
	data: object;
	confirm?: boolean;
	message?: string;
}

interface DeleteParams extends Params {
	message?: string;
}

interface DownloadParams extends Params {
	fileName?: string;
	confirm?: boolean;
	message?: string;
}

interface ListsParams {
	key: string;
	loading?: Ref<boolean>;
	loadingArray?: Ref<Record<string, boolean>>;
	sort?: boolean | 'asc' | 'desc' | null;
	url?: string;
}

interface ListsCustomParams extends ListsParams {
	params?: object;
	url: string;
}

export type {
	GetParams,
	PostParams,
	UpdateParams,
	DeleteParams,
	DownloadParams,
	ListsParams,
	ListsCustomParams,
};
