'use strict';

const $ = require('jquery');

export default class AdsService {

	getList(currentUrl, successCallback, errorCallback) {
		$.ajax({
			url: currentUrl,
			type: 'GET',
			contentType: 'application/json',
			success: successCallback,
            error: errorCallback
		});
    }
}