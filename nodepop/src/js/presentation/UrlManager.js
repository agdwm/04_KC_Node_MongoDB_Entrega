'use strict';

const $ = require('jquery');

export default class UrlManager {

	setUrlModality(modality) {
		const url = window.location.href;
		const urlString = window.location.search;
		const urlPath = url.replace(urlString, '');

		let cleanedUrl = [];

		let queryParam = '';
		let queryParamKey = '';
		const newQueryParamArr = [];
		let newQueryParamString = '';

		const stateObj = { modality };
		let newUrl = '';

		if (urlString !== '') {
			const delimiters = ['?', '&'];
			const urlStringToArray = urlString.split(new RegExp(`[${delimiters}]`, 'g'));

			cleanedUrl = urlStringToArray.filter((val) => {
				return val !== '';
			});
		}


		// Si query String is not empty
		if (cleanedUrl.length !== 0) {
			for (let i = 0; i < cleanedUrl.length; i++) {
				queryParam = cleanedUrl[i].split('=');
				queryParamKey = queryParam[0];

				if (queryParamKey === this.keyModality) {
					queryParam[1] = modality;
					queryParam = `${queryParamKey}=${queryParam[1]}`;
				} else {
					queryParam = cleanedUrl[i];
				}
				newQueryParamArr.push(queryParam);
			}
		} else {
			queryParam = `${this.keyModality}=${modality}`;
			newQueryParamArr.push(queryParam);
		}

		if (newQueryParamArr.length > 1) {
			newQueryParamString = newQueryParamArr.join('&');
		} else {
			newQueryParamString = newQueryParamArr.toString();
		}

		newUrl = `${urlPath}?${newQueryParamString}`;
		this.history.pushState(stateObj, modality, newUrl);
	}
}
