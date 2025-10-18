import { notifyConfirm, notifyError, notifySuccess } from 'src/utils/notify.js';
import apiError from 'src/api/api-error.ts';
import apiGet from 'src/api/apiGet';
import apiPost from 'src/api/apiPost';
import apiUpdate from 'src/api/apiUpdate';
import apiDelete from 'src/api/apiDelete';

export default class Api {
	constructor(path) {
		this._path = path;
		this._apiGet = apiGet;
		this._apiPost = apiPost;
		this._apiUpdate = apiUpdate;
		this._apiDelete = apiDelete;
	}

	_handleError(error) {
		apiError(error);
		return false;
	}

	_showSuccess(message) {
		notifySuccess(message);
	}

	_showError(message) {
		notifyError(message);
	}

	async _notifyConfirm(message, title = 'Konfirmasi') {
		return await notifyConfirm(message, true, title);
	}
}
