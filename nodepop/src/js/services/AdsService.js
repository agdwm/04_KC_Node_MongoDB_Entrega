'use strict';

const $ = require('jquery');

export default class AdsService {

	constructor() {
		this.url = window.location.href;
	}
	getList(data, successCallback, errorCallback) {
		const queryString = $.param(data);

		$.ajax({
			url: this.url,
			type: 'GET',
			data: queryString,
			contentType: 'application/json; charset=utf-8',
			success: successCallback,
			error: errorCallback
		});
	}
}
