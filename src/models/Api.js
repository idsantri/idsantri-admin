import { notifyError, notifySuccess } from 'src/utils/notify.js';
import apiError from 'src/api/api-error.ts';
import api from 'src/api';

export default class Api {
	constructor(path) {
		this._path = path;
		this._api = api;
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
}
