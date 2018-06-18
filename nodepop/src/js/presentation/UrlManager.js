'use strict';

const $ = require('jquery');

export default class UrlManager {

	constructor() {
		this.url = window.location.href;
		this.urlString = window.location.search;
		this.history = window.history;
		this.urlPath = this.url.replace(this.urlString, '');
		this.keyModality = 'isSale';
		// this.possibleModalities = ['true', 'false'];
		this.possibleTags = ['work', 'lifestyle', 'motor', 'mobile'];
	}

	setUrlModality(modality) {

		let cleanedUrl = [];
		let queryParam = '';
		let queryParamKey = '';
		const newQueryParamArr = [];
		let newQueryParamString = '';

		const stateObj = { modality };
		let newUrl = '';

		if (this.urlString !== '') {
			const delimiters = ['?', '&'];
			const urlStringToArray = this.urlString.split(new RegExp(`[${delimiters}]`, 'g'));

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

		newUrl = `${this.urlPath}?${newQueryParamString}`;
		this.history.pushState(stateObj, modality, newUrl);
	}

	setUrlFilter(filter) {
		let cleanedUrl = [];
		const newQueryParamArr = [];
		let newQueryParamString = '';
		const urlString = window.location.search;
		const stateObj = { filter };
		let newUrl = '';

		console.log(filter);

		if (urlString !== '') {
			const delimiters = ['?', '&'];
			const urlStringToArray = urlString.split(new RegExp(`[${delimiters}]`, 'g'));
			// console.log('urlStringToArray', urlStringToArray);

			cleanedUrl = urlStringToArray.filter((val) => {
				return val !== '';
			});
			// console.log('cleanedUrl', cleanedUrl);
		}

		if (cleanedUrl.length !== 0) {
			const tagsArray = [];
			let queryParam = '';
			const positionArray = [];
			let queryParamKey = '';
			let queryParamVal = '';
			let newTagsString = '';
			let newTag = '';
			let newcleanedUrl = '';

			for (let i = 0; i < cleanedUrl.length; i++) {
				queryParam = cleanedUrl[i].split('=');
				queryParamKey = queryParam[0];
				queryParamVal = queryParam[1];

				// el par (clave=valor) es de tipo "tags"
				if (queryParamKey === 'tags') {
					console.log('filter', filter);
					// este tag Ya está en la url
					if (queryParamVal === filter) {
						positionArray.push(i);
					} else {
						newTag = `${queryParamKey}=${filter}`;
					}
				} else if (this.possibleTags.includes(filter)) {
					newTag = `tags=${filter}`;
				}
			}

			if (positionArray.length >= 1) {
				for (let i = 0; i < positionArray.length; i++) {
					console.log(cleanedUrl);
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

			newUrl = `${this.urlPath}${newQueryParamString}`;
			this.history.pushState(stateObj, filter, newUrl);
		}
	}
}
