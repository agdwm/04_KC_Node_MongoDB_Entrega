'use strict';

const $ = require('jquery');

export default class UrlManager {

	constructor() {
		
		this.keyModality = 'isSale';
		this.keyFilter = 'tags';
		this.possibleModalities = ['true', 'false'];
		this.possibleTags = ['work', 'lifestyle', 'motor', 'mobile'];
		this.adsContainter = $('#ad-list');
	}

	setUrlModality(modality) {
		const url = window.location.href;
		const urlString = window.location.search;
		const history = window.history;
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
			if (!newQueryParamArr.includes(`${this.keyModality}=${modality}`)) {
				newQueryParamArr.push(`${this.keyModality}=${modality}`);
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
		history.pushState(stateObj, modality, newUrl);
	}

	setUrlFilter(filter) {
		const url = window.location.href;
		const history = window.history;
		const urlString = window.location.search;
		const urlPath = url.replace(urlString, '');
		let cleanedUrl = [];
		let newQueryParamString = '';
		const stateObj = { filter };
		let newUrl = '';
		let newTag = '';

		if (urlString !== '') {
			const delimiters = ['?', '&'];
			const urlStringToArray = urlString.split(new RegExp(`[${delimiters}]`, 'g'));

			cleanedUrl = urlStringToArray.filter((val) => {
				return val !== '';
			});
		}

		if (cleanedUrl.length !== 0) {
			const tagsArray = [];
			let queryParam = '';
			const positionArray = [];
			let queryParamKey = '';
			let queryParamVal = '';
			let newTagsString = '';
			let newcleanedUrl = '';

			for (let i = 0; i < cleanedUrl.length; i++) {
				queryParam = cleanedUrl[i].split('=');
				queryParamKey = queryParam[0];
				queryParamVal = queryParam[1];

				// el par (clave=valor) es de tipo "tags"
				if (queryParamKey === this.keyFilter) {
					// este tag Ya está en la url
					if (queryParamVal === filter) {
						positionArray.push(i);
					} else {
						newTag = `${queryParamKey}=${filter}`;
					}
				} else if (this.possibleTags.includes(filter)) {
					newTag = `${this.keyFilter}=${filter}`;
				}
			}

			if (positionArray.length >= 1) {
				for (let i = 0; i < positionArray.length; i++) {
					cleanedUrl.splice(positionArray[i], 1);
				}
			} else {
				if (newTag !== '') {
					if (!tagsArray.includes(newTag)) {
						tagsArray.push(newTag);
					}
				}
			}

			if (tagsArray.length > 0) {
				if (tagsArray.length > 1) {
					newTagsString = tagsArray.join('&');
				} else {
					newTagsString = tagsArray.toString();
				}
			}

			if (cleanedUrl.length > 1) {
				newcleanedUrl = cleanedUrl.join('&');
			} else {
				newcleanedUrl = cleanedUrl.toString();
			}

			if (newTagsString !== '') {
				newQueryParamString = `?${newcleanedUrl}&${newTagsString}`;
			} else {
				newQueryParamString = `?${newcleanedUrl}`;
			}

			newUrl = `${urlPath}${newQueryParamString}`;
			history.pushState(stateObj, filter, newUrl);
		} else {
			newTag = `${this.keyFilter}=${filter}`;
			newUrl = `${urlPath}?${newTag}`;
			history.pushState(stateObj, filter, newUrl);
		} 
	}
}
