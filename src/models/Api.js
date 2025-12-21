import { notifyConfirm, notifyError, notifySuccess } from 'src/utils/notify.js';
import apiGet from 'src/api/apiGet';
import apiPost from 'src/api/apiPost';
import apiUpdate from 'src/api/apiUpdate';
import apiDelete from 'src/api/apiDelete';
import apiGetBlob from 'src/api/apiGetBlob';

export default class Api {
	constructor(path) {
		this._path = path;
		this._apiGet = apiGet;
		this._apiPost = apiPost;
		this._apiUpdate = apiUpdate;
		this._apiDelete = apiDelete;
		this._apiGetBlob = apiGetBlob;
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
